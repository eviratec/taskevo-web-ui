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

angular.module('TaskEvoWebui.User')
  .controller('UserController', UserController);

UserController.$inject = ['$api', '$scope', '$rootScope', '$auth', '$state', '$mdDialog', '$timeout', 'user', 'userApps'];
function UserController (  $api,   $scope,   $rootScope,   $auth,   $state,   $mdDialog,   $timeout,   user,   userApps) {

  $rootScope.$on('unauthorized', () => {
    $state.go('app.anon.login');
  });

  if (!$auth.isAuthorized) {
    $state.go('app.anon.login');
  }

  $scope.showSidenavApps = true;
  $scope.apps = userApps;
  $scope.user = user;

  $scope.login = user.Login;

  $scope.createApp = function ($event) {

    var confirm = $mdDialog.prompt()
      .title('Name your new app')
      .placeholder('My App')
      .ariaLabel('App name')
      .initialValue('')
      .targetEvent($event)
      .ok('Create App')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      createApp(result);
    }, function() {

    });

  };

  function createApp (name) {

    let newApp = {
      Name: name,
    };

    $api.apiPost('/apps', newApp)
      .then(function (res) {
        $timeout(function () {
          Object.assign(newApp, res.data);
          newApp.Id = res.data.Id;
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    $scope.apps.push(newApp);

  }

};
