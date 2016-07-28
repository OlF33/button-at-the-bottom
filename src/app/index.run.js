(function() {
  'use strict';

  angular
    .module('buttonAtTheBottom')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
