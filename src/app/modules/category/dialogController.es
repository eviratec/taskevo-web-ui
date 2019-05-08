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
  .controller('AppApiSchemaDialogController', AppApiSchemaDialogController);

AppApiSchemaDialogController.$inject = ['ApiSchema', '$scope', '$mdDialog', 'schema'];
function AppApiSchemaDialogController (  ApiSchema,   $scope,   $mdDialog,   schema) {

  $scope.schema = schema;

  $scope.selectAll = function () {
    let dialogEl = document.getElementById('Dialog_ViewApiSchema');
    let sourceEl = dialogEl.querySelector("div[class='schema-source']");
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(sourceEl);
      range.select();
      return;
    }
    if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(sourceEl);
      window.getSelection().addRange(range);
      return;
    }
  };

  $scope.hide = function() {
    $mdDialog.cancel();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function() {
    $mdDialog.hide();
  };

}
