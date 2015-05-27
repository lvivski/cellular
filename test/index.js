var Cell = require('../')
var a = new Cell(),
	b = new Cell(function (a) {
		return a * a
	}, a),
	c = new Cell(function (a, b) {
		return a + b
	}, a, b),
	d = new Cell(function (a, b, c) {
		return a + b + c
	}, a, b, c)

d.get(function (d) {
	console.log(d)
})
a.set(10)
a.set(20)
