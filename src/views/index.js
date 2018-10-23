import demo from './demo';
import button from './button';
import carousel from './carousel';
import sortableList from './sortableList';

export default angular.module('views', [
	demo,
	button,
	carousel,
	sortableList
]).name;