loading.$inject = [];

export default function loading() {
    this.show = () => {
        var $ele = document.getElementsByClassName('wLoading')[0];
        if ($ele) {
            if ($ele.style.display === 'block') {
                this.hide();
            }
            $ele.style.display = 'block';
        }
    }
    this.hide = () => {
        var $ele = document.getElementsByClassName('wLoading')[0];
        if ($ele) {
            $ele.style.display = 'none';
        }
    }
}