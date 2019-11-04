import move from './move'
import sudoku from './sudoku'
export default angular.module('commonDirective', [])
    .directive('moveDirective', move)
    .directive('sudokuDirective', sudoku)
    .name