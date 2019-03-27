import num2str from './num2str'
export default angular.module('commonFilter', [])
    .filter('num2str', num2str)
    .name