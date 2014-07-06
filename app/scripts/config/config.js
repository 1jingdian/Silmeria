angular.module('bdConfig', ['restangular'])
  .run(function (
    $window,
    $rootScope,
    AuthEvents,
    Restangular
  ) {
    'use strict';

    var token = $window.sessionStorage.token;

    if (token) {
      Restangular
        .one('user')
        .get()
        .then(function (res) {
          $rootScope.$broadcast(AuthEvents.loadUserSuccess, res);
        });
    }
  })

  .config(function (
    RestangularProvider
  ) {
    'use strict';
    RestangularProvider.setBaseUrl('/api');

    RestangularProvider
      .addFullRequestInterceptor(function (
        element,
        operation,
        route,
        url,
        headers,
        params,
        httpConfig
      ) {

      var token = window.sessionStorage.token;

      if (angular.isDefined(token)) {
        headers = _.extend(headers, {
          Authorization: 'Bearer ' + window.sessionStorage.token
        });
      }

      return {
        element: element,
        headers: headers,
        params: params,
        httpConfig: httpConfig
      };
    });
  });
