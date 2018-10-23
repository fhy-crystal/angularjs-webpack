import sortableListRouter from './sortableList.router'

export default angular.module('sortableList', [])
	.config(sortableListRouter)
	.name;