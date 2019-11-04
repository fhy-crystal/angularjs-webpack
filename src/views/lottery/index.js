import lotteryRouter from './lottery.router'

export default angular.module('lottery', [])
	.config(lotteryRouter)
	.name;