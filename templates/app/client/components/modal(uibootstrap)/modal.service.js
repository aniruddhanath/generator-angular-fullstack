'use strict';
import angular from 'angular';

export function Modal($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal(scope = {}, modalClass = 'modal-default') {
    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      template: require('./modal.<%= templateExt %>'),
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      delete(del = angular.noop) {
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function() {
          var args = Array.prototype.slice.call(arguments);
          var name = args.shift();
          var deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function(event) {
            del.apply(event, args);
          });
        };
      }
    },

    /* Alert modals */
    message: {

      /**
       * Create a function to open a alert modal (ex. ng-click='myModalFn(message, arg1, arg2...)')
       * @param  {Function} al - callback, ran when alert modal is closed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */
      alert(al = angular.noop) {
        /**
         * Open a alert modal
         * @param  {String} message   - message or info to show on modal
         */
        return function(message) {
          var args = Array.prototype.slice.call(arguments),
            alertModal;

          alertModal = openModal({
            modal: {
              html: '<p>' + message + '</p>',
              buttons: [{
                classes: 'btn-default',
                text: 'Ok',
                click: function(e) {
                  alertModal.close(e);
                }
              }]
            }
          }, 'modal-default');

          alertModal.result.then(function(event) {
            al.apply(event, args);
          });
        };
      }
    }
  };
}

export default angular.module('<%= scriptAppName %>')
  .factory('Modal', Modal)
  .name;
