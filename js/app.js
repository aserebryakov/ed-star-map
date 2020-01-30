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

var example = (function() {
	"use strict";
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
	var light = new THREE.AmbientLight(0xFFFFFF);
	var renderer = new THREE.WebGLRenderer();
	var box;
	var coordinates;

	function initScene() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById("wgl-container").appendChild( renderer.domElement );
		camera.position.set(0, 0, 100);
		scene.add(camera);
		scene.add(light);
		read_data();
		coordinates.forEach(initBox);
		render();
	}

	function initBox(object) {
		var box = new THREE.Mesh(
			new THREE.BoxGeometry(5, 5, 5),
			new THREE.MeshBasicMaterial({color : 0xA0FF10})
		);

		box.name = object.name;
		//box.position.set(new THREE.Vector3(object.x, object.y, object.z));
		box.position.x = object.x;
		box.position.y = object.y;
		box.position.z = object.z;
		scene.add(box);
	}

	function render() {
		var box = scene.getObjectByName("p1");
		box.rotation.y += 0.01;
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	function read_data() {
		coordinates = coordinatesList();
	}

	window.onload = initScene

	return {
		scene : scene
	}
})();