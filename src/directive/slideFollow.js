slideFollow.$inject = ['$timeout'];
export default function slideFollow($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            setData: '='
        },
        template: `<ul class="slideFollow"><li ng-repeat='data in setData track by $index'>{{data.option}}</li></ul>`,
        link: function ($scope, Element) {
            $timeout(function() {
                var className = $('.slideFollow');
                var timer;
                var liHeight = className.children('li').height();

                // 开启定时器
                timer = setInterval(slide, 3000);

                function slide() {
                    className.animate({
                        marginTop: -liHeight + 'px'
                    },
                    'slow',
                    function() {
                        $(this).css({marginTop: '0px'}).find('li:first').appendTo(this)
                    })
                }
            }, 500)
        }
    }
}