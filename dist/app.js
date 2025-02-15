'use strict';

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

angular.module('TaskEvoWebui', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'TaskEvoWebui.Api', 'TaskEvoWebui.Anon', 'TaskEvoWebui.User', 'TaskEvoWebui.CategoryPage', 'TaskEvoWebui.ListPage', 'TaskEvoWebui.ListCreateDialog']);
'use strict';

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

angular.module('TaskEvoWebui').config(appDefaultRoute).config(appEnvironment).config(appLocation).config(appThemes).run(appInit);

appEnvironment.$inject = ['$appEnvironmentProvider'];
function appEnvironment($appEnvironmentProvider) {

  $appEnvironmentProvider.setDefaults({
    titlePrefix: '??? :: ',
    apiUrl: 'http://localhost:3580'
  }).addEnvironment('local', ['127.0.0.1', 'localhost', /\.localhost$/i], {
    titlePrefix: 'LOCAL :: ',
    apiUrl: 'http://localhost:3580'
  }).addEnvironment('prod', 'my.taskevo.com', {
    titlePrefix: '',
    apiUrl: 'https://api.taskevo.com'
  }).addEnvironment('prod2', 'https://my.taskevo.com', {
    titlePrefix: '',
    apiUrl: 'https://api.taskevo.com'
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

  var dsLightBlueMap = void 0;
  var sidebarBlueGreyMap = void 0;

  dsLightBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('dsLightBlue', dsLightBlueMap);

  $mdThemingProvider.theme('default').primaryPalette('dsLightBlue').dark();

  sidebarBlueGreyMap = $mdThemingProvider.extendPalette('blue-grey', {
    // 'contrastDefaultColor': 'dark',
  });

  $mdThemingProvider.definePalette('sidebarBlueGrey', sidebarBlueGreyMap);

  $mdThemingProvider.theme('darknav').primaryPalette('dsLightBlue').dark();

  $mdThemingProvider.theme('sidenavTheme').primaryPalette('grey').dark();
}

appInit.$inject = ['$appEnvironment', '$document'];
function appInit($appEnvironment, $document) {

  var robotoFontSrc = void 0;
  var linkEl = void 0;

  $document[0].title = $appEnvironment.config.titlePrefix + 'TaskEvo';

  robotoFontSrc = "https://fonts.googleapis.com/css?family=Roboto:200,300,400,500";
  linkEl = $document[0].createElement('link');

  linkEl.setAttribute("rel", "stylesheet");
  linkEl.setAttribute("href", robotoFontSrc);

  $document[0].body.appendChild(linkEl);
}
'use strict';

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

angular.module('TaskEvoWebui').config(['$stateProvider', function ($stateProvider) {

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

angular.module('TaskEvoWebui').controller('AppController', AppController);

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

angular.module('TaskEvoWebui').controller('LegalDialogController', LegalDialogController);

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

angular.module('TaskEvoWebui').factory('$app', dsAppFactory);

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

angular.module('TaskEvoWebui').constant('TOKEN_KEY', 'TE7_TOKEN_KEY');

angular.module('TaskEvoWebui').provider('$localStorage', localStorageProvider);

localStorageProvider.$inject = [];
function localStorageProvider() {
  this.$get = function () {
    return window.localStorage;
  };
}

angular.module('TaskEvoWebui').factory('clientStore', clientStore);

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

angular.module('TaskEvoWebui.Anon', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'TaskEvoWebui.Api']);
'use strict';

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

angular.module('TaskEvoWebui.Api', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

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

angular.module('TaskEvoWebui.CategoryPage', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'TaskEvoWebui.ListCreateDialog']);
'use strict';

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

angular.module('TaskEvoWebui.ListCreateDialog', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

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

angular.module('TaskEvoWebui.ListPage', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'TaskEvoWebui.ListCreateDialog']);
'use strict';

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

angular.module('TaskEvoWebui.User', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment', 'TaskEvoWebui.UserDashboard']);
'use strict';

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

angular.module('TaskEvoWebui.UserDashboard', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'ui.router', 'luminous.environment']);
'use strict';

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

angular.module('TaskEvoWebui.Anon').config(['$stateProvider', function ($stateProvider) {

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

angular.module('TaskEvoWebui.CategoryPage').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.categoryPage', {
    url: '/category/:categoryId',
    templateUrl: 'modules/categoryPage/html/page.html',
    controller: 'CategoryPageController',
    controllerAs: '$categoryPage',
    resolve: {
      category: ['$api', '$stateParams', function ($api, $stateParams) {
        var categoryId = $stateParams.categoryId;
        return $api.apiGet('/category/' + categoryId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  });
}]);
'use strict';

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

angular.module('TaskEvoWebui.ListPage').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.listPage', {
    url: '/list/:listId',
    templateUrl: 'modules/listPage/html/page.html',
    controller: 'ListPageController',
    controllerAs: '$listPage',
    resolve: {
      list: ['$api', '$stateParams', function ($api, $stateParams) {
        var listId = $stateParams.listId;
        return $api.apiGet('/list/' + listId).then(function (res) {
          return res.data;
        }).catch(function (err) {
          console.log(err);
          return {};
        });
      }]
    }
  });
}]);
'use strict';

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

angular.module('TaskEvoWebui.User').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user', {
    templateUrl: 'modules/user/html/root.html',
    controller: 'UserController',
    controllerAs: '$user',
    abstract: true,
    resolve: {
      userCategories: ['$api', function ($api) {
        return $api.apiGet('/categories/all').then(function (res) {
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

angular.module('TaskEvoWebui.UserDashboard').config(['$stateProvider', function ($stateProvider) {

  $stateProvider.state('app.user.dashboard', {
    url: '/dashboard',
    templateUrl: 'modules/userDashboard/html/dashboard.html',
    controller: 'DashboardController'
  });
}]);
'use strict';

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

angular.module('TaskEvoWebui.Anon').controller('AnonController', AnonController);

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

angular.module('TaskEvoWebui.Anon').controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$auth', '$state', '$mdDialog', '$login', '$timeout'];
function LoginController($scope, $auth, $state, $mdDialog, $login, $timeout) {

  $scope.error = '';

  $scope.showProgress = false;

  $scope.credentials = {
    Login: '',
    Password: ''
  };

  $scope.onSubmit = function ($ev) {

    $ev.preventDefault();

    showProgressBar();

    var login = $scope.credentials.Login;
    var password = $scope.credentials.Password;

    $login(login, password).then(function () {}).catch(function (err) {
      var errorMsg = '';
      if (err.data && err.data.ErrorMsg) {
        errorMsg = err.data.ErrorMsg;
      }

      hideProgressBar();

      if (!errorMsg) {
        return;
      }

      $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title('Login failed').textContent('Invalid username/password combination').ariaLabel('Login error dialog').ok('Got it!').targetEvent($ev));

      $timeout(function () {
        $scope.error = 'Invalid username/password combination';
      });
    });
  };

  function showProgressBar() {
    $scope.showProgress = true;
  }

  function hideProgressBar() {
    $scope.showProgress = false;
  }
};
'use strict';

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

angular.module('TaskEvoWebui.Anon').controller('SignupController', SignupController);

SignupController.$inject = ['$state', '$scope', '$signup', '$timeout', '$mdDialog'];
function SignupController($state, $scope, $signup, $timeout, $mdDialog) {

  disableSignup();

  $scope.error = '';
  $scope.signupEnabled = true;

  $scope.showProgress = false;

  $scope.touAccepted = false;

  $scope.newUser = {
    EmailAddress: '',
    Password: ''
  };

  $scope.passwordConfirmation = '';

  enableSignup();

  $scope.back = function ($ev) {
    $ev.preventDefault();
  };

  function notifyFormInvalid() {
    $mdDialog.show($mdDialog.alert().title('Please fill in all fields').textContent('Please complete all form fields correctly.').ariaLabel('Error notification').ok('Ok'));
  }

  $scope.submit = function ($ev) {

    if (!$scope.signupForm.$valid) {
      notifyFormInvalid();
      return;
    }

    disableSignup();

    $ev.preventDefault();

    showProgressBar();

    var email = $scope.newUser.EmailAddress;
    var password = $scope.newUser.Password;

    $signup(email, password).then(function () {
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
        $scope.error = errorMsg;
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

angular.module('TaskEvoWebui.CategoryPage').controller('CategoryPageController', CategoryPageController);

CategoryPageController.$inject = ['$api', '$scope', '$state', '$mdDialog', '$timeout', '$listCreateDialog', 'category'];
function CategoryPageController($api, $scope, $state, $mdDialog, $timeout, $listCreateDialog, category) {

  var $categoryPage = this;

  $categoryPage.category = category;

  checkCategoryExists();

  function checkCategoryExists() {
    if (category) {
      return;
    }

    navToUserDashboard();
  }

  $categoryPage.createList = function ($event) {
    $listCreateDialog.show({}, 'List', $event).then(function (data) {
      createList(data);
    }, function () {});
  };

  $categoryPage.deleteCategory = function ($event) {

    var confirm = $mdDialog.confirm().title('Are you sure?').textContent('This will permanently delete your category: ' + category.Name).ariaLabel('Delete category').targetEvent($event).ok('Delete Category').cancel('Cancel');

    $mdDialog.show(confirm).then(function () {
      deleteCategory(category.Id);
    }, function () {
      // do nothing
    });
  };

  $categoryPage.renameCategory = function ($event) {

    var confirm = $mdDialog.prompt().title('Rename Category').placeholder(category.Name).ariaLabel('Category name').initialValue(category.Name).targetEvent($event).ok('Save').cancel('Cancel');

    $mdDialog.show(confirm).then(function (newValue) {
      renameCategory(category.Id, newValue);
    }, function () {
      // do nothing
    });
  };

  function renameCategory(categoryId, newValue) {
    if (category.Id !== categoryId) {
      return;
    }

    $api.apiPutNewValue('/category/' + categoryId + '/name', newValue).then(function (res) {
      updateCategoryName(newValue);
      $scope.$emit('category:renamed', categoryId, newValue);
    }).catch(function (err) {
      console.log(err);
      notifyRenameCategoryError();
    });
  }

  function updateCategoryName(newValue) {
    $scope.$apply(function () {
      category.Name = newValue;
    });
  }

  function deleteCategory(categoryId) {
    if (category.Id !== categoryId) {
      return;
    }

    $api.apiDelete('/category/' + categoryId).then(function (res) {
      navToUserDashboard();
    }).catch(function (err) {
      console.log(err);
      notifyDeleteCategoryError();
    });
  }

  function notifyDeleteCategoryError() {
    $mdDialog.show($mdDialog.alert().title('Error').textContent('An unexpected error was encountered while deleting the category.').ariaLabel('Error notification').ok('Ok'));
  }

  function notifyRenameCategoryError() {
    $mdDialog.show($mdDialog.alert().title('Error').textContent('An unexpected error was encountered while renaming the category.').ariaLabel('Error notification').ok('Ok'));
  }

  function navToUserDashboard() {
    $state.go('app.user.dashboard');
  }

  function createList(data) {

    var newList = {
      CategoryId: category.Id,
      Title: data.Title,
      Due: data.Due
    };

    $api.apiPost('/lists', newList).then(function (res) {
      $timeout(function () {
        Object.assign(newList, res.data);
        newList.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $categoryPage.category.Lists.push(newList);
  }
};
'use strict';

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

angular.module('TaskEvoWebui.ListCreateDialog').controller('CreateListDialogController', CreateListDialogController);

CreateListDialogController.$inject = ['$scope', '$timeout', '$mdDialog', 'list', 'typeOfList'];
function CreateListDialogController($scope, $timeout, $mdDialog, list, typeOfList) {
  $scope.$data = {
    Title: initialTitle(),
    Due: initialDue()
  };

  $scope.list = list;
  $scope.typeOfList = typeOfList;

  $scope.hasDueDate = false;

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    var dueDate = $scope.$data.Due && Math.round($scope.$data.Due.getTime() / 1000);
    dueDate = true === $scope.hasDueDate && dueDate || null;

    $mdDialog.hide({
      Title: $scope.$data.Title,
      Due: dueDate
    });
  };

  function initialTitle() {
    return list.Title || newTitle();
  }

  function initialDue() {
    return list.Due && new Date(list.Due * 1000) || newDueDate();
  }

  function newTitle() {
    return '';
  }

  function newDueDate() {
    return new Date(Math.round(Date.now() / 1000) * 1000);
  }
}
'use strict';

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

angular.module('TaskEvoWebui.ListPage').controller('ChangeListDueDialogController', ChangeListDueDialogController);

ChangeListDueDialogController.$inject = ['$scope', '$timeout', '$mdDialog', 'list'];
function ChangeListDueDialogController($scope, $timeout, $mdDialog, list) {
  $scope.$data = {
    Due: list.Due && new Date(list.Due * 1000) || new Date(Math.ceil(Date.now() / 1000) * 1000)
  };

  $scope.hide = function () {
    $mdDialog.cancel();
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.answer = function () {
    $mdDialog.hide($scope.$data.Due.getTime());
  };
}
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

angular.module('TaskEvoWebui.ListPage').controller('ListPageController', ListPageController);

ListPageController.$inject = ['$api', '$scope', '$state', '$mdDialog', '$timeout', '$listCreateDialog', 'list'];
function ListPageController($api, $scope, $state, $mdDialog, $timeout, $listCreateDialog, list) {

  var $listPage = this;

  var completedItems = [];
  var todoItems = [];

  $listPage.list = list;

  $listPage.completedItems = completedItems;
  $listPage.todoItems = todoItems;

  initItemLists();

  $listPage.navToParent = function ($event) {
    navToParent();
  };

  $listPage.toggleComplete = function (list) {
    var isCompleted = null !== list.Completed;
    if (isCompleted) {
      setItemNotComplete(list);
      return;
    }

    setItemComplete(list);
  };

  $listPage.createItem = function ($event) {
    $listCreateDialog.show({}, 'Item', $event).then(function (data) {
      createItem(data);
    }, function () {});
  };

  $listPage.changeDue = function ($event) {
    var changeListDueDialog = {
      controller: 'ChangeListDueDialogController',
      templateUrl: 'modules/listPage/html/dialogs/changeDue.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        list: list
      }
    };

    $mdDialog.show(changeListDueDialog).then(function (newValue) {
      changeDue(list.Id, newValue / 1000);
    }, function () {});
  };

  $listPage.clearDue = function ($event) {
    var confirm = $mdDialog.confirm().title('Are you sure?').textContent('This will remove the due date for: ' + list.Title).ariaLabel('Remove due date').targetEvent($event).ok('Remove Due Date').cancel('Cancel');

    $mdDialog.show(confirm).then(function () {
      clearDue(list.Id);
    }, function () {
      // do nothing
    });
  };

  $listPage.deleteList = function ($event) {

    var confirm = $mdDialog.confirm().title('Are you sure?').textContent('This will permanently delete your list: ' + list.Title).ariaLabel('Delete list').targetEvent($event).ok('Delete List').cancel('Cancel');

    $mdDialog.show(confirm).then(function () {
      deleteList(list.Id);
    }, function () {
      // do nothing
    });
  };

  $listPage.renameList = function ($event) {

    var confirm = $mdDialog.prompt().title('Rename List').placeholder(list.Title).ariaLabel('List title').initialValue(list.Title).targetEvent($event).ok('Save').cancel('Cancel');

    $mdDialog.show(confirm).then(function (newValue) {
      renameList(list.Id, newValue);
    }, function () {
      // do nothing
    });
  };

  function renameList(listId, newValue) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue('/list/' + listId + '/title', newValue).then(function (res) {
      updateListTitle(newValue);
    }).catch(function (err) {
      console.log(err);
      notifyUpdateListError();
    });
  }

  function updateListTitle(newValue) {
    $scope.$apply(function () {
      list.Title = newValue;
    });
  }

  function deleteList(listId) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiDelete('/list/' + listId).then(function (res) {
      navToParent();
    }).catch(function (err) {
      console.log(err);
      notifyDeleteListError();
    });
  }

  function notifyDeleteListError() {
    $mdDialog.show($mdDialog.alert().title('Error').textContent('An unexpected error was encountered while deleting the list.').ariaLabel('Error notification').ok('Ok'));
  }

  function navToParent() {
    var hasParentId = null !== list.ParentId;
    if (hasParentId) {
      $state.go('app.user.listPage', { listId: list.ParentId });
      return;
    }

    $state.go('app.user.categoryPage', { categoryId: list.CategoryId });
  }

  function initItemLists() {
    var allLists = $listPage.list.Lists.slice();

    completedItems.push.apply(completedItems, _toConsumableArray(allLists.filter(function (list) {
      return 'Completed' in list && list.Completed !== null;
    })));

    todoItems.push.apply(todoItems, _toConsumableArray(allLists.filter(function (list) {
      return !('Completed' in list) || list.Completed === null;
    })));
  }

  function setItemNotComplete(item) {
    $api.apiPutNewValue('/list/' + item.Id + '/completed', null).then(function (res) {
      $timeout(function () {
        var i = completedItems.indexOf(item);
        item.Completed = null;
        completedItems.splice(i, 1);
        todoItems.push(item);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  function setItemComplete(item) {
    $api.apiPutNewValue('/list/' + item.Id + '/completed', 'now').then(function (res) {
      $timeout(function () {
        var i = todoItems.indexOf(item);
        item.Completed = Math.floor(Date.now() / 1000);
        todoItems.splice(i, 1);
        completedItems.push(item);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  function createItem(data) {

    var newList = {
      ParentId: list.Id,
      Title: data.Title,
      Due: data.Due,
      Completed: null
    };

    $api.apiPost('/lists', newList).then(function (res) {
      $timeout(function () {
        Object.assign(newList, res.data);
        newList.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    todoItems.push(newList);
  }

  function changeDue(listId, newValue) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue('/list/' + listId + '/due', newValue).then(function (res) {
      updateListDue(newValue);
    }).catch(function (err) {
      console.log(err);
      notifyUpdateListError();
    });
  }

  function clearDue(listId) {
    if (list.Id !== listId) {
      return;
    }

    $api.apiPutNewValue('/list/' + listId + '/due', null).then(function (res) {
      updateListDue(null);
    }).catch(function (err) {
      console.log(err);
      notifyUpdateListError();
    });
  }

  function updateListDue(newValue) {
    $scope.$apply(function () {
      list.Due = newValue;
    });
  }

  function notifyUpdateListError() {
    $mdDialog.show($mdDialog.alert().title('Error').textContent('An unexpected error was encountered while updating the list.').ariaLabel('Error notification').ok('Ok'));
  }
};
'use strict';

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

angular.module('TaskEvoWebui.User').controller('LayoutController', LayoutController);

LayoutController.$inject = ['$scope', '$mdDialog', '$mdToast', '$logout', '$mdSidenav'];
function LayoutController($scope, $mdDialog, $mdToast, $logout, $mdSidenav) {

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

angular.module('TaskEvoWebui.User').controller('SidenavController', SidenavController);

SidenavController.$inject = ['$scope', '$mdSidenav'];
function SidenavController($scope, $mdSidenav) {

  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
};
'use strict';

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

angular.module('TaskEvoWebui.User').controller('UserController', UserController);

UserController.$inject = ['$api', '$scope', '$rootScope', '$auth', '$state', '$mdDialog', '$timeout', 'user', 'userCategories'];
function UserController($api, $scope, $rootScope, $auth, $state, $mdDialog, $timeout, user, userCategories) {

  $rootScope.$on('unauthorized', function () {
    $state.go('app.anon.login');
  });

  if (!$auth.isAuthorized) {
    $state.go('app.anon.login');
  }

  $api.watchApiProgress($scope, 'showProgress');

  $scope.showSidenavCategories = true;
  $scope.categories = userCategories;
  $scope.user = user;

  $scope.login = user.Login;

  $scope.$on('category:renamed', updateCategoryName);

  $scope.createCategory = function ($event) {

    var confirm = $mdDialog.prompt().title('Name your new category').placeholder('My Category').ariaLabel('Category name').initialValue('').targetEvent($event).ok('Create Category').cancel('Cancel');

    $mdDialog.show(confirm).then(function (result) {
      createCategory(result);
    }, function () {});
  };

  function createCategory(name) {

    var newCategory = {
      Name: name
    };

    $api.apiPost('/categories', newCategory).then(function (res) {
      $timeout(function () {
        Object.assign(newCategory, res.data);
        newCategory.Id = res.data.Id;
      });
    }).catch(function (err) {
      console.log(err);
    });

    $scope.categories.push(newCategory);
  }

  function updateCategoryName($event, categoryId, newValue) {
    var category = getUserCategoryById(categoryId);
    $scope.$apply(function () {
      category.Name = newValue;
    });
  }

  function getUserCategoryById(categoryId) {
    return userCategories.filter(function (category) {
      return category.Id === categoryId;
    })[0];
  }
};
'use strict';

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

angular.module('TaskEvoWebui.UserDashboard').controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', '$mdDialog', 'userCategories'];
function DashboardController($scope, $mdDialog, userCategories) {

  $scope.categories = userCategories;
};
'use strict';

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

angular.module('TaskEvoWebui.Anon').directive('mustMatch', MustMatchDirective);

MustMatchDirective.$inject = [];
function MustMatchDirective() {
  return {
    require: 'ngModel',
    link: function link(scope, elm, attrs, ctrl) {
      ctrl.$validators.mustMatch = function (modelValue, viewValue) {
        // Value of other field this one must match
        var matchTargetValue = scope.$eval(attrs.mustMatch);
        if (modelValue === matchTargetValue) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

angular.module('TaskEvoWebui.Api').factory('$api', dsApiFactory);

dsApiFactory.$inject = ['$auth', '$appEnvironment', '$http'];
function dsApiFactory($auth, $appEnvironment, $http) {
  var PUT = 'put';
  var POST = 'post';
  var GET = 'get';
  var DELETE = 'delete';

  var DsApi = function () {
    function DsApi() {
      _classCallCheck(this, DsApi);

      this.url = $appEnvironment.config.apiUrl;
      this.listeners = {};
    }

    _createClass(DsApi, [{
      key: 'on',
      value: function on(eventName, fn) {
        initListener(this, eventName);
        this.listeners[eventName].push(fn);
      }
    }, {
      key: 'off',
      value: function off(eventName, fn) {
        var index = void 0;

        if (!Object.keys(this.listeners).includes(eventName)) {
          return;
        }

        index = this.listeners[eventName].indexOf(fn);
        this.listeners[eventName].splice(index, 1);
      }
    }, {
      key: 'emit',
      value: function emit(eventName) {
        var args = void 0;
        if (!Object.keys(this.listeners).includes(eventName)) {
          return;
        }

        args = [].concat(Array.prototype.slice.call(arguments));

        this.listeners[eventName].forEach(function (fn) {
          fn(args.slice(1));
        });
      }
    }, {
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

          emitRequestStart(dsApi);

          $http(opts).then(onComplete, reject);

          function onComplete() {
            emitRequestEnd(dsApi);
            resolve.apply(undefined, arguments);
          }
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

          emitRequestStart(dsApi);

          $http(opts).then(onComplete, reject);

          function onComplete() {
            emitRequestEnd(dsApi);
            resolve.apply(undefined, arguments);
          }
        });
      }
    }, {
      key: 'apiPutNewValue',
      value: function apiPutNewValue(url, newValue) {
        var _this3 = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this3.authorization;
          var opts = {
            method: PUT,
            url: dsApi.url + url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };

          if (hasAuthorization()) {
            opts.headers['Authorization'] = getAuthorization();
          }

          opts.data = JSON.stringify({
            newValue: newValue
          });

          emitRequestStart(dsApi);

          $http(opts).then(onComplete, reject);

          function onComplete() {
            emitRequestEnd(dsApi);
            resolve.apply(undefined, arguments);
          }
        });
      }
    }, {
      key: 'apiDelete',
      value: function apiDelete(url) {
        var _this4 = this;

        var dsApi = this;
        return new Promise(function (resolve, reject) {
          var authorization = _this4.authorization;
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

          emitRequestStart(dsApi);

          $http(opts).then(onComplete, reject);

          function onComplete() {
            emitRequestEnd(dsApi);
            resolve.apply(undefined, arguments);
          }
        });
      }
    }, {
      key: 'watchApiProgress',
      value: function watchApiProgress(scope, varName) {
        hideProgressIndicator();

        this.on('$apiRequest:start', function () {
          showProgressIndicator();
        });

        this.on('$apiRequest:end', function () {
          hideProgressIndicator();
        });

        function showProgressIndicator() {
          scope[varName] = true;
        }

        function hideProgressIndicator() {
          scope[varName] = false;
        }
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

  function emitRequestStart($api) {
    $api.emit('$apiRequest:start');
  }

  function emitRequestEnd($api) {
    $api.emit('$apiRequest:end');
  }

  function initListener($api, eventName) {
    if (Object.keys($api.listeners).includes(eventName)) {
      return;
    }

    $api.listeners[eventName] = [];
  }
}
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

angular.module('TaskEvoWebui.Api').factory('$auth', dsAuthFactory);

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

angular.module('TaskEvoWebui.Api').factory('$login', dsLoginFactory);

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

angular.module('TaskEvoWebui.Api').factory('$logout', dsLogoutFactory);

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

angular.module('TaskEvoWebui.Api').factory('$signup', dsSignupFactory);

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

angular.module('TaskEvoWebui.Api').factory('Token', TokenFactory);

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

angular.module('TaskEvoWebui.Api').factory('User', UserFactory);

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

angular.module('TaskEvoWebui.ListCreateDialog').factory('$listCreateDialog', $listCreateDialog);

$listCreateDialog.$inject = ['$mdDialog'];
function $listCreateDialog($mdDialog) {
  return {
    show: show
  };

  function show(list, typeOfList, $event) {
    var createListDialog = {
      controller: 'CreateListDialogController',
      templateUrl: 'modules/listCreateDialog/html/createList.html',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        list: list,
        typeOfList: typeOfList
      }
    };

    return $mdDialog.show(createListDialog);
  }
}
'use strict';

angular.module('TaskEvoWebui').run(['$templateCache', function ($templateCache) {
  $templateCache.put('modules/anon/html/login.html', '<div id="login"\n  layout="column"\n  layout-align="center center"\n  layout-fill>\n  <div class="login-form form-wrapper"\n    layout="column"\n    md-whiteframe="12dp">\n\n    <header layout="row"\n      layout-align="start center">\n\n      <img class="app-logo"\n        src="logo.png" />\n\n      <div flex layout="column">\n        <span class="md-headline">TaskEvo</span>\n        <span class="md-subhead">User Login</span>\n      </div>\n\n    </header>\n\n    <form layout="column"\n      ng-controller="LoginController"\n      ng-submit="onSubmit($event)">\n\n      <div class="login-error"\n        ng-if="error">\n        <strong>Login failed:</strong>\n        {{ error }}\n      </div>\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Username / Email</label>\n          <input ng-model="credentials.Login"\n            ng-minlength="5"\n            required />\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input ng-model="credentials.Password"\n            type="password"\n            ng-minlength="7"\n            required />\n        </md-input-container>\n\n      </md-content>\n\n      <div class="submit-row"\n        layout="row"\n        layout-align="end center">\n        <!-- <a class="md-button" href="#">Forgot Password</a> -->\n        <md-button class="md-primary md-raised"\n          type="submit">\n          Login\n        </md-button>\n      </div>\n\n      <md-progress-linear md-mode="indeterminate"\n        ng-if="showProgress"></md-progress-linear>\n\n    </form>\n\n  </div>\n  <div class="new-user-banner"\n    layout="row"\n    layout-align="start center"\n    md-whiteframe="12dp">\n    <strong>New, here?</strong>\n    <span>It\'s free to signup</span>\n\n    <span flex></span>\n\n    <a class="md-button"\n      ui-sref="app.anon.signup">\n      Sign-up\n    </a>\n  </div>\n</div>\n');
  $templateCache.put('modules/anon/html/root.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/anon/html/signup.html', '<div id="signup" layout layout-fill layout-align="center center">\n  <div class="signup-form form-wrapper" layout="column" md-whiteframe="12dp">\n\n    <header layout="row" layout-align="start center">\n\n      <img src="logo.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-caption">TaskEvo</span>\n        <span class="md-headline">User Signup</span>\n      </div>\n\n    </header>\n\n    <form name="signupForm" layout="column" ng-submit="submit($event)"\n      ng-controller="SignupController">\n\n      <md-content layout="column">\n\n        <md-input-container>\n          <label>Email Address</label>\n          <input name="emailAddress"\n            ng-model="newUser.EmailAddress"\n            required\n            type="email"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.emailAddress.$error">\n            <div ng-message="required">A valid email address is required.</div>\n          </div>\n        </md-input-container>\n\n        <md-input-container>\n          <label>Password</label>\n          <input name="password"\n            ng-model="newUser.Password"\n            required\n            type="password"\n            ng-pattern="/^.{7,}$/"\n            ng-disabled="inputDisabled" />\n          <div ng-messages="signupForm.password.$error"\n            md-auto-hide="true"\n            multiple>\n            <div ng-message="required">Password is required.</div>\n            <div ng-message="pattern">Password must be at least 7 characters.</div>\n          </div>\n        </md-input-container>\n\n        <md-input-container>\n          <label>Confirm Password</label>\n          <input name="passwordConfirmation"\n            ng-model="passwordConfirmation"\n            ng-disabled="inputDisabled"\n            type="password"\n            must-match="newUser.Password"\n            required />\n          <div ng-messages="signupForm.passwordConfirmation.$error"\n            md-auto-hide="true"\n            multiple>\n            <div ng-message="required">Please re-enter your password.</div>\n            <div ng-message="mustMatch">Passwords must match.</div>\n          </div>\n        </md-input-container>\n\n        <md-input-container>\n          <md-checkbox name="touAccepted"\n            ng-model="touAccepted"\n            aria-label="I have read and agree to the Terms of Use and Privacy Policy"\n            ng-true-value="true"\n            ng-false-value="false"\n            class="md-align-top-left"\n            required\n            flex>\n            I have read and agree to the\n            <a href ng-click="showLegal($event, \'termsOfUse\')">Terms of Use</a>\n            and\n            <a href ng-click="showLegal($event, \'privacyPolicy\')">Privacy Policy</a>\n          </md-checkbox>\n          <div ng-messages="signupForm.touAccepted.$error"\n            md-auto-hide="true">\n            <div ng-message="required">\n              You must agree to the Terms of Service and Privacy Policy before\n              you can create an account\n            </div>\n          </div>\n        </md-input-container>\n\n      </md-content>\n\n      <div class="submit-row" layout="row" layout-align="end center">\n        <a class="md-button"\n          ui-sref="app.anon.login">\n          Back\n        </a>\n        <md-button class="md-primary md-raised" type="submit">\n          Create my account\n        </md-button>\n      </div>\n\n      <md-progress-linear md-mode="indeterminate" ng-if="showProgress"></md-progress-linear>\n\n    </form>\n\n  </div>\n</div>\n');
  $templateCache.put('modules/app/html/app.html', '<div ui-view layout layout-fill></div>\n');
  $templateCache.put('modules/categoryPage/html/page.html', '<!-- Category Page -->\n<div id="CategoryPage"\n  layout="row"\n  flex>\n  <div layout="column"\n    flex>\n\n    <!-- Category Header -->\n    <md-toolbar class="page-header">\n      <div class="md-toolbar-tools">\n\n        <!-- Category Title -->\n        <h1>{{ $categoryPage.category.Name }}</h1>\n\n        <span flex></span>\n\n        <md-menu class="category-tools">\n          <!-- trigger -->\n          <md-button class="menu-toggle md-icon-button"\n            aria-label="Open Settings"\n            ng-click="openMenu($mdMenu.open, $event)">\n            <md-icon class="material-icons">\n              settings_cog\n            </md-icon>\n          </md-button>\n          <!-- content -->\n          <md-menu-content width="4">\n            <md-menu-item>\n              <md-button ng-click="$categoryPage.renameCategory($event)">\n                <md-icon>edit</md-icon>\n                Rename Category\n              </md-button>\n            </md-menu-item>\n            <md-menu-divider></md-menu-divider>\n            <md-menu-item>\n              <md-button ng-click="$categoryPage.deleteCategory($event)">\n                <md-icon>delete</md-icon>\n                Delete Category\n              </md-button>\n            </md-menu-item>\n          </md-menu-content>\n        </md-menu>\n\n      </div>\n    </md-toolbar>\n\n    <!-- Category Content -->\n    <main>\n\n      <!-- Category Lists Section -->\n      <section class="lists">\n\n        <!-- Category Lists -->\n        <ul class="lists">\n\n          <!-- List -->\n          <li ng-repeat="list in $categoryPage.category.Lists | orderBy: \'Created\'">\n            <a ui-sref="app.user.listPage({ listId: list.Id })"\n              layout="row"\n              flex>\n              <md-icon class="material-icons">\n                list_alt\n              </md-icon>\n              <span class="list-title">{{ list.Title }}</span>\n              <span class="due-date"\n                ng-if="list.Due">\n                Due\n                {{ list.Due*1000 | date:\'d MMM\' }} at\n                {{ list.Due*1000 | date:\'h:mm a\' }}\n              </span>\n            </a>\n          </li>\n\n        </ul>\n\n        <!-- Section Footer -->\n        <footer>\n\n          <!-- Create A New List Button -->\n          <md-button class="md-raised md-primary"\n            ng-click="$categoryPage.createList()">\n\n            <!-- Icon -->\n            <md-icon class="material-icons">\n              create\n            </md-icon>\n\n            <!-- Text -->\n            <span>Create a new list</span>\n\n          </md-button>\n\n        </footer>\n\n      </section>\n\n    </main>\n\n  </div>\n</div>\n');
  $templateCache.put('modules/listCreateDialog/html/createList.html', '<md-dialog id="Dialog_CreateList"\n  aria-label="Create List Form">\n  <form name="createListForm"\n    ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Create {{ typeOfList }}</h2>\n        <span flex></span>\n        <md-button class="md-icon-button"\n          ng-click="cancel()">\n          <md-icon class="material-icons"\n            aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content"\n        layout="column">\n        <md-input-container>\n          <label>{{ \'Item\' === typeOfList && \'Summary\' || \'Title\' }}</label>\n          <textarea name="listTitle"\n            ng-model="$data.Title"\n            rows="{{ \'Item\' === typeOfList && 5 || 2 }}"\n            md-maxlength="255"\n            md-autofocus\n            md-select-on-focus></textarea>\n        </md-input-container>\n\n        <md-input-container class="md-block">\n          <md-checkbox name="listHasDueDate" ng-model="hasDueDate" required>\n            {{ typeOfList }} has due date\n          </md-checkbox>\n        </md-input-container>\n\n        <md-input-container ng-if="hasDueDate">\n          <label>Due by</label>\n          <input name="listDue"\n            ng-model="$data.Due"\n            type="datetime-local">\n        </md-input-container>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button ng-click="cancel()">\n        Cancel\n      </md-button>\n      <md-button class="md-primary"\n        ng-click="answer()">\n        Create {{ typeOfList }}\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/user/html/root.html', '<md-sidenav class="md-sidenav-left md-whiteframe-z2"\n  layout="column"\n  md-theme="sidenavTheme"\n  md-component-id="left"\n  md-is-locked-open="$mdMedia(\'gt-md\')">\n\n  <div ng-controller="SidenavController as $sidenav"\n    ng-cloak>\n\n    <header layout="row" layout-align="start center">\n\n      <img src="logo.png" class="app-logo" />\n\n      <div flex layout="column">\n        <span class="md-headline">TaskEvo</span>\n        <span class="md-caption">eviratec.software</span>\n      </div>\n\n    </header>\n\n    <md-list>\n      <md-list-item ui-sref="app.user.dashboard"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          apps\n        </md-icon>\n        <p>Dashboard</p>\n      </md-list-item>\n\n      <md-divider></md-divider>\n\n      <md-subheader ng-click="showSidenavApps=!showSidenavApps">\n        My Categories\n      </md-subheader>\n\n      <md-list-item ui-sref-active="active"\n        ui-sref="app.user.categoryPage({ categoryId: category.Id })"\n        ng-repeat="category in categories | orderBy: \'Name\'"\n        ng-if="showSidenavCategories"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          folder\n        </md-icon>\n        <p>{{ category.Name }}</p>\n      </md-list-item>\n\n      <md-list-item\n        ng-click="createCategory()"\n        ng-if="showSidenavCategories"\n        ng-click="toggleSidenav(\'left\')">\n        <md-icon class="material-icons">\n          create\n        </md-icon>\n        <p>Create a Category</p>\n      </md-list-item>\n\n    </md-list>\n  </div>\n</md-sidenav>\n\n<md-progress-linear class="root-progress-bar"\n  md-mode="indeterminate"\n  ng-if="showProgress"></md-progress-linear>\n\n<div class="relative"\n  layout="column"\n  role="main"\n  ng-controller="LayoutController"\n  layout-fill\n  ng-cloak>\n\n  <md-toolbar id="userToolbar">\n    <div class="md-toolbar-tools">\n\n      <img class="logo"\n        src="logo.png" />\n\n      <h3 class="md-caption"\n        ng-if="$mdMedia(\'gt-xs\')">\n        TaskEvo\n      </h3>\n\n      <span flex></span>\n\n      <md-menu class="hide-gt-xs">\n        <!-- trigger -->\n        <md-button class="md-icon-button"\n          aria-label="Open Settings"\n          ng-click="openMenu($mdMenu.open, $event)">\n          <md-icon class="material-icons">\n            person\n          </md-icon>\n          <md-icon class="material-icons">\n            arrow_drop_down\n          </md-icon>\n        </md-button>\n        <!-- content -->\n        <md-menu-content width="4">\n          <md-menu-item>\n              <span class="user-displayname">\n                {{ login }}\n              </span>\n          </md-menu-item>\n          <md-menu-divider></md-menu-divider>\n          <md-menu-item>\n            <md-button ng-click="logout()">\n              <md-icon>power_settings_new</md-icon>\n              Logout\n            </md-button>\n          </md-menu-item>\n        </md-menu-content>\n      </md-menu>\n\n      <md-menu class="hide-xs">\n        <!-- trigger -->\n        <md-button\n          aria-label="Open Settings"\n          ng-click="openMenu($mdMenu.open, $event)">\n          <md-icon class="material-icons">\n            person\n          </md-icon>\n          <span class="user-displayname md-caption">\n            {{ login }}\n          </span>\n          <md-icon class="material-icons">\n            arrow_drop_down\n          </md-icon>\n        </md-button>\n        <!-- content -->\n        <md-menu-content width="4">\n          <!-- <md-menu-item>\n            <md-button ng-click="changeProfile($event)">\n              <md-icon>face</md-icon>\n              Profile\n            </md-button>\n          </md-menu-item>\n          <md-menu-item>\n            <md-button ng-click="changePassword()">\n              <md-icon>lock</md-icon>\n              Password\n            </md-button>\n          </md-menu-item>\n          <md-menu-divider></md-menu-divider> -->\n          <md-menu-item>\n            <md-button ng-click="logout()">\n              <md-icon>power_settings_new</md-icon>\n              Logout\n            </md-button>\n          </md-menu-item>\n        </md-menu-content>\n      </md-menu>\n\n      <md-button class="md-icon-button"\n        aria-label="Menu"\n        ng-click="toggleSidenav(\'left\')"\n        hide-gt-md>\n        <md-icon class="material-icons">\n          menu\n        </md-icon>\n      </md-button>\n    </div>\n  </md-toolbar>\n\n  <md-content class="ds-main-content"\n    layout="column"\n    md-scroll-y\n    flex>\n    <div layout="column"\n      layout-fill\n      ui-view>\n    </div>\n  </md-content>\n\n</div>\n');
  $templateCache.put('modules/userDashboard/html/dashboard.html', '<div layout="row"\n  flex>\n\n  <div class="user-dashboard"\n    style="margin: 8px;padding:8px;"\n    flex>\n\n    <div layout="column">\n      <div style="border-bottom: 1px solid rgba(255,255,255, 0.12);margin:24px 8px 8px;padding:0 8px;height:49px;"\n        layout="row"\n        layout-align="start center">\n        <md-card-header-text>\n          <span class="md-headline">\n            List Categories\n          </span>\n        </md-card-header-text>\n      </div>\n\n      <div layout="row"\n        layout-xs="column"\n        layout-wrap>\n        <div flex-gt-xs="33"\n          ng-repeat="category in categories | orderBy: \'Name\'">\n          <md-card>\n            <md-card-header ui-sref="app.user.categoryPage({ categoryId: category.Id })">\n              <md-card-avatar>\n                <md-icon ng-if="!category.IconUrl"\n                  class="material-icons">\n                  webui\n                </md-icon>\n                <img ng-if="category.IconUrl"\n                  src="{{ category.IconUrl }}" />\n              </md-card-avatar>\n              <md-card-header-text>\n                <span class="md-title">{{ category.Name }}</span>\n                <span class="md-subhead">TaskEvo Category</span>\n              </md-card-header-text>\n            </md-card-header>\n            <md-divider></md-divider>\n            <md-card-actions layout="row"\n              layout-align="end center">\n              <md-button class="md-primary"\n                ui-sref="app.user.categoryPage({ categoryId: category.Id })">\n                <md-icon class="material-icons">\n                  edit\n                </md-icon>\n                Manage Lists\n              </md-button>\n            </md-card-actions>\n          </md-card>\n        </div>\n        <div flex-gt-xs="33">\n          <div class="create-category-card"\n            layout="column"\n            layout-align="center center">\n            <span>New category?</span>\n            <md-button class="md-raised md-primary"\n              ng-click="createCategory()">\n              <md-icon class="material-icons">\n                create\n              </md-icon>\n              Create a new category\n            </md-button>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n');
  $templateCache.put('modules/listPage/html/page.html', '<!-- List Page -->\n<div id="ListPage"\n  layout="row"\n  flex>\n  <div layout="column"\n    flex>\n\n    <!-- List Header -->\n    <md-toolbar class="page-header">\n      <div class="md-toolbar-tools">\n\n        <!-- Back Button -->\n        <md-button class="back-button md-icon-button"\n          ng-click="$listPage.navToParent()">\n          <md-icon class="material-icons">\n            chevron_left\n          </md-icon>\n        </md-button>\n\n        <!-- List Title -->\n        <h1>{{ $listPage.list.Title }}</h1>\n\n        <span flex></span>\n\n        <!-- Add Item Button -->\n        <md-button class="md-raised md-primary"\n          ng-click="$listPage.createItem()">\n\n          <!-- Icon -->\n          <md-icon class="material-icons">\n            create\n          </md-icon>\n\n          <!-- Text -->\n          <span>Add Item</span>\n\n        </md-button>\n\n        <md-menu class="list-tools">\n          <!-- trigger -->\n          <md-button class="menu-toggle md-icon-button"\n            aria-label="Open Settings"\n            ng-click="openMenu($mdMenu.open, $event)">\n            <md-icon class="material-icons">\n              settings_cog\n            </md-icon>\n          </md-button>\n          <!-- content -->\n          <md-menu-content width="4">\n            <md-menu-item>\n              <md-button ng-click="$listPage.renameList($event)">\n                <md-icon>edit</md-icon>\n                Rename List\n              </md-button>\n            </md-menu-item>\n            <md-menu-item>\n              <md-button ng-click="$listPage.changeDue($event)">\n                <md-icon>edit</md-icon>\n                Change Due Date\n              </md-button>\n            </md-menu-item>\n            <md-menu-divider></md-menu-divider>\n            <md-menu-item>\n              <md-button ng-click="$listPage.clearDue($event)">\n                <md-icon>clear</md-icon>\n                Remove Due Date\n              </md-button>\n            </md-menu-item>\n            <md-menu-divider></md-menu-divider>\n            <md-menu-item>\n              <md-button ng-click="$listPage.deleteList($event)">\n                <md-icon>delete</md-icon>\n                Delete List\n              </md-button>\n            </md-menu-item>\n          </md-menu-content>\n        </md-menu>\n\n      </div>\n    </md-toolbar>\n\n    <!-- List Content -->\n    <main layout="column"\n      flex>\n\n      <!-- No List Items Yet ... Section -->\n      <section id="NoListItems"\n        ng-if="$listPage.completedItems.length === 0 && $listPage.todoItems.length ===0"\n        layout="column"\n        flex>\n        <div class="create-list"\n          layout="column"\n          layout-align="center center"\n          flex>\n          <span flex></span>\n          <span class="placeholder-text">No items yet ...</span>\n          <md-button class="md-raised md-primary"\n            ng-click="$listPage.createItem()">\n            <md-icon class="material-icons">\n              create\n            </md-icon>\n            Create one\n          </md-button>\n          <span flex></span>\n        </div>\n      </section>\n\n      <!-- List Items Todo Section -->\n      <section class="list"\n        id="TodoItems">\n\n        <!-- List Items -->\n        <ol class="items todo">\n\n          <!-- List Item -->\n          <li ng-repeat="list in $listPage.todoItems | orderBy: \'Created\'"\n            ng-class="{\'completed\': list.Completed !== null}"\n            layout="row">\n\n            <!-- List Item Check Box -->\n            <div class="check-box">\n              <md-button class="md-icon-button"\n                ng-click="$listPage.toggleComplete(list)">\n                <md-icon class="material-icons">\n                  {{ null === list.Completed ? \'check_box_outline_blank\' : \'check_box\' }}\n                </md-icon>\n              </md-button>\n            </div>\n\n            <!-- List Item Text -->\n            <div class="item-text"\n              layout="column"\n              layout-align="center start">\n              <a ui-sref="app.user.listPage({ listId: list.Id })">\n                <span class="label">{{ list.Title }}</span>\n                <span class="due-date"\n                  ng-if="list.Due">\n                  Due\n                  {{ list.Due*1000 | date:\'d MMM\' }} at\n                  {{ list.Due*1000 | date:\'h:mm a\' }}\n                </span>\n              </a>\n            </div>\n\n          </li>\n\n        </ol>\n\n      </section>\n\n      <!-- List Items Completed Section -->\n      <section class="list"\n        id="CompletedItems"\n        ng-if="$listPage.completedItems.length > 0">\n\n        <!-- Section Header -->\n        <header>\n          <h2>Completed</h2>\n        </header>\n\n        <!-- List Items -->\n        <ol class="items completed">\n\n          <!-- List Item -->\n          <li ng-repeat="list in $listPage.completedItems | orderBy: \'-Completed\'"\n            ng-class="{\'completed\': list.Completed !== null}"\n            layout="row">\n\n            <!-- List Item Check Box -->\n            <div class="check-box">\n              <md-button class="md-icon-button"\n                ng-click="$listPage.toggleComplete(list)">\n                <md-icon class="material-icons">\n                  {{ null === list.Completed ? \'check_box_outline_blank\' : \'check_box\' }}\n                </md-icon>\n              </md-button>\n            </div>\n\n            <!-- List Item Text -->\n            <div class="item-text"\n              layout="column"\n              layout-align="center start">\n              <a ui-sref="app.user.listPage({ listId: list.Id })">\n                <span class="label">{{ list.Title }}</span>\n                <span class="due-date"\n                  ng-if="list.Due">\n                  Due\n                  {{ list.Due*1000 | date:\'d MMM\' }} at\n                  {{ list.Due*1000 | date:\'h:mm a\' }}\n                </span>\n              </a>\n            </div>\n\n          </li>\n\n        </ol>\n\n      </section>\n\n    </main>\n\n  </div>\n</div>\n');
  $templateCache.put('modules/app/html/dialog/privacyPolicy.html', '<md-dialog id="Dialog_PrivacyPolicy"\n  aria-label="Privacy Policy">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>TaskEvo Privacy Policy</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="legal-text">\n        <h1>Privacy Policy</h1>\n\n        <p>Last updated: July 28, 2017</p>\n\n        <p>CALLAN MILNE ("us", "we", or "our") operates the https://my.taskevo.com website (the "Service").</p>\n\n        <p>This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.</p>\n\n        <p>We will not use or share your information with anyone except as described in this Privacy Policy.</p>\n\n        <p>We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at http://www.datastudio.xyz</p>\n\n\n\n        <h2>Information Collection And Use</h2>\n\n        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name, other information ("Personal Information").</p>\n\n        <p>The purpose for which we collect personal information is to provide you with the best service experience possible on the Service and for our internal business purposes that form part of normal business practices. Some provision of personal information is optional. However, if you do not provide us with certain types of personal information, you may be unable to enjoy the full functionality of the Service.</p>\n\n\n        <h2>Log Data</h2>\n\n        <p>We may also collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer\'s Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>\n\n        <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this type of information in order to increase our Service\'s functionality. These third party service providers have their own privacy policies addressing how they use such information.</p>\n\n\n\n\n        <h2>Cookies</h2>\n\n        <p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer\'s hard drive.</p>\n\n        <p>We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>\n\n        <p>We send a session cookie to your computer when you log in to your User account. This type of cookie helps if you visit multiple pages on the Service during the same session, so that you don\'t need to enter your password on each page. Once you log out or close your browser, this cookie expires.</p>\n\n        <p>We also use longer-lasting cookies for other purposes such as to display your Content and account information. We encode our cookie so that only we can interpret the information stored in them. Users always have the option of disabling cookies via their browser preferences. If you disable cookies on your browser, please note that some parts of our Service may not function as effectively or may be considerably slower.</p>\n\n\n\n\n\n\n        <h2>Service Providers</h2>\n\n        <p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>\n\n        <p>These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>\n\n\n\n\n        <h2>Compliance With Laws</h2>\n\n        <p>We may disclose personal information in special situations where we have reason to believe that doing so is necessary to identify, contact or bring legal action against anyone damaging, injuring or interfering (intentionally or unintentionally) with our rights or property, users or anyone else who could be harmed by such activities. <p>We will disclose your Personal Information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.</p>\n\n\n        <h2>Business Transaction</h2>\n\n        <p>In the event that we sell or buy businesses or their assets, or engage in transfers, acquisitions, mergers, restructurings, changes of control and other similar transactions, customer or user information is generally one of the transferable business assets. Thus, your personal information may be subject to such a transfer. In the unlikely event of insolvency, personal information may be transferred to a trustee or debtor in possession and then to a subsequent purchaser.</p>\n\n\n        <h2>Security</h2>\n\n        <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>\n\n\n        <h2>International Transfer</h2>\n\n        <p>Your information, including Personal Information, may be transferred to \u2014 and maintained on \u2014 computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>\n\n        <p>If you are located outside Australia and choose to provide information to us, please note that we transfer the information, including Personal Information, to Australia and process it there.</p>\n\n        <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>\n\n\n        <h2>Access and Correction</h2>\n\n        <p>Australian Privacy Principle 6 of the Privacy Act 1988 (Cth) allows you to get access to, and correct, the personal information we hold about you in certain circumstances. If you would like to obtain such access, please contact us on the details set out above.</p>\n\n        <p>Please note that the access and correction requirements under this Privacy Policy operates alongside and do not replace other informal or legal procedures by which an individual can be provided access to, or correction of, their personal information, including the requirements under the Freedom of Information Act 1982 (Cth).</p>\n\n\n        <h2>Complaints</h2>\n\n        <p>Australian Privacy Principle 1 of the Privacy Act 1988 (Cth) allows you to make a complaint about any alleged breaches of privacy. In order to lodge a complaint with us, please contact us using the details above with the following information:</p>\n\n        <ul>\n            <li>\n                <p>Your name and address;</p>\n            </li>\n            <li>\n                <p>Details of the alleged breach of privacy; and</p>\n            </li>\n            <li>\n                <p>URL link to the alleged breach of privacy (if applicable).</p>\n            </li>\n        </ul>\n\n        <p>Please allow us 30 days to investigate your complaint, after which we will contact you immediately to resolve the issue.</p>\n\n\n        <h2>Retention of Information</h2>\n\n        <p>We retain information for as long as required, allowed or we believe it useful, but do not undertake retention obligations. We may dispose of information in our discretion without notice, subject to applicable law that specifically requires the handling or retention of information. You must keep your own, separate back-up records.</p>\n\n\n        <h2>Links To Other Sites</h2>\n\n        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party\'s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>\n\n        <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>\n\n\n        <h2>Children\'s Privacy</h2>\n\n        <p>Our Service does not address anyone under the age of 18 ("Children").</p>\n\n        <p>We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children under 18 without verification of parental consent, we take steps to remove that information from our servers or replace it with the Personal Information of the Children\u2019s parent or guardian.</p>\n\n\n        <h2>Changes To This Privacy Policy</h2>\n\n        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>\n\n        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>\n\n        <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.</p>\n\n\n        <h2>Consent</h2>\n\n        <p>You warrant that you are able to give consents under Australian Law or, in the event that you do not have the capacity to give consent, you warrant that your guardian or attorney is able to give any consent required under this Privacy Policy on your behalf.</p>\n\n        <p>You hereby expressly and voluntarily grant your informed consent to us to deal with your personal information in accordance with the terms and conditions of this Privacy Policy. Should you retract your consent, please contact us. If you retract your consent, you acknowledge and agree that failure to provide certain types of personal information may not give you access to the full functionality of the Service.</p>\n\n\n        <h2>Contact Us</h2>\n\n        <p>If you have any questions about this Privacy Policy, please <a href="mailto:info@taskevo.com">contact us</a>.</p>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/app/html/dialog/termsOfUse.html', '<md-dialog id="Dialog_TermsOfUse"\n  aria-label="Terms of Use">\n  <form ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>TaskEvo Terms of Use</h2>\n        <span flex></span>\n        <md-button class="md-icon-button" ng-click="cancel()">\n          <md-icon class="material-icons" aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="legal-text">\n        <h1>Terms of Use</h1>\n\n\n        <p>Last updated: July 28, 2017</p>\n\n\n        <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the https://my.taskevo.com website (the "Service") operated by CALLAN MILNE ("us", "we", or "our").</p>\n\n        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. You warrant that you are at least 18-years-old and you are legally capable of entering into binding contracts. If you are under 18-years-old, you warrant that you have obtained consent from your parent or guardian and they agree to be bound by these Terms on your behalf.</p>\n\n        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>\n\n\n\n\n\n\n        <h2>Content</h2>\n\n        <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>\n\n        <p>By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>\n\n        <p>You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person. Further, you warrant that: (i) the Content will not cause you or us to breach any law, regulation, rule, code or other legal obligation; (ii) the Content will not or could not be reasonably considered to be obscene, inappropriate, defamatory, disparaging, indecent, seditious, offensive, pornographic, threatening, abusive, liable to incite racial hatred, discriminatory, blasphemous, in breach of confidence or in breach of privacy; (iii) the Content will not be unsolicited, undisclosed or unauthorised advertising; (iv) the Content does not contain software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software, hardware or telecommunications equipment; and (v): the Content does not bring us or the Service into disrepute.</p>\n\n        <p>You agree to keep all records necessary to establish that your Content does not violate any of the requirements this clause and make such records available upon our reasonable request.</p>\n\n        <p>We are under no obligation to regularly monitor the accuracy or reliability of your Content incorporated into the Service. We reserve the right to modify or remove any Content at any time.</p>\n\n\n\n        <h2>Accounts</h2>\n\n        <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>\n\n        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>\n\n        <p>You agree not to disclose your password to any third party. You agree to be fully responsible for activities that relate to your account or your password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>\n\n\n\n\n\n\n\n        <h2>Links To Other Web Sites</h2>\n\n        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by CALLAN MILNE.</p>\n\n        <p>CALLAN MILNE has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that CALLAN MILNE shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>\n\n        <p>We only provide links to external websites as a convenience, and the inclusion of such a link to external websites do not imply our endorsement of those websites. You acknowledge and agree that when you access other websites on the Internet, you do so at your own risk.</p>\n\n        <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>\n\n\n        <h2>Termination</h2>\n\n        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>\n\n        <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>\n\n        <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>\n\n        <p>We shall not be liable to you or any third party for any claims or damages arising out of any termination or suspension or any other actions taken by us in connection therewith.</p>\n\n        <p>If applicable law requires us to provide notice of termination or cancellation, we may give prior or subsequent notice by posting it on the Service or by sending a communication to any address (email or otherwise) that we have for you in our records.</p>\n\n\n        <h2>Indemnification</h2>\n\n        <p>As a condition of your access to and use of the Service, you agree to indemnify us and our successors and assigns for all damages, costs, expenses and other liabilities, including but not limited to legal fees and expenses, relating to any claim arising out of or related to your access to and use of the Servuce or your breach of these Terms and any applicable law or the rights of another person or party.</p>\n\n        <p>This indemnification section survives the expiration of your registration, and applies to claims arising both before and after the registration ends.</p>\n\n\n        <h2>Limitation Of Liability</h2>\n\n        <p>You agree that we shall not be liable for any damages suffered as a result of using the Service, copying, distributing, or downloading Content from the Service.</p>\n\n        <p>In no event shall we be liable for any indirect, punitive, special, incidental or consequential damage (including loss of business, revenue, profits, use, privacy, data, goodwill or other economic advantage) however it arises, whether for breach of contract or in tort, even if it has been previously advised of the possibility of such damage.</p>\n\n\n        <p>You have sole responsibility for adequate security protection and backup of data and/or equipment used in connection with your usage of the Service and will not make a claim against for lost data, re-run time, inaccurate instruction, work delays or lost profits resulting from the use of the Service. You must not assign or otherwise dispose of your account to any other person.</p>\n\n        <p>Without limiting the foregoing, in no event will our aggregate liability to you exceed, in total, the amounts paid by you to us.</p>\n\n\n        <h2>Disclaimer</h2>\n\n        <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>\n\n        <p>CALLAN MILNE its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>\n\n        <p>This disclaimer of liability applies to any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft, or destruction or unauthorized access or, alteration of or use of record in connection with the use or operation of the Service, whether for breach of contract, tortious behaviour, negligence or any other cause of action.</p>\n\n        <p>We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the content contained on the Service for any purpose. Any reliance you place on such information is therefore strictly at your own risk. We disclaim any express or implied warranty representation or guarantee as to the effectiveness or profitability of the Service or that the operation of our Service will be uninterrupted or error-free. We are not liable for the consequences of any interruptions or error in the Service.</p>\n\n\n        <h2>Exclusions</h2>\n\n        <p>Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.</p>\n\n\n        <h2>Governing Law</h2>\n\n        <p>These Terms shall be governed and construed in accordance with the laws of Victoria, Australia, without regard to its conflict of law provisions.</p>\n\n        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>\n\n\n        <h2>Changes</h2>\n\n        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>\n\n        <p>It is your sole responsibility to periodically check these Terms for any changes. If you do not agree with any of the changes to these Terms, it is your sole responsibility to stop using the Service. Your continued use of the Service will be deemed as your acceptance thereof.</p>\n\n\n        <h2>Contact Us</h2>\n\n        <p>If you have any questions about these Terms, please <a href="mailto:info@taskevo.com">contact us</a>.</p>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button class="md-primary" ng-click="cancel()">\n        Close\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
  $templateCache.put('modules/listPage/html/dialogs/changeDue.html', '<md-dialog id="Dialog_ChangeListDue"\n  aria-label="Change Due Date Form">\n  <form name="changeListDueForm"\n    ng-cloak>\n    <md-toolbar>\n      <div class="md-toolbar-tools">\n        <h2>Change Due Date</h2>\n        <span flex></span>\n        <md-button class="md-icon-button"\n          ng-click="cancel()">\n          <md-icon class="material-icons"\n            aria-label="Close dialog">\n            close\n          </md-icon>\n        </md-button>\n      </div>\n    </md-toolbar>\n\n    <md-dialog-content>\n      <div class="md-dialog-content"\n        layout="column">\n        <md-input-container>\n          <label>Due by</label>\n          <input name="listDue"\n            ng-model="$data.Due"\n            type="datetime-local"\n            md-autofocus>\n        </md-input-container>\n      </div>\n    </md-dialog-content>\n\n    <md-dialog-actions layout="row">\n      <span flex></span>\n      <md-button ng-click="cancel()">\n        Cancel\n      </md-button>\n      <md-button class="md-primary"\n        ng-click="answer()">\n        Save\n      </md-button>\n    </md-dialog-actions>\n  </form>\n</md-dialog>\n');
}]);
//# sourceMappingURL=app.js.map
