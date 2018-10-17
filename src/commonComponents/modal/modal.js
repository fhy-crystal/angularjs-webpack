import angular from 'angular';
import modalTemplate from './modal.html';
import './modal.less';

var modalController = function() {

}

function greeting() {
  return {
    restrict: 'E',
    scope: {
      name: '='
    },
    template: '<h1>Hello, {{name}}</div>'
  }
}

export default angular.module('directives', [])
	.directive('userModal', greeting)
	.name