angular.module('validatorsApp').factory('ValidatorsLoader',['$http', function($http) {

  var VALIDATOR_REGISTRY_API = 'https://api.validators.ripple.com';

  return (function() {
    return {
      scan: function(scope) {
        $http({
          url: VALIDATOR_REGISTRY_API+"/validators",
          method: "GET"
        }).success(function(data, status, headers, config) {
            scope.loading = false
            scope.validators = data.validators;
            data.metadata.forEach(function(item) {
              scope.validators.forEach(function(validator) {
                if (item.validation_public_key === validator.validation_public_key) {
                  validator.validations_count = item.validations_count
                }
              })
            })
        }).error(function(data, status, headers, config) {
            scope.loading = true;
            scope.status = "Error Connecting to Validator Registry API";
        })
      }
    }
  })()
}])
  
