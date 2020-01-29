var example = (function() {
	"use strict";
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
	var light = new THREE.AmbientLight(0xFFFFFF);
	var renderer = new THREE.WebGLRenderer();
	var box;

	function initScene() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById("wgl-container").appendChild( renderer.domElement );
		camera.position.set(0, 0, 100);
		scene.add(camera);
		scene.add(light);

		box = new THREE.Mesh(
			new THREE.BoxGeometry(20, 30, 25),
			new THREE.MeshBasicMaterial({color : 0xA0FF10})
		);

		box.name = "box";
		scene.add(box);
		render();
	}

	function render() {
		box.rotation.y += 0.01;
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	window.onload = initScene

	return {
		scene : scene
	}
})();
