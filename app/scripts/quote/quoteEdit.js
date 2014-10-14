angular.module('bdQuoteEdit', [])
  .controller('QuoteEditCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    'Toast',
    'Restangular',
    QuoteEditCtrl
  ]);

function QuoteEditCtrl (
  $scope,
  $location,
  $routeParams,
  Toast,
  Restangular
) {
  'use strict';

  var actionType = $routeParams.quoteId ? 'edit' : 'add';

  $scope.quote = {};

  if (actionType === 'edit') {
    Restangular
      .one('quotes', $routeParams.quoteId)
      .get({'with_character': true})
      .then(function (res) {
        res = res.plain();
        $scope.quote = res;
        $scope.quote.characterId = res.character._id;
        $scope.quote.characterName = res.character.name;
      });
  }

  $scope.submit = function () {
    var data = {
      characterId: $scope.quote.characterId,
      quote: $scope.quote.quote,
      reference: $scope.quote.reference,
      scene: $scope.quote.scene
    };

    if (angular.isUndefined(data.quote)) {
      return Toast.show('语录不能为空');
    }

    if (angular.isUndefined(data.characterId)) {
      return Toast.show('语录所属角色不能为空');
    }

    if (actionType === 'edit') {
      Restangular
        .one('quotes', $routeParams.quoteId)
        .put(data)
        .then(function (res) {
          Toast.show('语录更新成功');
          return $location.path('/quotes/' + $routeParams.quoteId);
        });

    } else {
      Restangular
        .all('quotes')
        .post(data)
        .then(function (res) {
          res = res.plain();
          Toast.show('语录添加成功');
          return $location.path('/quotes/' + res._id);
        }, function (res) {
          return Toast.show('语录添加失败');
        });
    }
  };
}
