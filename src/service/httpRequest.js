// extend object
function extendObj(target, source) {
	for (var prop in source) {
		if (source.hasOwnProperty(prop)) {
			target[prop] = source[prop];
		}
	}
}

httpRequest.$inject = ['$http', '$q', 'ENV'];

export default function httpRequest($http, $q, ENV) {
	var config = {};

	var request = (header) => {
		var deferred = $q.defer();

		config.headers = {
			'Content-Type': 'application/json; charset=UTF-8'
		};
		if (Object.hasOwnProperty('assign')) {
			Object.assign(config.headers, header);
		} else {
			extendObj(config.headers, header);
		}

		$http(config)
			.then(res => {
				deferred.resolve(res);
			}, err => {
				deferred.reject(err);
			})
		return deferred.promise;
	};

	this.get = (url, params, header = {}) => {
		config = {
			method: 'GET',
			url: ENV.ip + url,
			params: params
		};
		return request(header);
	};

	this.post = (url, data, header = {}) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data
		};
		return request(header);
	};

	this.formPost = (url, data, header = {}) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			transformRequest: function(obj) {
				let str = [];
				for (let s in obj) {
					str.push(encodeURIComponent(s) + '=' + encodeURIComponent(obj[s]));
				}
				return str.join('&');
			}
		};
		header['Content-Type'] = 'application/x-www-form-urlencoded';
		return request(header);
	};

	this.upload = (url, data, header = {}) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			transformRequest: function(data) {
				var formData = new FormData();
				formData.append('file', data);
				return formData;
			}
		};
		header['Content-Type'] = undefined;
		return request(header);
	};

	this.export = (url, data, filename) => {
		var deferred = $q.defer();
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		};
		$http(config)
			.then(res => {
				let url = window.URL.createObjectURL(res.data);
				let link = document.createElement('a');
				link.style.display = 'none';
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, err => {
				deferred.reject(err);
			})
		return deferred.promise;
	}
}