import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';

var example = (function() {
	"use strict";
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 60000);
	var light = new THREE.AmbientLight(0xFFFFFF);
	var renderer = new THREE.WebGLRenderer();
	var box;
	var coordinates;
	var rotation = 0;
	var controls = new OrbitControls( camera, renderer.domElement );

	function initScene() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById("wgl-container").appendChild( renderer.domElement );
		//controls.update() must be called after any manual changes to the camera's transform
		camera.position.set( 0, 100, 0 );
		controls.update();
		scene.add(camera);
		scene.add(light);
		read_data();

		initStars(coordinates.data);
		//coordinates.data.forEach(initBox);

		var box = new THREE.Mesh(
			new THREE.SphereGeometry(2),
			new THREE.MeshBasicMaterial({color : 0xFF0000})
		);
		scene.add(box);

		render();
	}

	function initStars(coordinates) {
		var geometry = new THREE.Geometry();

		function addVerticle(obj) {
			var star = new THREE.Vector3();
			star.x = obj.x;
			star.y = obj.y;
			star.z = obj.z;

			geometry.vertices.push( star );
		}

		coordinates.forEach(addVerticle);

		var material = new THREE.PointsMaterial( {color : 0x888888} );

		var stars = new THREE.Points( geometry, material );
		scene.add( stars );
	}

	function render() {
		requestAnimationFrame(render);
		controls.update();
//		rotation += 0.001;
//		camera.position.x = 1000 * Math.cos(rotation);
//		camera.position.z = 1000 * Math.sin(rotation);
//		camera.lookAt( new THREE.Vector3(0, 0, 0));
		renderer.render(scene, camera);
	}

	function read_data() {
		coordinates = data;
	}

	window.onload = initScene

	return {
		scene : scene
	}
})();
