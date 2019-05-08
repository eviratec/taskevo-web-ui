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
  .controller('CategoryController', CategoryController);

CategoryController.$inject = ['$api', '$timeout', '$rootScope', '$scope', '$state', '$mdDialog', 'category'];
function CategoryController (  $api,   $timeout,   $rootScope,   $scope,   $state,   $mdDialog,   category) {

  let _category = {
    model: category,
    lists: category.Lists,
  };

  $scope.chips = ["Id"];
  $scope.currentNavItem = $state.current.data.name;

  $scope.go = function (dest) {
    $state.go(`app.user.category.${dest}`);
  };

  console.log(_app);

  $scope.model = _app.model;
  $scope.lists = _app.lists;

  $rootScope.$on('$stateChangeSuccess', function ($event, toState, toParams) {
    console.log("*****",toState.data.name);
    $timeout(function () {
      $scope.currentNavItem = toState.data.name;
    });
  });

  $scope.addListDialog = function ($event) {
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
      let appId = $scope.model.Id;
      let d = {
        CategoryId: category.Id,
        Title: result,
      };

      $api.apiPost(`/lists`, d)
        .then(function (res) {
          $timeout(function () {
            $scope.lists.push(res.data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }, function() {
      // dialog cancelled
    });
  };

};
