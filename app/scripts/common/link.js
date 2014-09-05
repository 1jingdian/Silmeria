angular.module('bdLink', [])
  .directive('bdLinkify', function ($location) {

    return {
      scope: false,
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var link = $attrs.bdLinkify;

        $element.on('click', function (e) {
          $scope.$apply(function () {
            $location.path(link).search('kw', null).search('t', null);
          });
        });

      }
    };
  });