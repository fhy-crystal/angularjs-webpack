import './loading.less'

export default angular.module('wLoading', [])
	.component('wLoading', {
		template: `<div class="wLoading">
			<div class="content">
				<div class="dots">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
				<p>Loading</p>
			</div>
		</div>`
	})
	.name