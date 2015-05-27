var nextTick
if (typeof define === 'function' && define.amd) {
	define(['subsequent'], function (subsequent) {
		nextTick = subsequent
		return Cell
	})
} else if (typeof module === 'object' && module.exports) {
	module.exports = Cell
	nextTick = require('subsequent')
} else {
	global.Celluloid = Cell
	nextTick = global.subsequent
}
