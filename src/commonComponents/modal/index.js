import modalTemplate from './modal.html';
import './modal.less';

modalController.$inject = ['$scope'];
function modalController($scope) {
  var $ctrl = this;
  console.log($ctrl)
  $ctrl.$onInit = () => {
    $scope.isModalShow = $ctrl.isModalShow
  }
  $ctrl.$doCheck = () => {
    $scope.isModalShow = $ctrl.isModalShow
  }
  $scope.cancel = function() {
    $ctrl.cancelCallback();
    $ctrl.isModalShow = false;
  }
  $scope.ok = function() {
    $ctrl.successCallback();
    $ctrl.isModalShow = false;
  }
}

export default angular.module('wModal', [])
  .component('wModal', {
    template: modalTemplate,
    controller: modalController,
    transclude: true,
    bindings: {
      title: "@",
      isModalShow: "=",
      successCallback: "&",
      cancelCallback: "&"
    }
  })
  .name