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

angular.module('TaskEvoWebui.AppEditor')
  .controller('AppEditorController', AppEditorController);

AppEditorController.$inject = ['$api', '$timeout', '$rootScope', '$scope', '$state', '$mdDialog', 'app'];
function AppEditorController (  $api,   $timeout,   $rootScope,   $scope,   $state,   $mdDialog,   app) {

  let _app = {
    model: app,
    schemas: app.Schemas,
    apis: app.Apis,
    clients: app.Clients,
  };

  $scope.chips = ["Id"];
  $scope.currentNavItem = $state.current.data.name;

  $scope.go = function (dest) {
    $state.go(`app.user.app.${dest}`);
  };

  console.log(_app);

  $scope.model = _app.model;
  $scope.schemas = _app.schemas;
  $scope.apis = _app.apis;
  $scope.clients = _app.clients;

  $rootScope.$on('$stateChangeSuccess', function ($event, toState, toParams) {
    console.log("*****",toState.data.name);
    $timeout(function () {
      $scope.currentNavItem = toState.data.name;
    });
  });

  $scope.addApiDialog = function ($event) {
    var confirm = $mdDialog.prompt()
      .title('API Name')
      .textContent('Choose a name for the API')
      .placeholder('e.g. UserApi')
      .ariaLabel('API Name')
      .initialValue('')
      .targetEvent($event)
      .ok('Add API')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {

      let appId = $scope.model.Id;

      $api.apiPost(`/app/${appId}/apis`, { Name: result })
        .then(function (res) {
          $timeout(function () {
            $scope.apis.push(res.data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }, function() {
      // dialog cancelled
    });
  };
  $scope.addClientDialog = function ($event) {
    var confirm = $mdDialog.prompt()
      .title('Client Name')
      .textContent('Choose a name for the Client')
      .placeholder('e.g. WebClient')
      .ariaLabel('Client Name')
      .initialValue('')
      .targetEvent($event)
      .ok('Add Client')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {

      let appId = $scope.model.Id;

      $api.apiPost(`/app/${appId}/clients`, { Name: result })
        .then(function (res) {
          $timeout(function () {
            $scope.clients.push(res.data);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }, function() {
      // dialog cancelled
    });
  };
  $scope.addSchemaDialog = function ($event) {
    var confirm = $mdDialog.prompt()
      .title('Schema Name')
      .textContent('Choose a name for the Schema')
      .placeholder('e.g. UserProfile')
      .ariaLabel('Schema Name')
      .initialValue('')
      .targetEvent($event)
      .ok('Add Schema')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {

      let appId = $scope.model.Id;

      $api.apiPost(`/app/${appId}/schemas`, { Name: result })
        .then(function (res) {
          $timeout(function () {
            $scope.schemas.push(res.data);
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
