/**
 * Copyright (c) 2019 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

angular.module('TaskEvoWebui.Category')
  .controller('ListController', ListController);

ListController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'list'];
function ListController (  $api,   $timeout,   $scope,   $state,   $mdDialog,   list) {

  let originatorEv;

  let $listCtrl = this;

  $listCtrl.list = list;

  $listCtrl.openMenu = function ($mdMenu, $event) {
    originatorEv = $event;
    $mdMenu.open($event);
  };

  $listCtrl.switchApi = function (apiId) {
    if (!apiId) {
      return;
    }
    $state.go('app.user.category.list', { apiId: apiId });
  };

  $listCtrl.deleteList = function (list) {
    let listId = list.Id;
    if (!listId) {
      return;
    }
    $api.apiDelete('/list/' + listId)
      .then(function (res) {
        $timeout(function () {
          let routeId = operation.RouteId;
          let i = $apiCtrl.operations.all.indexOf(operation);
          let l = $apiCtrl.operations.byRouteId[routeId].indexOf(operation);
          $apiCtrl.operations.all.splice(i, 1);
          $apiCtrl.operations.byRouteId[routeId].splice(l, 1);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $listCtrl.createList = function ($event, route) {
    var confirm = $mdDialog.prompt()
      .title('List Name')
      .textContent('Choose a name for the List')
      .placeholder('e.g. My List')
      .ariaLabel('List Name')
      .initialValue('')
      .targetEvent($event)
      .ok('Add List')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      let d = {
        CategoryId: list.CategoryId,
        ParentId: list.Id,
        Title: result,
      };

      $api.apiPost(`/lists`, d)
        .then(function (res) {
          $timeout(function () {
            $listCtrl.list.push(res.data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }, function() {
      // dialog cancelled
    });
  }

}
