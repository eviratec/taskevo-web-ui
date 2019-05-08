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
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.user.app', {
        url:'/app/:appId',
        templateUrl: 'modules/appEditor/html/root.html',
        controller: 'AppEditorController',
        controllerAs: '$app',
        abstract: true,
        resolve: {
          app: ['$api', '$stateParams', function ($api, $stateParams) {
            let appId = $stateParams.appId;
            return $api.apiGet(`/app/${appId}`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
        }
      })
      .state('app.user.app.dashboard', {
        url:'',
        templateUrl: 'modules/appEditor/html/dashboard.html',
        data: {
          name: 'summary',
        },
      })
      .state('app.user.app.schemas', {
        url:'/schemas',
        templateUrl: 'modules/appEditor/html/schemas.html',
        data: {
          name: 'schemas',
        },
      })
      .state('app.user.app.schema', {
        url:'/schema/:schemaId',
        templateUrl: 'modules/appEditor/html/schema.html',
        data: {
          name: 'schemas',
        },
        controller: 'AppSchemaEditorController',
        controllerAs: '$schemaCtrl',
        resolve: {
          schema: ['$api', '$stateParams', function ($api, $stateParams) {
            let appId = $stateParams.appId;
            let schemaId = $stateParams.schemaId;
            return $api.apiGet(`/app/${appId}/schema/${schemaId}`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
          properties: ['$api', '$stateParams', function ($api, $stateParams) {
            let schemaId = $stateParams.schemaId;
            return $api.apiGet(`/schema/${schemaId}/properties`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return [];
              });
          }],
        }
      })
      .state('app.user.app.apis', {
        url:'/apis',
        templateUrl: 'modules/appEditor/html/apis.html',
        data: {
          name: 'apis',
        },
      })
      .state('app.user.app.api', {
        url:'/api/:apiId',
        templateUrl: 'modules/appEditor/html/api.html',
        data: {
          name: 'apis',
        },
        controller: 'AppApiEditorController',
        controllerAs: '$apiCtrl',
        resolve: {
          api: ['$api', '$stateParams', function ($api, $stateParams) {
            let appId = $stateParams.appId;
            let apiId = $stateParams.apiId;
            return $api.apiGet(`/app/${appId}/api/${apiId}`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
          routes: ['$api', '$stateParams', function ($api, $stateParams) {
            let apiId = $stateParams.apiId;
            return $api.apiGet(`/api/${apiId}/routes`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
          operations: ['$api', '$stateParams', function ($api, $stateParams) {
            let apiId = $stateParams.apiId;
            return $api.apiGet(`/api/${apiId}/operations`)
              .then(function (res) {
                let r = {
                  all: res.data,
                  byRouteId: {},
                  orphaned: [],
                };
                r.all.forEach(d => {
                  let routeId = d.RouteId;
                  if (!routeId) {
                    return r.orphaned.push(d);
                  }
                  r.byRouteId[routeId] = r.byRouteId[routeId] || [];
                  r.byRouteId[routeId].push(d);
                });
                return r;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
        }
      })
      .state('app.user.app.clients', {
        url:'/clients',
        templateUrl: 'modules/appEditor/html/clients.html',
        data: {
          name: 'clients',
        },
      });

}]);
