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
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.user.category', {
        url: '/category/:categoryId',
        templateUrl: 'modules/category/html/root.html',
        controller: 'CategoryController',
        controllerAs: '$categoryCtrl',
        abstract: true,
        resolve: {
          category: ['$api', '$stateParams', function ($api, $stateParams) {
            let categoryId = $stateParams.categoryId;
            return $api.apiGet(`/category/${categoryId}`)
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
      .state('app.user.category.dashboard', {
        url: '',
        templateUrl: 'modules/category/html/dashboard.html',
        data: {
          name: 'summary',
        },
      })
      .state('app.user.category.lists', {
        url: '/lists',
        templateUrl: 'modules/category/html/lists.html',
        data: {
          name: 'lists',
        },
      })
      .state('app.user.category.list', {
        url: '/list/:listId',
        templateUrl: 'modules/category/html/list.html',
        data: {
          name: 'lists',
        },
        controller: 'ListController',
        controllerAs: '$listCtrl',
        resolve: {
          list: ['$api', '$stateParams', function ($api, $stateParams) {
            let listId = $stateParams.listId;
            return $api.apiGet(`/list/${listId}`)
              .then(function (res) {
                return res.data;
              })
              .catch(function (err) {
                console.log(err);
                return {};
              });
          }],
        }
      });

}]);
