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

angular.module('TaskEvoWebui.ListCreateDialog')
  .factory('$listCreateDialog', $listCreateDialog);

$listCreateDialog.$inject = ['$mdDialog'];
function $listCreateDialog (  $mdDialog) {
  return {
    show: show,
  };

  function show (list, typeOfList, $event) {
    let createListDialog = {
      controller: 'CreateListDialogController',
      templateUrl: 'modules/listCreateDialog/html/createList.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        list: list,
        typeOfList: typeOfList,
      },
    };

    return $mdDialog.show(createListDialog);
  }
}
