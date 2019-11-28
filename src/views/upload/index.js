import uploadRouter from './upload.router'

export default angular.module('upload', [])
	.config(uploadRouter)
	.name;