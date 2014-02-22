function Cell(value) {
	var cell = this,
	    deps = [].slice.call(arguments, 1)

	this.value = typeof value === 'function' ? value.apply(null, deps) : value
	this.listeners = []

	for (var i = 0; i < deps.length; ++i) {
		deps[i].get(function () {
			cell.set(value.apply(null, deps))
		})
	}
}

function handle(listener, value) {
	listener(value)
}

Cell.prototype.get = function (listener) {
	this.listeners.push(listener)
}

Cell.prototype.set = function (value) {
	this.value = value
	for (var i = 0; i < this.listeners.length; ++i) {
		handle(this.listeners[i], value)
	}
}

Cell.prototype.valueOf = function () {
	return this.value
}

Cell.prototype.toString = function () {
	return String(this.value)
}
