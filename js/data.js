var data = (function() {
	function NamedPoint(name, x, y, z) {
		this.x = x
		this.y = y
		this.z = z
		this.name = name
	}

	function coordinatesList() {
		var array = [
			new NamedPoint("p1", 10, 0, 0),
			new NamedPoint("p2", -10, 0, 0)
		]

		return array;
	}

	return { data : coordinatesList() };
})();
