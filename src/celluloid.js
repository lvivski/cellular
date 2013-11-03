if (typeof define === 'function' && define.amd) {
	define(function () {
		return Cell
	})
} else if (typeof module === 'object' && module.exports) {
	module.exports = Cell
} else {
	global.Celluloid = Cell
}