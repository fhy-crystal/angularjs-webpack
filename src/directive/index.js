import move from './move'
import sudoku from './sudoku'
import slideFollow from './slideFollow'
export default angular.module('commonDirective', [])
    .directive('moveDirective', move)
    .directive('sudokuDirective', sudoku)
    .directive('slideFollowDirective', slideFollow)
    .name