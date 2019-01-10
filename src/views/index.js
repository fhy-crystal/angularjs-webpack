import demo from './demo';
import button from './button';
import carousel from './carousel';
import sortableList from './sortableList';
import swiper from './swiper';

export default angular.module('views', [
	demo,
	button,
	carousel,
	sortableList,
	swiper
]).name;