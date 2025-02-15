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

angular.module('TaskEvoWebui.ListPage')
  .controller('ListPageController', ListPageController);

ListPageController.$inject = ['$api', '$scope', '$state', '$mdDialog', '$timeout', '$listCreateDialog', 'list'];
function ListPageController (  $api,   $scope,   $state,   $mdDialog,   $timeout,   $listCreateDialog,   list) {

  const $listPage = this;

  const completedItems = [];
  const todoItems = [];

  $listPage.list = list;

  $listPage.completedItems = completedItems;
  $listPage.todoItems = todoItems;

  initItemLists();

  $listPage.navToParent = function ($event) {
    navToParent();
  };

  $listPage.toggleComplete = function (list) {
    let isCompleted = null !== list.Completed;
    if (isCompleted) {
      setItemNotComplete(list);
      return;
    }

    setItemComplete(list);
  };

  $listPage.createItem = function ($event) {
    $listCreateDialog.show({}, 'Item', $event).then(function(data) {
      createItem(data);
    }, function() {

    });
  };

  $listPage.changeDue = function ($event) {
    let changeListDueDialog = {
      controller: 'ChangeListDueDialogController',
      templateUrl: 'modules/listPage/html/dialogs/changeDue.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        list: list,
      },
    };

    $mdDialog.show(changeListDueDialog).then(function(newValue) {
      changeDue(list.Id, newValue/1000);
    }, function() {

    });
  };

  $listPage.clearDue = function ($event) {
    let confirm = $mdDialog.confirm()
      .title('Are you sure?')
      .textContent('This will remove the due date for: ' + list.Title)
      .ariaLabel('Remove due date')
      .targetEvent($event)
      .ok('Remove Due Date')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      clearDue(list.Id);
    }, function() {
      // do nothing
    });
  };

  $listPage.deleteList = function ($event) {

    let confirm = $mdDialog.confirm()
      .title('Are you sure?')
      .textContent('This will permanently delete your list: ' + list.Title)
      .ariaLabel('Delete list')
      .targetEvent($event)
      .ok('Delete List')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      deleteList(list.Id);
    }, function() {
      // do nothing
    });

  };

  $listPage.renameList = function ($event) {

    var confirm = $mdDialog.prompt()
      .title('Rename List')
      .placeholder(list.Title)
      .ariaLabel('List title')
      .initialValue(list.Title)
      .targetEvent($event)
      .ok('Save')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(newValue) {
      renameList(list.Id, newValue);
    }, function() {
      // do nothing
    });

  };

  function renameList (listId, newValue) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue(`/list/${listId}/title`, newValue)
      .then(function (res) {
        updateListTitle(newValue);
      })
      .catch(function (err) {
        console.log(err);
        notifyUpdateListError();
      });
  }

  function updateListTitle (newValue) {
    $scope.$apply(function () {
      list.Title = newValue;
    });
  }

  function deleteList (listId) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiDelete(`/list/${listId}`)
      .then(function (res) {
        navToParent();
      })
      .catch(function (err) {
        console.log(err);
        notifyDeleteListError();
      });
  }

  function notifyDeleteListError () {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Error')
        .textContent('An unexpected error was encountered while deleting the list.')
        .ariaLabel('Error notification')
        .ok('Ok')
    );
  }

  function navToParent () {
    let hasParentId = null !== list.ParentId;
    if (hasParentId) {
      $state.go('app.user.listPage', { listId: list.ParentId });
      return;
    }

    $state.go('app.user.categoryPage', { categoryId: list.CategoryId });
  }

  function initItemLists () {
    let allLists = $listPage.list.Lists.slice();

    completedItems.push(...allLists.filter(list => {
      return 'Completed' in list && list.Completed !== null;
    }));

    todoItems.push(...allLists.filter(list => {
      return !('Completed' in list) || list.Completed === null;
    }));
  }

  function setItemNotComplete (item) {
    $api.apiPutNewValue(`/list/${item.Id}/completed`, null)
      .then(function (res) {
        $timeout(function () {
          let i = completedItems.indexOf(item);
          item.Completed = null;
          completedItems.splice(i, 1);
          todoItems.push(item);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function setItemComplete (item) {
    $api.apiPutNewValue(`/list/${item.Id}/completed`, 'now')
      .then(function (res) {
        $timeout(function () {
          let i = todoItems.indexOf(item);
          item.Completed = Math.floor(Date.now()/1000);
          todoItems.splice(i, 1);
          completedItems.push(item);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function createItem (data) {

    let newList = {
      ParentId: list.Id,
      Title: data.Title,
      Due: data.Due,
      Completed: null,
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

    todoItems.push(newList);

  }

  function changeDue (listId, newValue) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue(`/list/${listId}/due`, newValue)
      .then(function (res) {
        updateListDue(newValue);
      })
      .catch(function (err) {
        console.log(err);
        notifyUpdateListError();
      });
  }

  function clearDue (listId) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue(`/list/${listId}/due`, null)
      .then(function (res) {
        updateListDue(null);
      })
      .catch(function (err) {
        console.log(err);
        notifyUpdateListError();
      });
  }

  function updateListDue (newValue) {
    $scope.$apply(function () {
      list.Due = newValue;
    });
  }

  function notifyUpdateListError () {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Error')
        .textContent(
          'An unexpected error was encountered while updating the list.'
        )
        .ariaLabel('Error notification')
        .ok('Ok')
    );
  }

};
