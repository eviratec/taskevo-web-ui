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

angular.module('TaskEvoWebui.CategoryPage')
  .controller('CategoryPageController', CategoryPageController);

CategoryPageController.$inject = ['$api', '$scope', '$mdDialog', '$timeout', 'category'];
function CategoryPageController (  $api,   $scope,   $mdDialog,   $timeout,   category) {

  const $categoryPage = this;

  $categoryPage.category = category;

  $categoryPage.createList = function ($event) {

    var confirm = $mdDialog.prompt()
      .title('Name your new list')
      .placeholder('My List')
      .ariaLabel('List title')
      .initialValue('')
      .targetEvent($event)
      .ok('Create List')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      createList(result);
    }, function() {

    });

  };

  function createList (title) {

    let newList = {
      CategoryId: category.Id,
      Title: title,
    };

    $api.apiPost('/lists', newList)
      .then(function (res) {
        $timeout(function () {
          Object.assign(newList, res.data);
          newList.Id = res.data.Id;
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    $categoryPage.category.Lists.push(newList);

  }

};
