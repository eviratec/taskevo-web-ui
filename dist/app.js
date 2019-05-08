'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.Api', 'DataStudioWebui.Anon', 'DataStudioWebui.User', 'DataStudioWebui.AppEditor']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui').config(appDefaultRoute).config(appEnvironment).config(appLocation).config(appThemes).run(appInit);

appEnvironment.$inject = ['$appEnvironmentProvider'];
function appEnvironment($appEnvironmentProvider) {

  $appEnvironmentProvider.setDefaults({
    titlePrefix: '??? :: ',
    apiUrl: 'http://api.datastudio.localhost:8888'
  }).addEnvironment('local', ['127.0.0.1', 'localhost', /\.localhost$/i], {
    titlePrefix: 'LOCAL :: ',
    apiUrl: 'http://api.datastudio.localhost:8888'
  }).addEnvironment('prod', 'my.datastudio.xyz', {
    titlePrefix: '',
    apiUrl: 'https://api.datastudio.xyz'
  }).addEnvironment('prod2', 'https://my.datastudio.xyz', {
    titlePrefix: '',
    apiUrl: 'https://api.datastudio.xyz'
  }).defaultEnvironmentName('local');
}

appLocation.$inject = ['$locationProvider'];
function appLocation($locationProvider) {
  $locationProvider.html5Mode(true);
}

appDefaultRoute.$inject = ['$urlRouterProvider'];
function appDefaultRoute($urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');
}

appThemes.$inject = ['$mdThemingProvider'];
function appThemes($mdThemingProvider) {

  var dsPurpleMap = $mdThemingProvider.extendPalette('purple', {
    '500': '#8E24AA',
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('dsPurple', dsPurpleMap);

  $mdThemingProvider.theme('default').primaryPalette('dsPurple');

  var sidebarBlueGreyMap = $mdThemingProvider.extendPalette('blue-grey', {
    // 'contrastDefaultColor': 'dark',
  });

  $mdThemingProvider.definePalette('sidebarBlueGrey', sidebarBlueGreyMap);

  $mdThemingProvider.theme('darknav').primaryPalette('dsPurple').dark();

  $mdThemingProvider.theme('sidenavTheme').primaryPalette('grey').dark();
}

appInit.$inject = ['$appEnvironment', '$document'];
function appInit($appEnvironment, $document) {

  $document[0].title = $appEnvironment.config.titlePrefix + 'DataStudio Web UI';

  var robotoFontSrc = "https://fonts.googleapis.com/css?family=Roboto:200,300,400,500";
  var linkEl = $document[0].createElement('link');

  linkEl.setAttribute("rel", "stylesheet");
  linkEl.setAttribute("href", robotoFontSrc);

  $document[0].body.appendChild(linkEl);
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app', {
    templateUrl: 'modules/app/html/app.html',
    controller: 'AppController',
    controllerAs: '$app',
    abstract: true,
    resolve: {
      _auth: ['$auth', 'clientStore', function ($auth, clientStore) {
        if (clientStore.hasStoredToken()) {
          return $auth.auth(clientStore.getStoredToken());
        }
        return $auth;
      }]
    }
  });
}]);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui').controller('AppController', AppController);

AppController.$inject = ['$scope', '$mdDialog', '$animate'];
function AppController($scope, $mdDialog, $animate) {

  $scope.showLegal = function ($event, docId) {
    var dialog = {
      controller: 'LegalDialogController',
      templateUrl: 'modules/app/html/dialog/' + docId + '.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true
    };

    $mdDialog.show(dialog).then(function () {}, function () {});
  };
};

angular.module('DataStudioWebui').controller('LegalDialogController', LegalDialogController);

LegalDialogController.$inject = ['$scope', '$mdDialog'];
function LegalDialogController($scope, $mdDialog) {

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide();
  };
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui').factory('$app', dsAppFactory);

dsAppFactory.$inject = ['clientStore', 'Token'];
function dsAppFactory(clientStore, Token) {

  var $app = void 0;

  var App = function () {
    function App() {
      _classCallCheck(this, App);

      this.user = null;
      this.loggedin = false;
    }

    _createClass(App, [{
      key: 'login',
      value: function login() {}
    }, {
      key: 'logout',
      value: function logout() {}
    }, {
      key: 'auth',
      value: function auth(tokenKey) {
        var token = new Token(tokenKey);
      }
    }]);

    return App;
  }();

  $app = new App();

  if (clientStore.hasStoredToken()) {
    $app.auth(clientStore.getStoredToken());
  }

  return $app;
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui').constant('TOKEN_KEY', 'DSWEBUISESS_KEY');

angular.module('DataStudioWebui').provider('$localStorage', localStorageProvider);

localStorageProvider.$inject = [];
function localStorageProvider() {
  this.$get = function () {
    return window.localStorage;
  };
}

angular.module('DataStudioWebui').factory('clientStore', clientStore);

clientStore.$inject = ['$localStorage', 'TOKEN_KEY'];
function clientStore($localStorage, TOKEN_KEY) {

  return {
    hasStoredToken: function hasStoredToken() {
      return !!(TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY]);
    },
    getStoredToken: function getStoredToken() {
      return TOKEN_KEY in $localStorage && $localStorage[TOKEN_KEY] || null;
    },
    setStoredToken: function setStoredToken(newValue) {
      return $localStorage.setItem(TOKEN_KEY, newValue);
    },
    clearStoredToken: function clearStoredToken() {
      return $localStorage.removeItem(TOKEN_KEY);
    },
    clearEverything: function clearEverything() {
      return $localStorage.clear();
    }
  };
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Anon', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.Api']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.User', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'DataStudioWebui.UserDashboard']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.UserDashboard', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Anon').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.anon', {
    templateUrl: 'modules/anon/html/root.html',
    controller: 'AnonController',
    controllerAs: '$anon',
    abstract: true,
    resolve: {
      authorized: ['$auth', '$state', function ($auth, $state) {
        if ($auth.isAuthorized) {
          $state.go('app.user.dashboard');
        }
        return $auth.isAuthorized;
      }]
    }
  }).state('app.anon.login', {
    url: '/login',
    templateUrl: 'modules/anon/html/login.html'
  }).state('app.anon.signup', {
    url: '/signup',
    templateUrl: 'modules/anon/html/signup.html'
  });
}]);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.app', {
    url: '/app/:appId',
    templateUrl: 'modules/appEditor/html/root.html',
    controller: 'AppEditorController',
    controllerAs: '$app',
    abstract: true,
    resolve: {
      app: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        return $api.apiGet('/app/' + appId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  }).state('app.user.app.dashboard', {
    url: '',
    templateUrl: 'modules/appEditor/html/dashboard.html',
    data: {
      name: 'summary'
    }
  }).state('app.user.app.schemas', {
    url: '/schemas',
    templateUrl: 'modules/appEditor/html/schemas.html',
    data: {
      name: 'schemas'
    }
  }).state('app.user.app.schema', {
    url: '/schema/:schemaId',
    templateUrl: 'modules/appEditor/html/schema.html',
    data: {
      name: 'schemas'
    },
    controller: 'AppSchemaEditorController',
    controllerAs: '$schemaCtrl',
    resolve: {
      schema: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        var schemaId = $stateParams.schemaId;
        return $api.apiGet('/app/' + appId + '/schema/' + schemaId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }],
      properties: ['$api', '$stateParams', function ($api, $stateParams) {
        var schemaId = $stateParams.schemaId;
        return $api.apiGet('/schema/' + schemaId + '/properties').then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return [];
        });
      }]
    }
  }).state('app.user.app.apis', {
    url: '/apis',
    templateUrl: 'modules/appEditor/html/apis.html',
    data: {
      name: 'apis'
    }
  }).state('app.user.app.api', {
    url: '/api/:apiId',
    templateUrl: 'modules/appEditor/html/api.html',
    data: {
      name: 'apis'
    },
    controller: 'AppApiEditorController',
    controllerAs: '$apiCtrl',
    resolve: {
      api: ['$api', '$stateParams', function ($api, $stateParams) {
        var appId = $stateParams.appId;
        var apiId = $stateParams.apiId;
        return $api.apiGet('/app/' + appId + '/api/' + apiId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }],
      routes: ['$api', '$stateParams', function ($api, $stateParams) {
        var apiId = $stateParams.apiId;
        return $api.apiGet('/api/' + apiId + '/routes').then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }],
      operations: ['$api', '$stateParams', function ($api, $stateParams) {
        var apiId = $stateParams.apiId;
        return $api.apiGet('/api/' + apiId + '/operations').then(function (res) {
          var r = {
            all: res.data,
            byRouteId: {},
            orphaned: []
          };
          r.all.forEach(function (d) {
            var routeId = d.RouteId;
            if (!routeId) {
              return r.orphaned.push(d);
            }
            r.byRouteId[routeId] = r.byRouteId[routeId] || [];
            r.byRouteId[routeId].push(d);
          });
          return r;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  }).state('app.user.app.clients', {
    url: '/clients',
    templateUrl: 'modules/appEditor/html/clients.html',
    data: {
      name: 'clients'
    }
  });
}]);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.User').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user', {
    templateUrl: 'modules/user/html/root.html',
    controller: 'UserController',
    controllerAs: '$user',
    abstract: true,
    resolve: {
      userApps: ['$api', function ($api) {
        return $api.apiGet('/apps/all').then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return [];
        });
      }],
      user: ['$auth', '$api', '$state', function ($auth, $api, $state) {
        try {
          return $api.apiGet('/user/' + $auth.user.Id).then(function (res) {
            return res.data;
          }).catch(function (err) {
            $state.go('app.anon.login');
          });
        } catch (err) {
          $state.go('app.anon.login');
        }
      }]
    }
  });
}]);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.UserDashboard').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.dashboard', {
    url: '/dashboard',
    templateUrl: 'modules/userDashboard/html/dashboard.html',
    controller: 'DashboardController'
  });
}]);
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Anon').controller('AnonController', AnonController);

