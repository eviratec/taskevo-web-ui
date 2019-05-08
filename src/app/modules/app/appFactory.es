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

angular.module('TaskEvoWebui')
  .factory('$app', dsAppFactory);

dsAppFactory.$inject = ['clientStore', 'Token'];
function dsAppFactory (  clientStore,   Token) {

  let $app;

  class App {
    constructor () {

      this.user = null;
      this.loggedin = false;

    }
    login () {

    }
    logout () {

    }
    auth (tokenKey) {
      let token = new Token(tokenKey);
    }
  }

  $app = new App();

  if (clientStore.hasStoredToken()) {
    $app.auth(clientStore.getStoredToken());
  }

  return $app;

}
