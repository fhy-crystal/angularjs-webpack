import demo from './demo';
import button from './button';
import carousel from './carousel';
import sortableList from './sortableList';
import swiper from './swiper';
import dragImage from './dragImage';
import loading from './loading';
import modal from './modal';


export default angular.module('views', [
	demo,
	button,
	carousel,
	sortableList,
	swiper,
	dragImage,
	loading,
	modal
]).name;