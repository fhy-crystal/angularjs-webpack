move.$inject = [];
export default function move() {
    function getPoint(ev) {
        let event = ev || window.event;
        let point = event.touches && event.touches.length > 0 ? event.touches[0] : event;
        return {
            type: event.type,
            event: event,
            x: point.clientX,
            y: point.clientY
        }
    }
    let obj = {
        restrict: 'ECMA',
        link: function (scope, element, attr) {
            let oBox = element[0];
            element.on('touchstart mousedown', function (ev) {
                let {
                    type,
                    event,
                    x: pointX,
                    y: pointY
                } = getPoint(ev);
                let disW = pointX - oBox.offsetLeft,
                    disH = pointY - oBox.offsetTop;
                let moveType = type === 'touchstart' ? 'ontouchmove' : 'onmousemove';
                let upType = type === 'touchstart' ? 'ontouchend' : 'onmouseup';
                event.preventDefault();
                document[moveType] = function (ev) {
                    let {x, y} = getPoint(ev);
                    let posX = x - disW,
                        posY = y - disH;
                    attr.$set('data-x', posX);
                    attr.$set('data-y', posY);
                    oBox.style.left = posX + 'px';
                    oBox.style.top = posY + 'px';
                }
                document[upType] = function () {
                    document[moveType] = null;
                    document[upType] = null;
                    oBox.releaseCapture && oBox.releaseCapture();
                }
            })
            oBox.setCapture && oBox.setCapture();
        }
    }
    return obj;
}