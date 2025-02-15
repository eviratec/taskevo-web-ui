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

CategoryPageController.$inject = ['$api', '$scope', '$state', '$mdDialog', '$timeout', '$listCreateDialog', 'category'];
function CategoryPageController (  $api,   $scope,   $state,   $mdDialog,   $timeout,   $listCreateDialog,   category) {

  const $categoryPage = this;

  $categoryPage.category = category;

  checkCategoryExists();

  function checkCategoryExists () {
    if (category) {
      return;
    }

    navToUserDashboard();
  }

  $categoryPage.createList = function ($event) {
    $listCreateDialog.show({}, 'List', $event).then(function(data) {
      createList(data);
    }, function() {

    });
  };

  $categoryPage.deleteCategory = function ($event) {

    let confirm = $mdDialog.confirm()
      .title('Are you sure?')
      .textContent(`This will permanently delete your category: ${category.Name}`)
      .ariaLabel('Delete category')
      .targetEvent($event)
      .ok('Delete Category')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      deleteCategory(category.Id);
    }, function() {
      // do nothing
    });

  };

  $categoryPage.renameCategory = function ($event) {

    var confirm = $mdDialog.prompt()
      .title('Rename Category')
      .placeholder(category.Name)
      .ariaLabel('Category name')
      .initialValue(category.Name)
      .targetEvent($event)
      .ok('Save')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(newValue) {
      renameCategory(category.Id, newValue);
    }, function() {
      // do nothing
    });

  };

  function renameCategory (categoryId, newValue) {
    if (category.Id !== categoryId) {
      return;
    }

    $api.apiPutNewValue(`/category/${categoryId}/name`, newValue)
      .then(function (res) {
        updateCategoryName(newValue);
        $scope.$emit(`category:renamed`, categoryId, newValue);
      })
      .catch(function (err) {
        console.log(err);
        notifyRenameCategoryError();
      });
  }

  function updateCategoryName (newValue) {
    $scope.$apply(function () {
      category.Name = newValue;
    });
  }

  function deleteCategory (categoryId) {
    if (category.Id !== categoryId) {
      return;
    }

    $api.apiDelete(`/category/${categoryId}`)
      .then(function (res) {
        navToUserDashboard();
      })
      .catch(function (err) {
        console.log(err);
        notifyDeleteCategoryError();
      });
  }

  function notifyDeleteCategoryError () {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Error')
        .textContent('An unexpected error was encountered while deleting the category.')
        .ariaLabel('Error notification')
        .ok('Ok')
    );
  }

  function notifyRenameCategoryError () {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Error')
        .textContent('An unexpected error was encountered while renaming the category.')
        .ariaLabel('Error notification')
        .ok('Ok')
    );
  }

  function navToUserDashboard () {
    $state.go('app.user.dashboard');
  }

  function createList (data) {

    let newList = {
      CategoryId: category.Id,
      Title: data.Title,
      Due: data.Due,
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
