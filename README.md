# angularjs-webpack
this is a project with angularjs 1.7 / webpack 1.13 / lib-flexible / ES6 / jquery

### Quick start
```bash
# clone our repo
$ git clone https://github.com/fhy-crystal/angularjs-webpack.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm run dev

# run build
$ npm run build

# run build in mini
$ npm run build:mini // you can get the param(mini) in you project
```

go to [http://localhost:7080](http://localhost:7080) in your browser.


# Table of Contents

* [button](#button)
* [toast](#toast)
* [carousel](#carousel)
* [sortableList](#sortableList)
* [swiper](#swiper)
* [cross-env](#cross-env)
* [dragImage](#dragImage)


## button
* normal button

	`<w-button text="normal button"></w-button>`

* displayed button

	`<w-button disabled="true" text="normal button"></w-button>`

* small button

	`<w-button size="wBtn_sm" text="small button"></w-button>`

* middle button

	`<w-button size="wBtn_md" text="middle button"></w-button>`

* large button

	`<w-button size="wBtn_lg" text="large button"></w-button>`

* border button

	`<w-button type="wBtn_border" text="border button"></w-button>`

* text button

	`<w-button type="wBtn_text" text="text button"></w-button>`

## toast

```
// html
<w-toast></w-toast>

// js
ctrl.$inject = ['$scope', 'toastSrv'];
export default function ctrl($scope, toastSrv) {
	$scope.toast = () => {
		toastSrv('test')
	}
}
```

## carousel

This carousel uses the component in angular-ui-bootstrap. You can read more at [angular-ui-bootstrap](https://angular-ui.github.io/bootstrap/#!#carousel).

If you want to use ng-touch to swipe the carousel, please do remember to import angular-ui-bootstrap@1.3.3, if you used the lastest one, it does not work any more.

## sortable list

swipe right to open the hidden button.

drag image in list to reorder.

## swiper

if your customer does not like the animate in carousel, you can use swiper who based on jquery. So you should import jquery first. Just import jquery in you vendor.js, and add the code below in webpack.config.js

```
new webpack.ProvidePlugin({
	$: 'jquery',
	jQuery: 'jquery',
	'window.jQuery': 'jquery'
})
```

After that, you can new swiper in your project. If you want more information about swiper, please click [here](https://www.swiper.com.cn/).

## cross-env

This plugin can help you have a single command without worrying about setting or using the environment variable properly for the platform

```
// work on Windows
cross-env NODE_ENV={env:'normal',branch:'test'} 
cross-env NODE_ENV={'env':'normal','branch':'test'}
cross-env NODE_ENV={\\\"env\\\":\\\"normal\\\",\\\"branch\\\":\\\"test\\\"}

// work on Mac
cross-env NODE_ENV='{\"env\":\"normal\",\"branch\":\"test\"}'
```

## drag image

It only works fine at pc platform. I am still working on it for it can work on mobile.