AnonController.$inject = ['$rootScope', '$scope', '$state', '$auth'];
function AnonController($rootScope, $scope, $state, $auth) {

  $rootScope.$on('authorized', function () {
    $state.go('app.user.dashboard');
  });

  if ($auth.isAuthorized) {
    $state.go('app.user.dashboard');
  }
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Anon').controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$auth', '$state', '$mdDialog', '$login', '$timeout'];
function LoginController($scope, $auth, $state, $mdDialog, $login, $timeout) {

  $scope.error = '';

  $scope.credentials = {
    Login: '',
    Password: ''
  };

  $scope.onSubmit = function ($ev) {

    $ev.preventDefault();

    console.log($ev);

    var Login = $scope.credentials.Login;
    var Password = $scope.credentials.Password;

    $login(Login, Password).then(function () {}).catch(function (err) {
      var errorMsg = '';
      if (err.data && err.data.ErrorMsg) {
        errorMsg = err.data.ErrorMsg;
      }

      $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Login failed').textContent(errorMsg).ariaLabel('Login error dialog').ok('Got it!').targetEvent($ev));

      $timeout(function () {
        $scope.error = errorMsg[2];
      });
    });
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Anon').controller('SignupController', SignupController);

SignupController.$inject = ['$state', '$scope', '$signup', '$timeout', '$mdDialog'];
function SignupController($state, $scope, $signup, $timeout, $mdDialog) {

  disableSignup();

  $scope.error = '';
  $scope.signupEnabled = true;

  $scope.showProgress = false;

  $scope.newUser = {
    EmailAddress: '',
    Password: ''
  };

  enableSignup();

  $scope.onSubmit = function ($ev) {

    disableSignup();

    $ev.preventDefault();

    showProgressBar();

    var Email = $scope.newUser.EmailAddress;
    var Password = $scope.newUser.Password;

    $signup(Email, Password).then(function () {
      var d = $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Success!').textContent('Your account has been created').ariaLabel('Signup success notification').ok('Awesome!').targetEvent($ev);
      $mdDialog.show(d).then(function () {
        $state.go('app.anon.login');
      });
    }).catch(function (errorMsg) {
      hideProgressBar();

      var d = $mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Signup failed').textContent(errorMsg).ariaLabel('Signup error notification').ok('Got it!').targetEvent($ev);

      $mdDialog.show(d).then(function () {
        enableSignup();
      });

      $timeout(function () {
        $scope.error = errorMsg[2];
      });
    });
  };

  function enableSignup() {
    $scope.signupEnabled = true;
  }

  function disableSignup() {
    $scope.signupEnabled = false;
  }

  function showProgressBar() {
    $scope.showProgress = true;
  }

  function hideProgressBar() {
    $scope.showProgress = false;
  }
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.User').controller('LayoutController', LayoutController);

LayoutController.$inject = ['$scope', '$mdDialog', '$logout', '$mdSidenav'];
function LayoutController($scope, $mdDialog, $logout, $mdSidenav) {

  var originatorEv = void 0;

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.changePassword = function () {
    $mdToast.show($mdToast.simple().content('Password clicked!').position('top right').hideDelay(2000));
  };

  $scope.changeProfile = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/modules/layouts/main-page/user-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    }).then(function (answer) {
      $mdToast.show($mdToast.simple().content('You said the information was "' + answer + '".').position('top right').hideDelay(2000));
    }, function () {
      $mdToast.show($mdToast.simple().content('You cancelled the dialog.').position('top right').hideDelay(2000));
    });

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
  };

  $scope.logout = function () {
    $logout();
  };

  $scope.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.User').controller('SidenavController', SidenavController);

SidenavController.$inject = ['$scope', '$mdSidenav'];
function SidenavController($scope, $mdSidenav) {

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.User').controller('UserController', UserController);

UserController.$inject = ['$api', '$scope', '$rootScope', '$auth', '$state', '$mdDialog', '$timeout', 'user', 'userApps'];
function UserController($api, $scope, $rootScope, $auth, $state, $mdDialog, $timeout, user, userApps) {

  $rootScope.$on('unauthorized', function () {
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

    var confirm = $mdDialog.prompt().title('Name your new app').placeholder('My App').ariaLabel('App name').initialValue('').targetEvent($event).ok('Create App').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      createApp(result);
    }, function () {});
  };

  function createApp(name) {

    var newApp = {
      Name: name
    };

    $api.apiPost('/apps', newApp).then(function (res) {
      $timeout(function () {
        Object.assign(newApp, res.data);
        newApp.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $scope.apps.push(newApp);
  }
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').controller('AppApiEditorController', AppApiEditorController);

AppApiEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'ApiSchema', 'api', 'routes', 'operations'];
function AppApiEditorController($api, $timeout, $scope, $state, $mdDialog, ApiSchema, api, routes, operations) {

  var originatorEv = void 0;

  var $apiCtrl = this;

  $apiCtrl.api = api;

  $apiCtrl.operations = operations;
  $apiCtrl.routes = routes;

  $apiCtrl.openMenu = function ($mdMenu, $event) {
    originatorEv = $event;
    $mdMenu.open($event);
  };

  $apiCtrl.switchApi = function (apiId) {
    if (!apiId) {
      return;
    }
    $state.go('app.user.app.api', { apiId: apiId });
  };

  $apiCtrl.deleteOperation = function (operation) {
    var operationId = operation.Id;
    if (!operationId) {
      return;
    }
    $api.apiDelete('/operation/' + operationId).then(function (res) {
      $timeout(function () {
        var routeId = operation.RouteId;
        var i = $apiCtrl.operations.all.indexOf(operation);
        var l = $apiCtrl.operations.byRouteId[routeId].indexOf(operation);
        $apiCtrl.operations.all.splice(i, 1);
        $apiCtrl.operations.byRouteId[routeId].splice(l, 1);
      });
    }).catch(function (err) {
      console.log(err);
    });
  };

  $apiCtrl.showSchemaView = function ($event) {

    var s = function () {
      return new ApiSchema(operations.all, routes);
    }();

    var schemaView = {
      controller: 'AppApiSchemaDialogController',
      templateUrl: 'modules/appEditor/html/dialog/viewApiSchema.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        schema: s
      }
    };

    $mdDialog.show(schemaView).then(function () {}, function () {});
  };

  $apiCtrl.createOperation = function ($event, route) {

    var createApiOperation = {
      controller: 'CreateApiOperationDialogController',
      templateUrl: 'modules/appEditor/html/dialog/createApiOperation.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        apiRoute: route
      }
    };

    $mdDialog.show(createApiOperation).then(function (data) {
      createOperation(data);
    }, function () {});
  };

  function createOperation(data) {

    data = data || {};

    var route = data._apiRoute;
    var name = data.Name;
    var method = data.Method;

    var routeId = route.Id || null;
    var newOperation = {
      RouteId: routeId,
      Name: name,
      Method: method
    };

    $api.apiPost('/api/' + apiId() + '/operations', newOperation).then(function (res) {
      $timeout(function () {
        Object.assign(newOperation, res.data);
        newOperation.Id = res.data.Id;

        if (null === routeId) {
          return $apiCtrl.operations.orphaned.push(newOperation);
        }

        $apiCtrl.operations.byRouteId[routeId] = $apiCtrl.operations.byRouteId[routeId] || [];
        $apiCtrl.operations.byRouteId[routeId].push(newOperation);
        $apiCtrl.operations.all.push(newOperation);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  $apiCtrl.createRoute = function ($event) {

    var confirm = $mdDialog.prompt().title('Specify the Route Path').placeholder('/object/:objectId').ariaLabel('Route Path').initialValue('').targetEvent($event).ok('Create Route').cancel('Cancel');

    $mdDialog.show(confirm).then(function (path) {
      createRoute(path);
    }, function () {});
  };

  function createRoute(path) {

    var newRoute = {
      Path: path
    };

    $api.apiPost('/api/' + apiId() + '/routes', newRoute).then(function (res) {
      $timeout(function () {
        Object.assign(newRoute, res.data);
        newRoute.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $apiCtrl.routes.push(newRoute);
  }

  function apiId() {
    return $apiCtrl.api.Id;
  }
}
"use strict";
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').controller('AppEditorController', AppEditorController);

AppEditorController.$inject = ['$api', '$timeout', '$rootScope', '$scope', '$state', '$mdDialog', 'app'];
function AppEditorController($api, $timeout, $rootScope, $scope, $state, $mdDialog, app) {

  var _app = {
    model: app,
    schemas: app.Schemas,
    apis: app.Apis,
    clients: app.Clients
  };

  $scope.chips = ["Id"];
  $scope.currentNavItem = $state.current.data.name;

  $scope.go = function (dest) {
    $state.go('app.user.app.' + dest);
  };

  console.log(_app);

  $scope.model = _app.model;
  $scope.schemas = _app.schemas;
  $scope.apis = _app.apis;
  $scope.clients = _app.clients;

  $rootScope.$on('$stateChangeSuccess', function ($event, toState, toParams) {
    console.log("*****", toState.data.name);
    $timeout(function () {
      $scope.currentNavItem = toState.data.name;
    });
  });

  $scope.addApiDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('API Name').textContent('Choose a name for the API').placeholder('e.g. UserApi').ariaLabel('API Name').initialValue('').targetEvent($event).ok('Add API').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/apis', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.apis.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
  $scope.addClientDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('Client Name').textContent('Choose a name for the Client').placeholder('e.g. WebClient').ariaLabel('Client Name').initialValue('').targetEvent($event).ok('Add Client').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/clients', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.clients.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
  $scope.addSchemaDialog = function ($event) {
    var confirm = $mdDialog.prompt().title('Schema Name').textContent('Choose a name for the Schema').placeholder('e.g. UserProfile').ariaLabel('Schema Name').initialValue('').targetEvent($event).ok('Add Schema').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {

      var appId = $scope.model.Id;

      $api.apiPost('/app/' + appId + '/schemas', { Name: result }).then(function (res) {
        $timeout(function () {
          $scope.schemas.push(res.data);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }, function () {
      // dialog cancelled
    });
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').controller('AppSchemaEditorController', AppSchemaEditorController);

AppSchemaEditorController.$inject = ['$api', '$timeout', '$scope', '$state', '$mdDialog', 'schema', 'properties'];
function AppSchemaEditorController($api, $timeout, $scope, $state, $mdDialog, schema, properties) {

  var STRING = 'string';

  var originatorEv = void 0;

  var $schemaCtrl = this;

  $schemaCtrl.schema = schema;
  $schemaCtrl.properties = properties;

  $schemaCtrl.openMenu = function ($mdMenu, $event) {
    originatorEv = $event;
    $mdMenu.open($event);
  };

  $schemaCtrl.deleteProperty = function (property) {
    var propertyId = property.Id;
    if (!propertyId) {
      return;
    }
    $api.apiDelete('/property/' + propertyId).then(function (res) {
      $timeout(function () {
        var i = $schemaCtrl.properties.indexOf(property);
        $schemaCtrl.properties.splice(i, 1);
      });
    }).catch(function (err) {
      console.log(err);
    });
  };

  $schemaCtrl.createProperty = function ($event) {

    var confirm = $mdDialog.prompt().title('Specify the Property Key').placeholder('e.g. "BackgroundColor"').ariaLabel('Property Key').initialValue('').targetEvent($event).ok('Create Property').cancel('Cancel');

    $mdDialog.show(confirm).then(function (key) {
      createProperty(key);
    }, function () {});
  };

  function createProperty(key) {

    var newProperty = {
      Key: key
    };

    $api.apiPost('/schema/' + schemaId() + '/properties', newProperty).then(function (res) {
      $timeout(function () {
        Object.assign(newRoute, res.data);
        newRoute.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $schemaCtrl.properties.push(newProperty);
  }

  function schemaId() {
    return $schemaCtrl.schema.Id;
  }
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').controller('AppApiSchemaDialogController', AppApiSchemaDialogController);

AppApiSchemaDialogController.$inject = ['ApiSchema', '$scope', '$mdDialog', 'schema'];
function AppApiSchemaDialogController(ApiSchema, $scope, $mdDialog, schema) {

  $scope.schema = schema;

  $scope.selectAll = function () {
    var dialogEl = document.getElementById('Dialog_ViewApiSchema');
    var sourceEl = dialogEl.querySelector("div[class='schema-source']");
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

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide();
  };
}

angular.module('DataStudioWebui.AppEditor').controller('CreateApiOperationDialogController', CreateApiOperationDialogController);

CreateApiOperationDialogController.$inject = ['$scope', '$timeout', '$mdDialog', 'apiRoute'];
function CreateApiOperationDialogController($scope, $timeout, $mdDialog, apiRoute) {
  $scope.$data = {
    Method: 'get',
    _apiRoute: apiRoute
  };

  $scope.apiRoute = apiRoute;

  $scope.$watch('$data.Method', function (newValue, oldValue) {
    if (oldValue === newValue || !newValue) {
      return;
    }
    var dialogEl = document.getElementById('Dialog_CreateApiOperation');
    var nameInputEl = dialogEl.querySelector('input[name="name"]');
    $timeout(function () {
      nameInputEl.focus();
    }, 300);
  });

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide($scope.$data);
  };
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.UserDashboard').controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', '$mdDialog', 'userApps'];
function DashboardController($scope, $mdDialog, userApps) {

  $scope.apps = userApps;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('$api', dsApiFactory);

dsApiFactory.$inject = ['$auth', '$appEnvironment', '$http'];
function dsApiFactory($auth, $appEnvironment, $http) {

  var POST = 'post';
  var GET = 'get';
  var DELETE = 'delete';

  var DsApi = function () {
    function DsApi() {
      _classCallCheck(this, DsApi);

      this.url = $appEnvironment.config.apiUrl;
    }

    _createClass(DsApi, [{
      key: 'apiGet',
      value: function apiGet(url) {
        var _this = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this.authorization;
          var opts = {
            method: GET,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          $http(opts).then(resolve, reject);
        });
      }
    }, {
      key: 'apiPost',
      value: function apiPost(url, d) {
        var _this2 = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this2.authorization;
          var opts = {
            method: POST,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          if (d) {
            opts.data = JSON.stringify(d);
          }

          $http(opts).then(resolve, reject);
        });
      }
    }, {
      key: 'apiDelete',
      value: function apiDelete(url) {
        var _this3 = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this3.authorization;
          var opts = {
            method: DELETE,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          $http(opts).then(resolve, reject);
        });
      }
    }]);

    return DsApi;
  }();

  return new DsApi();

  function hasAuthorization() {
    return $auth.isAuthorized;
  }
  function getAuthorization() {
    return $auth.authorization;
  }
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('$auth', dsAuthFactory);

dsAuthFactory.$inject = ['User', 'Token', '$rootScope', 'clientStore'];
function dsAuthFactory(User, Token, $rootScope, clientStore) {
  var Auth = function () {
    function Auth() {
      _classCallCheck(this, Auth);

      this.isAuthorized = false;
      this.token = null;
      this.user = null;
    }

    _createClass(Auth, [{
      key: 'auth',
      value: function auth(key) {
        this.token = new Token(key);
        this.user = new User(this.token.UserId);
        this.isAuthorized = true;
        clientStore.setStoredToken(key);
        $rootScope.$emit('authorized');
        return this;
      }
    }, {
      key: 'remove',
      value: function remove() {
        this.token = null;
        this.user = null;
        this.isAuthorized = false;
        clientStore.clearStoredToken();
        $rootScope.$emit('unauthorized');
        return this;
      }
    }, {
      key: 'authorization',
      get: function get() {
        if (null === this.token) {
          return '';
        }
        return this.token.Key;
      }
    }]);

    return Auth;
  }();

  return new Auth();
}
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('$login', dsLoginFactory);

dsLoginFactory.$inject = ['$auth', '$api'];
function dsLoginFactory($auth, $api) {
  return function (Login, Password) {
    return new Promise(function (resolve, reject) {
      $api.apiPost('/auth/attempts', {
        Login: Login,
        Password: Password
      }).then(function (res) {
        var token = res.data.Token;
        if (token) {
          $auth.auth(token.Key);
          return resolve();
        }
        reject(new Error(res.data.Error));
      }).catch(reject);
    });
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('$logout', dsLogoutFactory);

dsLogoutFactory.$inject = ['$auth', '$api'];
function dsLogoutFactory($auth, $api) {
  return function () {
    return new Promise(function (resolve, reject) {
      // $api.apiPost('/logout', {})
      //   .then((res) => {
      $auth.remove();
      return resolve();
      // })
      // .catch(reject);
    });
  };
};
'use strict';

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('$signup', dsSignupFactory);

dsSignupFactory.$inject = ['$auth', '$api'];
function dsSignupFactory($auth, $api) {
  return function (Email, NewPassword) {
    return new Promise(function (resolve, reject) {
      $api.apiPost('/signups', {
        Email: Email,
        NewPassword: NewPassword
      }).then(function (res) {
        if (202 === res.status) {
          return resolve();
        }
        reject(new Error(res.data.Error || "UNKNOWN_ERROR_408392"));
      }).catch(function (res) {
        if (400 === res.status) {
          return reject(res.data.ErrorMsg);
        }
        console.log(res);
        reject(new Error("UNKNOWN_ERROR_408393"));
      });
    });
  };
};
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('Token', TokenFactory);

TokenFactory.$inject = [];
function TokenFactory() {
  var Token = function Token(key) {
    _classCallCheck(this, Token);

    var keyParts = key.split(/\//g);

    this.Key = key;
    this.Id = keyParts[0];
    this.UserId = keyParts[1];
    this.Created = keyParts[2];
  };

  return Token;
}
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.Api').factory('User', UserFactory);

UserFactory.$inject = [];
function UserFactory() {
  var User = function User(Id) {
    _classCallCheck(this, User);

    this.Id = Id;
    this.Login = null;

    this.Apps = [];
  };

  return User;
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Data Studio by Eviratec
 * Copyright (c) 2017 - 2019 Callan Peter Milne
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

angular.module('DataStudioWebui.AppEditor').factory('ApiSchema', ApiSchemaFactory);

ApiSchemaFactory.$inject = [];
function ApiSchemaFactory() {
  var ApiSchema = function () {
    function ApiSchema(operations, routes) {
      _classCallCheck(this, ApiSchema);

      this.operations = operations;
      this.routes = routes;
    }

    _createClass(ApiSchema, [{
      key: 'toJSON',
      value: function toJSON() {
        var operations = this.operations;
        var routes = this.routes;
        var paths = {};
        var routePaths = {};

        routes.forEach(function (route) {
          var path = route.Path;
          paths[path] = {};
          routePaths[route.Id] = path;
        });

        operations.forEach(function (operation) {

          var op = void 0;
          var method = void 0;

          var targetPath = routePaths[operation.RouteId];

          var pathExists = targetPath in paths;
          if (!pathExists) {
            return;
          }

          method = operation.Method;
          op = {
            operationId: operation.Name,
            summary: '',
            description: '',
            tags: [],
            consumes: ['application/json'],
            produces: ['application/json'],
            params: [],
            responses: {}
          };

          decorate(op, method, targetPath);

          paths[targetPath][method] = op;
        });

        return {
          swagger: '2.0',
          info: {
            title: '',
            description: '',
            version: '0.0.0-ALPHA',
            contact: {
              email: ''
            },
            license: {
              name: '',
              url: ''
            }
          },
          host: 'api.localhost',
          basePath: '/',
          tags: [],
          schemes: ['http', 'https'],
          paths: paths,
          definitions: {}
        };
      }
    }, {
      key: 'toString',
      value: function toString() {
        return JSON.stringify(this, undefined, '  ');
      }
    }]);

    return ApiSchema;
  }();

  ;

  return ApiSchema;

  function decorate(op, method, uri) {

    var uriParts = uri.split(/\//g).slice(1);
    var className = '';

    uriParts.forEach(function (uriPart) {
      var isVariable = ':' === uriPart[0];
      if (!isVariable) {
        var c = uriPart[0].toUpperCase();
        className = c + uriPart.substr(1);
        className = className.replace(/ies$/, 'y');
        className = className.replace(/s$/, '');
        op.tags.push(className);
        return;
      }
      op.params.push({
        in: 'path',
        name: uriPart.substr(1),
        description: '',
        required: true,
        type: 'string'
      });
    });

    if ('post' === method) {
      add303Response(op);
      add400Response(op);
      add401Response(op);
      add403Response(op);
      op.params.push({
        in: 'body',
        name: 'body',
        description: 'The new `' + className + '`',
        required: true,
        schema: {
          $ref: '#/definitions/New' + className
        }
      });
    }

    if ('get' === method) {
      add200Response(op);
      add404Response(op);
    }

    if ('put' === method) {
      add200Response(op);
      add202Response(op);
      add400Response(op);
      add401Response(op);
      add403Response(op);
      op.params.push({
        in: 'body',
        name: 'body',
        description: 'The `' + className + '` data to save',
        required: true,
        schema: {
          $ref: '#/definitions/' + className
        }
      });
    }

    if ('delete' === method) {
      add204Response(op);
      add401Response(op);
      add403Response(op);
      add404Response(op);
    }

    function add200Response(op) {
      op.responses['200'] = {
        description: 'OK',
        schema: {
          $ref: '#/definitions/' + className
        }
      };
    }

    function add202Response(op) {
      op.responses['202'] = {
        description: 'Accepted'
      };
    }

    function add204Response(op) {
      op.responses['204'] = {
        description: 'No Content'
      };
    }

    function add303Response(op) {
      op.responses['303'] = {
        description: 'See Other'
      };
    }

    function add400Response(op) {
      op.responses['400'] = {
        description: 'Bad Request'
      };
    }

    function add401Response(op) {
      op.responses['401'] = {
        description: 'Unauthorized'
      };
    }

    function add403Response(op) {
      op.responses['403'] = {
        description: 'Forbidden'
      };
    }

    function add404Response(op) {
      op.responses['404'] = {
        description: 'Not Found'
      };
    }
  }
}
'use strict';

angular.module('DataStudioWebui').run(['$templateCache', function ($templateCache) {
  $templateCache.put('modules/anon/html/login.html', '<div id="login" layout="column" layout-fill layout-align="center center">\n  <div class="login-form form-wrapper" layout="column" md-whiteframe="12dp">\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-headline">DataStudio</span>\n        <span class="md-subhead">User Login</span>\n      </div>\n\n    </header>\n\n    <form layout="column"\n      ng-controller="LoginController"\n      ng-submit="onSubmit($event)">\n\n      <div class="login-error"\n        ng-if="error">\n        <strong>Login failed:</strong>\n        {{ error }}\n      </div>\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Username / Email</label>\n          <input ng-model="credentials.Login" required ng-minlength="5" />\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input ng-model="credentials.Password" type="password" required ng-minlength="7" />\n        </md-input-container>\n\n      </md-content>\n\n      <div class="submit-row" layout="row" layout-align="end center">\n        <!-- <a class="md-button" href="#">Forgot Password</a> -->\n        <md-button class="md-primary md-raised" type="submit">\n          Login\n        </md-button>\n      </div>\n\n    </form>\n\n  </div>\n  <div class="new-user-banner" layout="row" layout-align="start center" md-whiteframe="12dp">\n    <strong>New, here?</strong>\n    <span>It\'s free to signup</span>\n    <span flex></span>\n    <a class="md-button" ui-sref="app.anon.signup">Sign-up</a>\n  </div>\n</div>\n');
  $templateCache.put('modules/anon/html/root.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/anon/html/signup.html', '<div id="signup" layout layout-fill layout-align="center center">\n  <div class="signup-form form-wrapper" layout="column" md-whiteframe="12dp">\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-caption">DataStudio</span>\n        <span class="md-headline">User Signup</span>\n      </div>\n\n    </header>\n\n    <form name="signupForm" layout="column" ng-submit="onSubmit($event)"\n      ng-controller="SignupController">\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Email Address</label>\n          <input name="emailAddress"\n            ng-model="newUser.EmailAddress"\n            required\n            type="email"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.emailAddress.$error">\n            <div ng-message="required">A valid email address is required.</div>\n          </div>\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input name="password"\n            ng-model="newUser.Password"\n            required\n            type="password"\n            ng-pattern="/^.{7,}$/"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.password.$error"\n            md-auto-hide="true"\n            multiple>\n            <div ng-message="required">Password is required.</div>\n            <div ng-message="pattern">Password must be at least 7 characters</div>\n          </div>\n        </md-input-container>\n\n        <div>\n          <md-checkbox\n            ng-model="touAccepted"\n            aria-label="I have read and agree to the Terms of Use and Privacy Policy"\n            ng-true-value="true"\n            ng-false-value="false"\n            class="md-align-top-left" flex>\n            I have read and agree to the\n            <a href ng-click="showLegal($event, \'termsOfUse\')">Terms of Use</a>\n            and\n            <a href ng-click="showLegal($event, \'privacyPolicy\')">Privacy Policy</a>\n          </md-checkbox>\n        </div>\n\n      </md-content>\n\n      <div class="submit-row" layout="row" layout-align="end center">\n        <md-button class="md-primary md-raised" type="submit" ng-disabled="!touAccepted || submitDisabled">\n          Create my account\n        </md-button>\n      </div>\n\n      <md-progress-linear md-mode="indeterminate" ng-if="showProgress"></md-progress-linear>\n\n    </form>\n\n  </div>\n</div>\n');
  $templateCache.put('modules/app/html/app.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/user/html/root.html', '<md-sidenav class="md-sidenav-left md-whiteframe-z2"\n  layout="column"\n  md-theme="sidenavTheme"\n  md-component-id="left"\n  md-is-locked-open="$mdMedia(\'gt-md\')">\n\n  <div ng-controller="SidenavController as $sidenav"\n    ng-cloak>\n\n    <header layout="row" layout-align="start center">\n\n      <img src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-headline">DataStudio</span>\n        <span class="md-caption">eviratec.software</span>\n      </div>\n\n    </header>\n\n    <md-list>\n      <md-list-item ui-sref="app.user.dashboard"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          apps\n        </md-icon>\n        <p>Dashboard</p>\n      </md-list-item>\n\n      <md-divider></md-divider>\n\n      <md-subheader ng-click="showSidenavApps=!showSidenavApps">\n        My Apps\n      </md-subheader>\n\n      <md-list-item ui-sref-active="active"\n        ui-sref="app.user.app.dashboard({ appId: app.Id })"\n        ng-repeat="app in apps"\n        ng-if="showSidenavApps"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          folder\n        </md-icon>\n        <p>{{ app.Name }}</p>\n      </md-list-item>\n\n      <md-list-item\n        ng-click="createApp()"\n        ng-if="showSidenavApps"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          create\n        </md-icon>\n        <p>Create an App</p>\n      </md-list-item>\n\n    </md-list>\n  </div>\n</md-sidenav>\n\n<div class="relative"\n  layout="column"\n  role="main"\n  ng-controller="LayoutController"\n  layout-fill\n  ng-cloak>\n  <md-toolbar id="userToolbar">\n    <div class="md-toolbar-tools">\n\n      <img class="logo"\n        src="https://s3-ap-southeast-2.amazonaws.com/data-studio/pub/assets/data-studio.png" />\n\n      <h3 class="md-caption"\n        ng-if="$mdMedia(\'gt-xs\')">\n        DataStudio\n      </h3>\n\n      <span flex></span>\n\n      <md-menu>\n        <!-- trigger -->\n        <md-button\n          aria-label="Open Settings"\n          ng-click="openMenu($mdOpenMenu, $event)">\n          <md-icon class="material-icons">\n            person\n          </md-icon>\n          <span class="md-caption"\n            md-show-gt-xs>\n            {{ login }}\n          </span>\n          <md-icon class="material-icons">\n            arrow_drop_down\n          </md-icon>\n        </md-button>\n        <!-- content -->\n        <md-menu-content width="4">\n          <md-menu-item>\n            <md-button ng-click="changeProfile($event)">\n              <md-icon>face</md-icon>\n              Profile\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ng-click="changePassword()">\n              <md-icon>lock</md-icon>\n              Password\n            </md-button>\n          </md-menu-item>\n          <md-menu-divider></md-menu-divider>\n          <md-menu-item>\n            <md-button ng-click="logout()">\n              <md-icon>power_settings_new</md-icon>\n              Logout\n            </md-button>\n          </md-menu-item>\n        </md-menu-content>\n      </md-menu>\n\n      <md-button class="md-icon-button"\n        aria-label="Menu"\n        ng-click="toggleSidenav(\'left\')"\n        hide-gt-md>\n        <md-icon class="material-icons">\n          menu\n        </md-icon>\n      </md-button>\n    </div>\n  </md-toolbar>\n\n  <md-content class="ds-main-content"\n    layout="column"\n    md-scroll-y\n    flex>\n    <div layout="column"\n      layout-fill\n      ui-view>\n    </div>\n  </md-content>\n\n</div>\n');
  $templateCache.put('modules/userDashboard/html/dashboard.html', '<div layout="row"\n  flex>\n\n  <div class="user-dashboard"\n    style="margin: 8px;padding:8px;"\n    flex>\n\n    <div layout="column">\n      <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n        layout="row"\n        layout-align="start center">\n        <md-card-header-text>\n          <span class="md-headline">\n            My Apps\n          </span>\n        </md-card-header-text>\n      </div>\n\n      <div layout="row" layout-xs="column" layout-wrap>\n        <div flex-gt-xs="33" ng-repeat="app in apps">\n          <md-card>\n            <md-card-header ui-sref="app.user.app.dashboard({ appId: app.Id })">\n              <md-card-avatar>\n                <md-icon ng-if="!app.IconUrl" class="material-icons">\n                  webui\n                </md-icon>\n                <img ng-if="app.IconUrl" src="{{ app.IconUrl }}" />\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">{{ app.Name }}</span>\n                <span class="md-subhead">DataStudio App</span>\n              </md-card-header-text>\n            </md-card-header>\n            <md-divider></md-divider>\n            <md-card-actions layout="row" layout-align="end center">\n              <md-button class="md-primary"\n                ui-sref="app.user.app.dashboard({ appId: app.Id })">\n                <md-icon class="material-icons">\n                  edit\n                </md-icon>\n                Edit App\n              </md-button>\n            </md-card-actions>\n          </md-card>\n        </div>\n        <div flex-gt-xs="33">\n          <div class="create-app-card" layout="column" layout-align="center center">\n            <span>New app?</span>\n            <md-button class="md-raised md-primary"\n              ng-click="createApp()">\n              <md-icon class="material-icons">\n                create\n              </md-icon>\n              Create a new App\n            </md-button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/api.html', '<div class="app-apis"\n  layout="row"\n  layout-xs="column">\n\n  <div class="app-api-cards"\n    flex>\n\n    <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n      layout="row"\n      layout-align="start center">\n      <md-card-header-text>\n        <span class="md-headline">\n          <span style="font-weight:300;color:rgba(0,0,0,0.5);">API /</span>\n          {{ $apiCtrl.api.Name }}\n        </span>\n      </md-card-header-text>\n    </div>\n\n    <div ng-if="0 === $apiCtrl.routes.length"\n      layout="row"\n      layout-align="start start"\n      layout-wrap>\n\n      <md-card flex>\n        <md-card-content style="padding:0;" layout-align="center center">\n          <div style="padding: 40px 16px;text-align: center;">\n            Add an API Route to make a start\n            <md-button class="md-primary"\n              ng-click="$apiCtrl.createRoute($event)">\n              <md-icon class="material-icons">\n                edit\n              </md-icon>\n              Create Route\n            </md-button>\n          </div>\n        </md-card-content>\n      </md-card>\n\n    </div>\n\n    <div ng-if="$apiCtrl.routes.length > 0"\n      flex>\n      <div layout="column">\n        <div class="api-route-list">\n          <md-card ng-repeat="route in $apiCtrl.routes">\n            <md-card-content style="padding:0;">\n              <div class="api-route">\n\n                <div class="api-route-header"\n                  layout="row"\n                  layout-align="start center">\n                  <span class="md-body-1">{{ route.Path }}</span>\n                </div>\n\n                <md-divider></md-divider>\n\n                <div class="api-route-wrapper"\n                  layout="row"\n                  layout-wrap="true"\n                  layout-xs="column"\n                  layout-align="start center"\n                  layout-align-xs="start stretch">\n\n                  <div class="api-operation"\n                    ng-repeat="operation in $apiCtrl.operations.byRouteId[route.Id]"\n                    md-whiteframe="1dp"\n                    layout="row"\n                    layout-align="start center"\n                    flex-xs\n                    flex-gt-xs="30">\n                    <span class="md-caption http-method http-{{ operation.Method.toLowerCase() }}">\n                      {{ operation.Method.substr(0,3) }}\n                    </span>\n                    <span class="md-body-1">{{ operation.Name }}</span>\n                    <span flex></span>\n                    <div>\n                      <md-menu class="md-secondary">\n                        <md-button class="md-icon-button" ng-click="$apiCtrl.openMenu($mdMenu, $event)">\n                          <md-icon md-menu-origin class="material-icons">\n                            chevron_right\n                          </md-icon>\n                        </md-button>\n                        <md-menu-content width="4">\n                          <md-menu-item>\n                            <md-button>\n                              Re-name\n                            </md-button>\n                          </md-menu-item>\n                          <md-menu-divider></md-menu-divider>\n                          <md-menu-item>\n                            <md-button ng-click="$apiCtrl.deleteOperation(operation)">\n                              Delete operation\n                            </md-button>\n                          </md-menu-item>\n                        </md-menu-content>\n                      </md-menu>\n                    </div>\n                  </div>\n\n                  <div class="inline-create-btn-wrapper"\n                    layout="row"\n                    layout-align="start center"\n                    flex-xs\n                    flex-gt-xs="30">\n                    <md-button ng-click="$apiCtrl.createOperation($event, route)"\n                      class="md-no-style"\n                      style="margin-top:0;margin-bottom:0;"\n                      layout="row"\n                      flex>\n                      <span flex></span>\n                      <md-icon class="material-icons">add</md-icon>\n                      <span>API operation</span>\n                      <span flex></span>\n                    </md-button>\n                  </div>\n\n                </div>\n\n              </div>\n\n            </md-card-content>\n          </md-card>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="api-side" flex-gt-xs="30" flex-xs>\n    <md-list>\n      <md-list-item ng-click="$apiCtrl.createRoute($event)">\n          <md-icon class="material-icons">add</md-icon>\n          <p>Add Route</p>\n      </md-list-item>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">content_copy</md-icon>\n          <p>Clone / copy</p>\n      </md-list-item>\n      <md-list-item ng-click="null">\n          <md-icon class="material-icons">delete</md-icon>\n          <p>Delete API</p>\n      </md-list-item>\n      <md-divider></md-divider>\n      <md-list-item ng-click="$apiCtrl.showSchemaView($event)">\n          <md-icon class="material-icons">code</md-icon>\n          <p>View JSON/YAML</p>\n      </md-list-item>\n      <md-subheader>App APIs</md-subheader>\n      <md-list-item ng-repeat="api in apis" ui-sref="app.user.app.api({ appId: model.Id, apiId: api.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ api.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/apis.html', '<div class="app-apis"\n  layout="row"\n  layout-xs="column"\n  layout-fill-gt-xs>\n\n  <div style="padding:8px;"\n    layout-xs="column"\n    flex>\n\n    <div layout="column"\n      layout-align="start stretch">\n\n      <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n        layout="row"\n        layout-align="start center">\n        <md-card-header-text>\n          <span class="md-headline">\n            <span style="font-weight:300;color:rgba(0,0,0,0.5);">APIs</span>\n          </span>\n        </md-card-header-text>\n      </div>\n\n      <div style="margin:8px;">\n        <div class=""\n          style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n          layout-align="center center"\n          layout-fill\n          flex\n          layout="column"\n          ng-if="0 === apis.length">\n\n          <p class="md-body-1">\n            Nothing to show yet\n          </p>\n\n          <md-button class="md-primary md-raised"\n            ng-click="addApiDialog($event)">\n            Create API\n          </md-button>\n\n        </div>\n      </div>\n\n      <div layout="row" layout-xs="column" layout-wrap>\n        <div flex-gt-xs="33" ng-repeat="api in apis">\n          <md-card>\n            <md-card-header ui-sref="app.user.app.api({ appId: api.AppId, apiId: api.Id })">\n              <md-card-header-text>\n                <span class="md-title">{{ api.Name }}</span>\n                <span class="md-subhead">{{ $appEditor.api.Name }} API</span>\n              </md-card-header-text>\n            </md-card-header>\n            <md-divider></md-divider>\n            <md-card-actions layout="row" layout-align="end center">\n              <md-button class="md-primary"\n                ui-sref="app.user.app.api({ appId: api.AppId, apiId: api.Id })">\n                <md-icon class="material-icons">\n                  edit\n                </md-icon>\n                Edit API\n              </md-button>\n            </md-card-actions>\n          </md-card>\n        </div>\n        <div flex-gt-xs="33" ng-if="apis.length > 0">\n          <div class="create-api-card" layout="column" layout-align="center center">\n            <md-button class="md-raised md-primary"\n              ng-click="addApiDialog($event)">\n              <md-icon class="material-icons">\n                create\n              </md-icon>\n              Create API\n            </md-button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/clients.html', '<div class="app-clients"\n  layout="row"\n  layout-fill>\n\n  <div style="padding:8px;"\n    flex\n    layout>\n\n    <div class=""\n      style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n      layout-align="center center"\n      layout-fill\n      layout="column">\n\n      <div class="md-display-1"\n        style="margin-bottom: 1em;">\n        App API Clients\n      </div>\n\n      <md-button class="md-primary md-raised"\n        ng-click="addSchemaDialog($event)">\n        Create a new Client\n      </md-button>\n\n    </div>\n\n  </div>\n\n  <div class="client-side" flex="30">\n    <md-list>\n      <md-subheader>App Clients</md-subheader>\n      <md-list-item ng-repeat="client in clients" ui-sref="app.user.app.client({ appId: model.Id, clientId: client.Id})">\n        <md-icon class="material-icons">chevron_right</md-icon>\n        <p>{{ client.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/dashboard.html', '<div class="app-dashboard-cards" layout="row" layout-xs="column">\n\n  <div flex>\n    <div style="padding:8px;"\n      layout="row"\n      layout-xs="column"\n      layout-align-xs="center stretch"\n      layout-wrap>\n      <div flex-gt-xs="50">\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  description\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">Schemas</span>\n                <span class="md-subhead">Data Types</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button"\n                ui-sref="app.user.app.schemas({ appId: model.Id })">\n                <md-icon class="material-icons">chevron_right</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === schemas.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addSchemaDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App Schema\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="schemas.length > 0">\n              <md-list-item ng-repeat="schema in schemas" layout="row"\n                ui-sref="app.user.app.schema({ appId: model.Id, schemaId: schema.Id})">\n                <span flex>{{ schema.Name }}</span>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div>\n      </div>\n\n      <div flex-gt-xs="50">\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  dashboard\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">APIs</span>\n                <span class="md-subhead">For Developers</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button"\n                ui-sref="app.user.app.apis({ appId: model.Id })">\n                <md-icon class="material-icons">chevron_right</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === apis.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addApiDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App API\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="apis.length > 0">\n              <md-list-item ng-repeat="api in apis" layout="row"\n                ui-sref="app.user.app.api({ appId: model.Id, apiId: api.Id})">\n                <span flex>{{ api.Name }}</span>\n                <span class="md-caption" style="color:rgba(0,0,0,0.57);">{{ api.CurrentStable }}</span>\n              </md-list-item>\n            </md-list>\n          </md-card>\n        </div>\n\n        <div>\n          <md-card>\n            <md-card-header style="background-color:#F5F5F5;">\n              <md-card-avatar>\n                <md-icon class="material-icons">\n                  web\n                </md-icon>\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">Clients</span>\n                <span class="md-subhead">For Users</span>\n              </md-card-header-text>\n              <md-button style="margin: 0;" class="md-icon-button"\n                ui-sref="app.user.app.clients({ appId: model.Id })">\n                <md-icon class="material-icons">chevron_right</md-icon>\n              </md-button>\n            </md-card-header>\n            <md-divider></md-divider>\n            <div ng-if="0 === clients.length">\n              <div class="empty-card-filler"\n                layout="column"\n                layout-align="center center">\n                <span>&#9733; {{ model.Name }} &#9733;</span>\n                <md-button class="md-accent"\n                  ng-click="addClientDialog($event)">\n                  <md-icon class="material-icons">add</md-icon>\n                  Add App Client\n                </md-button>\n              </div>\n            </div>\n            <md-list ng-if="clients.length > 0">\n              <md-list-item ng-repeat="client in clients" layout="row"\n                ui-sref="app.user.app.client({ appId: model.Id, clientId: client.Id})">\n                <span flex>{{ client.Name }}</span>\n                <span class="md-caption" style="color:rgba(0,0,0,0.57);">{{ client.CurrentStable }}</span>\n              </md-list-item>\n              <div>\n                {{ client.Name }}\n              </div>\n            </md-list>\n          </md-card>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="dashboard-side" flex-gt-xs="30">\n    <md-list>\n      <md-subheader>App actions</md-subheader>\n      <md-list-item ng-click="addSchemaDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new Schema</p>\n      </md-list-item>\n      <md-list-item ng-click="addApiDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new API</p>\n      </md-list-item>\n      <md-list-item ng-click="addClientDialog($event)">\n        <md-icon class="material-icons">add</md-icon>\n        <p>Create new Client</p>\n      </md-list-item>\n      <md-divider></md-divider>\n      <md-list-item ng-click="null">\n        <md-icon class="material-icons">file_download</md-icon>\n        <p>Download Project</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/root.html', '<div id="appEditor" layout="column" flex>\n\n  <header>\n    <span class="md-headline">\n      <span style="font-weight:300;color:rgba(255,255,255,0.5);">App /</span>\n      {{ model.Name }}\n    </span>\n  </header>\n\n  <md-nav-bar\n    md-theme="darknav"\n    md-selected-nav-item="currentNavItem"\n    nav-bar-aria-label="navigation links">\n    <md-nav-item md-nav-click="go(\'dashboard\')" name="summary">\n      Summary\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'apis\')" name="apis">\n      APIs\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'clients\')" name="clients">\n      Clients\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'schemas\')" name="schemas">\n      Schemas\n    </md-nav-item>\n    <md-nav-item md-nav-click="go(\'users\')" name="users">\n      Users\n    </md-nav-item>\n  </md-nav-bar>\n\n  <div flex ui-view></div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/schema.html', '<div class="app-schemas"\n  layout="row"\n  layout-xs="column">\n\n  <div style="padding:8px;"\n    flex>\n\n    <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n      layout="row"\n      layout-align="start center">\n      <md-card-header-text>\n        <span class="md-headline">\n          <span style="font-weight:300;color:rgba(0,0,0,0.5);">Schema /</span>\n          {{ $schemaCtrl.schema.Name }}\n        </span>\n      </md-card-header-text>\n    </div>\n\n    <div ng-if="0 === $schemaCtrl.properties.length"\n      layout="row"\n      layout-align="start start"\n      layout-wrap>\n\n      <md-card flex>\n        <md-card-content style="padding:0;" layout-align="center center">\n          <div style="padding: 40px 16px;text-align: center;">\n            Add a Property to make a start\n            <md-button class="md-primary"\n              ng-click="$schemaCtrl.createProperty($event)">\n              <md-icon class="material-icons">\n                edit\n              </md-icon>\n              Create Property\n            </md-button>\n          </div>\n        </md-card-content>\n      </md-card>\n\n    </div>\n\n    <div ng-if="$schemaCtrl.properties.length > 0"\n      flex>\n\n      <div class="schema-properties-container"\n        layout="row"\n        layout-wrap="true"\n        layout-xs="column"\n        layout-align="start center"\n        layout-align-xs="start stretch">\n\n        <div ng-repeat="property in $schemaCtrl.properties"\n          flex-xs\n          flex-gt-xs="33">\n          <div class="schema-property"\n            md-whiteframe="1dp"\n            layout="row"\n            layout-align="start center">\n            <span class="md-caption http-method http-{{ operation.Method.toLowerCase() }}">\n              {{ operation.Method.substr(0,3) }}\n            </span>\n            <span class="md-body-1">{{ property.Key }}</span>\n            <span flex></span>\n            <div>\n              <md-menu class="md-secondary">\n                <md-button class="md-icon-button" ng-click="$schemaCtrl.openMenu($mdMenu, $event)">\n                  <md-icon md-menu-origin class="material-icons">\n                    chevron_right\n                  </md-icon>\n                </md-button>\n                <md-menu-content width="4">\n                  <md-menu-item>\n                    <md-button>\n                      Re-name\n                    </md-button>\n                  </md-menu-item>\n                  <md-menu-divider></md-menu-divider>\n                  <md-menu-item>\n                    <md-button ng-click="$schemaCtrl.deleteProperty(property)">\n                      Delete property\n                    </md-button>\n                  </md-menu-item>\n                </md-menu-content>\n              </md-menu>\n            </div>\n          </div>\n        </div>\n\n        <div class="inline-create-btn-wrapper"\n          layout="row"\n          layout-align="start center"\n          flex-xs\n          flex-gt-xs="30">\n          <md-button ng-click="$schemaCtrl.createProperty($event, route)"\n            class="md-no-style"\n            style="margin-top:0;margin-bottom:0;"\n            layout="row"\n            flex>\n            <span flex></span>\n            <md-icon class="material-icons">add</md-icon>\n            <span>Schema property</span>\n            <span flex></span>\n          </md-button>\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n\n  <div class="schema-side" flex="30">\n    <md-list>\n      <md-subheader>App Schemas</md-subheader>\n      <md-list-item ng-repeat="schema in schemas" ui-sref="app.user.app.schema({ appId: model.Id, schemaId: schema.Id})">\n          <md-icon class="material-icons">chevron_right</md-icon>\n          <p>{{ schema.Name }}</p>\n      </md-list-item>\n    </md-list>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/appEditor/html/schemas.html', '<div class="app-schemas"\n  layout="row"\n  layout-xs="column"\n  layout-fill-gt-xs>\n\n  <div style="padding:8px;"\n    layout-xs="column"\n    flex>\n\n    <div layout="column"\n      layout-align="start stretch">\n\n      <div style="border-bottom: 1px solid rgba(0,0,0,0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n        layout="row"\n        layout-align="start center">\n        <md-card-header-text>\n          <span class="md-headline">\n            <span style="font-weight:300;color:rgba(0,0,0,0.5);">Schemas</span>\n          </span>\n        </md-card-header-text>\n      </div>\n\n      <div style="margin:8px;">\n        <div class=""\n          style="border-radius:3px;border:2px dashed rgba(0,0,0,0.12);padding:8px;"\n          layout-align="center center"\n          layout-fill\n          flex\n          layout="column"\n          ng-if="0 === apis.length">\n\n          <p class="md-body-1">\n            Nothing to show yet\n          </p>\n\n          <md-button class="md-primary md-raised"\n            ng-click="addSchemaDialog($event)">\n            Create Schema\n          </md-button>\n\n        </div>\n      </div>\n\n      <div layout="row" layout-xs="column" layout-wrap>\n        <div flex-gt-xs="33" ng-repeat="schema in schemas">\n          <md-card>\n            <md-card-header ui-sref="app.user.app.schema({ appId: schema.AppId, schemaId: schema.Id })">\n              <md-card-header-text>\n                <span class="md-title">{{ schema.Name }}</span>\n                <span class="md-subhead">Schema</span>\n              </md-card-header-text>\n            </md-card-header>\n            <md-divider></md-divider>\n            <md-card-actions layout="row" layout-align="end center">\n              <md-button class="md-primary"\n                ui-sref="app.user.app.schema({ appId: schema.AppId, schemaId: schema.Id })">\n                <md-icon class="material-icons">\n                  edit\n                </md-icon>\n                Edit Schema\n              </md-button>\n            </md-card-actions>\n          </md-card>\n        </div>\n        <div flex-gt-xs="33" ng-if="apis.length > 0">\n          <div class="create-api-card" layout="column" layout-align="center center">\n            <md-button class="md-raised md-primary"\n              ng-click="addSchemaDialog($event)">\n              <md-icon class="material-icons">\n                create\n              </md-icon>\n              Create Schema\n            </md-button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n');
  $templateCache.put('modules/app/html/dialog/privacyPolicy.html', '<md-dialog id="Dialog_PrivacyPolicy"\n  aria-label="Privacy Policy">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Data Studio Privacy Policy</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="legal-text">\n        <h1>Privacy Policy</h1>\n\n        <p>Last updated: July 28, 2017</p>\n\n        <p>CALLAN MILNE ("us", "we", or "our") operates the https://webui.datastudio.eviratec.software website (the "Service").</p>\n\n        <p>This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.</p>\n\n        <p>We will not use or share your information with anyone except as described in this Privacy Policy.</p>\n\n        <p>We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at http://www.datastudio.xyz</p>\n\n\n\n        <h2>Information Collection And Use</h2>\n\n        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name, other information ("Personal Information").</p>\n\n        <p>The purpose for which we collect personal information is to provide you with the best service experience possible on the Service and for our internal business purposes that form part of normal business practices. Some provision of personal information is optional. However, if you do not provide us with certain types of personal information, you may be unable to enjoy the full functionality of the Service.</p>\n\n\n        <h2>Log Data</h2>\n\n        <p>We may also collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer\'s Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>\n\n        <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this type of information in order to increase our Service\'s functionality. These third party service providers have their own privacy policies addressing how they use such information.</p>\n\n\n\n\n        <h2>Cookies</h2>\n\n        <p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer\'s hard drive.</p>\n\n        <p>We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>\n\n        <p>We send a session cookie to your computer when you log in to your User account. This type of cookie helps if you visit multiple pages on the Service during the same session, so that you don\'t need to enter your password on each page. Once you log out or close your browser, this cookie expires.</p>\n\n        <p>We also use longer-lasting cookies for other purposes such as to display your Content and account information. We encode our cookie so that only we can interpret the information stored in them. Users always have the option of disabling cookies via their browser preferences. If you disable cookies on your browser, please note that some parts of our Service may not function as effectively or may be considerably slower.</p>\n\n\n\n\n\n\n        <h2>Service Providers</h2>\n\n        <p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>\n\n        <p>These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>\n\n\n\n\n        <h2>Compliance With Laws</h2>\n\n        <p>We may disclose personal information in special situations where we have reason to believe that doing so is necessary to identify, contact or bring legal action against anyone damaging, injuring or interfering (intentionally or unintentionally) with our rights or property, users or anyone else who could be harmed by such activities. <p>We will disclose your Personal Information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.</p>\n\n\n        <h2>Business Transaction</h2>\n\n        <p>In the event that we sell or buy businesses or their assets, or engage in transfers, acquisitions, mergers, restructurings, changes of control and other similar transactions, customer or user information is generally one of the transferable business assets. Thus, your personal information may be subject to such a transfer. In the unlikely event of insolvency, personal information may be transferred to a trustee or debtor in possession and then to a subsequent purchaser.</p>\n\n\n        <h2>Security</h2>\n\n        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>\n\n\n        <h2>International Transfer</h2>\n\n        <p>Your information, including Personal Information, may be transferred to \u2014 and maintained on \u2014 computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>\n\n        <p>If you are located outside Australia and choose to provide information to us, please note that we transfer the information, including Personal Information, to Australia and process it there.</p>\n\n        <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>\n\n\n        <h2>Access and Correction</h2>\n\n        <p>Australian Privacy Principle 6 of the Privacy Act 1988 (Cth) allows you to get access to, and correct, the personal information we hold about you in certain circumstances. If you would like to obtain such access, please contact us on the details set out above.</p>\n\n        <p>Please note that the access and correction requirements under this Privacy Policy operates alongside and do not replace other informal or legal procedures by which an individual can be provided access to, or correction of, their personal information, including the requirements under the Freedom of Information Act 1982 (Cth).</p>\n\n\n        <h2>Complaints</h2>\n\n        <p>Australian Privacy Principle 1 of the Privacy Act 1988 (Cth) allows you to make a complaint about any alleged breaches of privacy. In order to lodge a complaint with us, please contact us using the details above with the following information:</p>\n\n        <ul>\n            <li>\n                <p>Your name and address;</p>\n            </li>\n            <li>\n                <p>Details of the alleged breach of privacy; and</p>\n            </li>\n            <li>\n                <p>URL link to the alleged breach of privacy (if applicable).</p>\n            </li>\n        </ul>\n\n        <p>Please allow us 30 days to investigate your complaint, after which we will contact you immediately to resolve the issue.</p>\n\n\n        <h2>Retention of Information</h2>\n\n        <p>We retain information for as long as required, allowed or we believe it useful, but do not undertake retention obligations. We may dispose of information in our discretion without notice, subject to applicable law that specifically requires the handling or retention of information. You must keep your own, separate back-up records.</p>\n\n\n        <h2>Links To Other Sites</h2>\n\n        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party\'s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>\n\n        <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>\n\n\n        <h2>Children\'s Privacy</h2>\n\n        <p>Our Service does not address anyone under the age of 18 ("Children").</p>\n\n        <p>We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children under 18 without verification of parental consent, we take steps to remove that information from our servers or replace it with the Personal Information of the Children\u2019s parent or guardian.</p>\n\n\n        <h2>Changes To This Privacy Policy</h2>\n\n        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>\n\n        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>\n\n        <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.</p>\n\n\n        <h2>Consent</h2>\n\n        <p>You warrant that you are able to give consents under Australian Law or, in the event that you do not have the capacity to give consent, you warrant that your guardian or attorney is able to give any consent required under this Privacy Policy on your behalf.</p>\n\n        <p>You hereby expressly and voluntarily grant your informed consent to us to deal with your personal information in accordance with the terms and conditions of this Privacy Policy. Should you retract your consent, please contact us. If you retract your consent, you acknowledge and agree that failure to provide certain types of personal information may not give you access to the full functionality of the Service.</p>\n\n\n        <h2>Contact Us</h2>\n\n        <p>If you have any questions about this Privacy Policy, please <a href="mailto:info@datastudio.xyz">contact us</a>.</p>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/app/html/dialog/termsOfUse.html', '<md-dialog id="Dialog_TermsOfUse"\n  aria-label="Terms of Use">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Data Studio Terms of Use</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="legal-text">\n        <h1>Terms of Use</h1>\n\n\n        <p>Last updated: July 28, 2017</p>\n\n\n        <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the https://webui.datastudio.eviratec.software website (the "Service") operated by CALLAN MILNE ("us", "we", or "our").</p>\n\n        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. You warrant that you are at least 18-years-old and you are legally capable of entering into binding contracts. If you are under 18-years-old, you warrant that you have obtained consent from your parent or guardian and they agree to be bound by these Terms on your behalf.</p>\n\n        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>\n\n\n\n\n\n\n        <h2>Content</h2>\n\n        <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>\n\n        <p>By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>\n\n        <p>You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person. Further, you warrant that: (i) the Content will not cause you or us to breach any law, regulation, rule, code or other legal obligation; (ii) the Content will not or could not be reasonably considered to be obscene, inappropriate, defamatory, disparaging, indecent, seditious, offensive, pornographic, threatening, abusive, liable to incite racial hatred, discriminatory, blasphemous, in breach of confidence or in breach of privacy; (iii) the Content will not be unsolicited, undisclosed or unauthorised advertising; (iv) the Content does not contain software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software, hardware or telecommunications equipment; and (v): the Content does not bring us or the Service into disrepute.</p>\n\n        <p>You agree to keep all records necessary to establish that your Content does not violate any of the requirements this clause and make such records available upon our reasonable request.</p>\n\n        <p>We are under no obligation to regularly monitor the accuracy or reliability of your Content incorporated into the Service. We reserve the right to modify or remove any Content at any time.</p>\n\n\n\n        <h2>Accounts</h2>\n\n        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>\n\n        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>\n\n        <p>You agree not to disclose your password to any third party. You agree to be fully responsible for activities that relate to your account or your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>\n\n\n\n\n\n\n\n        <h2>Links To Other Web Sites</h2>\n\n        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by CALLAN MILNE.</p>\n\n        <p>CALLAN MILNE has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that CALLAN MILNE shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>\n\n        <p>We only provide links to external websites as a convenience, and the inclusion of such a link to external websites do not imply our endorsement of those websites. You acknowledge and agree that when you access other websites on the Internet, you do so at your own risk.</p>\n\n        <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>\n\n\n        <h2>Termination</h2>\n\n        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>\n\n        <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>\n\n        <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>\n\n        <p>We shall not be liable to you or any third party for any claims or damages arising out of any termination or suspension or any other actions taken by us in connection therewith.</p>\n\n        <p>If applicable law requires us to provide notice of termination or cancellation, we may give prior or subsequent notice by posting it on the Service or by sending a communication to any address (email or otherwise) that we have for you in our records.</p>\n\n\n        <h2>Indemnification</h2>\n\n        <p>As a condition of your access to and use of the Service, you agree to indemnify us and our successors and assigns for all damages, costs, expenses and other liabilities, including but not limited to legal fees and expenses, relating to any claim arising out of or related to your access to and use of the Servuce or your breach of these Terms and any applicable law or the rights of another person or party.</p>\n\n        <p>This indemnification section survives the expiration of your registration, and applies to claims arising both before and after the registration ends.</p>\n\n\n        <h2>Limitation Of Liability</h2>\n\n        <p>You agree that we shall not be liable for any damages suffered as a result of using the Service, copying, distributing, or downloading Content from the Service.</p>\n\n        <p>In no event shall we be liable for any indirect, punitive, special, incidental or consequential damage (including loss of business, revenue, profits, use, privacy, data, goodwill or other economic advantage) however it arises, whether for breach of contract or in tort, even if it has been previously advised of the possibility of such damage.</p>\n\n\n        <p>You have sole responsibility for adequate security protection and backup of data and/or equipment used in connection with your usage of the Service and will not make a claim against for lost data, re-run time, inaccurate instruction, work delays or lost profits resulting from the use of the Service. You must not assign or otherwise dispose of your account to any other person.</p>\n\n        <p>Without limiting the foregoing, in no event will our aggregate liability to you exceed, in total, the amounts paid by you to us.</p>\n\n\n        <h2>Disclaimer</h2>\n\n        <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>\n\n        <p>CALLAN MILNE its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>\n\n        <p>This disclaimer of liability applies to any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft, or destruction or unauthorized access or, alteration of or use of record in connection with the use or operation of the Service, whether for breach of contract, tortious behaviour, negligence or any other cause of action.</p>\n\n        <p>We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the content contained on the Service for any purpose. Any reliance you place on such information is therefore strictly at your own risk. We disclaim any express or implied warranty representation or guarantee as to the effectiveness or profitability of the Service or that the operation of our Service will be uninterrupted or error-free. We are not liable for the consequences of any interruptions or error in the Service.</p>\n\n\n        <h2>Exclusions</h2>\n\n        <p>Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.</p>\n\n\n        <h2>Governing Law</h2>\n\n        <p>These Terms shall be governed and construed in accordance with the laws of Victoria, Australia, without regard to its conflict of law provisions.</p>\n\n        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>\n\n\n        <h2>Changes</h2>\n\n        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>\n\n        <p>It is your sole responsibility to periodically check these Terms for any changes. If you do not agree with any of the changes to these Terms, it is your sole responsibility to stop using the Service. Your continued use of the Service will be deemed as your acceptance thereof.</p>\n\n\n        <h2>Contact Us</h2>\n\n        <p>If you have any questions about these Terms, please <a href="mailto:info@datastudio.xyz">contact us</a>.</p>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/appEditor/html/dialog/createApiOperation.html', '<md-dialog id="Dialog_CreateApiOperation"\n  aria-label="Create Operation Form">\n  <form name="createOperationForm" ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Create API Operation</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content" layout="column">\n        <md-input-container>\n          <label>Route Path</label>\n          <input ng-model="apiRoute.Path" readonly>\n        </md-input-container>\n        <div layout="row" layout-xs="column" layout-align="start start" layout-align-xs="start stretch">\n          <md-input-container style="min-width: 100px;">\n            <label>Method</label>\n            <md-select name="httpMethod" ng-model="$data.Method" md-autofocus required>\n              <md-option value="get">GET</md-option>\n              <md-option value="post">POST</md-option>\n              <md-option value="put">PUT</md-option>\n              <md-option value="patch">PATCH</md-option>\n              <md-option value="delete">DELETE</md-option>\n            </md-select>\n            <div class="errors" ng-messages="createOperationForm.httpMethod.$error">\n              <div ng-message="required">Required</div>\n            </div>\n          </md-input-container>\n\n          <md-input-container>\n            <label>Name (Operation ID)</label>\n            <input name="name" ng-model="$data.Name" md-maxlength="50">\n          </md-input-container>\n        </div>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button ng-click="cancel()">\n        Cancel\n      </md-button>\n      <md-button type="submit"\n        class="md-primary"\n        ng-click="answer()">\n        Create API Operation\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/appEditor/html/dialog/viewApiSchema.html', '<md-dialog id="Dialog_ViewApiSchema"\n  aria-label="Create Operation Form">\n  <form name="createOperationForm" ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>View API Schema</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content style="max-width:800px;max-height:810px; ">\n      <md-tabs md-dynamic-height md-border-bottom>\n        <md-tab label="JSON">\n          <md-content class="md-padding">\n            <div class="schema-source">\n              <pre ng-bind="schema"></pre>\n            </div>\n          </md-content>\n        </md-tab>\n        <md-tab label="YAML">\n          <md-content class="md-padding">\n            MEow\n        </md-content>\n      </md-tab>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <md-button class="" ng-click="selectAll()">\n        Select All\n      </md-button>\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
}]);
//# sourceMappingURL=app.js.map
