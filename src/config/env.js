let ip = '';
if (__PRO_ENV__.branch == 'test') {
	ip = 'http://api.example.com/v1/';
} else {
	ip = 'http://api.example.com/';
}
console.log(__PRO_ENV__)
export default {
	version: 1.0,
	ip: ip
}