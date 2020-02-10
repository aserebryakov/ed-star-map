import * as THREE from '../three.js/build/three.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import { STLExporter } from '../three.js/examples/jsm/exporters/STLExporter.js';

var example = (function() {
	"use strict";
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 250000);
	var light = new THREE.AmbientLight(0xFFFFFF);
	var renderer = new THREE.WebGLRenderer();
	var box;
	var coordinates;
	var rotation = 0;
	var controls = new OrbitControls( camera, renderer.domElement );

	function initScene() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById("wgl-container").appendChild( renderer.domElement );
		camera.position.set(-400, 100, -500);
		controls.update();
		scene.add(camera);
		scene.add(light);
		read_data();

		initStars(coordinates.data);

		var box = new THREE.Mesh(
			new THREE.SphereGeometry(3),
			new THREE.MeshBasicMaterial({color : 0xFF0000})
		);
		scene.add(box);
		initGalaxyMap(scene);

		render();
	}

	function initGalaxyMap(scene) {
		var galaxy_map = new THREE.PlaneGeometry( 87000, 87000, 1, 1 );
		var texture = new THREE.TextureLoader().load( '/ed-star-map/textures/galactic_map.jpg' );
		var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.4} );

		// I little bit missed the actual position on map texture so I use coordinates offset.
		// 25.21875 / -20.90625 / 25899.96875 - center position
		var plane = new THREE.Mesh( galaxy_map, material );
		plane.position.x = 250;
		plane.position.y = -20.90625;
		plane.position.z = 25899.96875;
		plane.rotation.x = 1.5707963267948966192313216916398; // PI/2
		plane.rotation.y = 2*1.5707963267948966192313216916398; // PI
		scene.add( plane );
	}

	function initStars(coordinates) {
		var starsGeometry = new THREE.Geometry();

		function addVerticle(obj) {
			var star = new THREE.Vector3();
			star.x = -obj.x;
			star.y = obj.y;
			star.z = obj.z;

			starsGeometry.vertices.push( star );
		}

		coordinates.forEach(addVerticle);

		var material = new THREE.PointsMaterial( {color : 0xFFFF10} );

		var stars = new THREE.Points( starsGeometry, material );
		scene.add(stars);
	}

	function render() {
		requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
	}

	function read_data() {
		coordinates = data;
	}

	window.onload = initScene

	// Exporting
	
	var buttonExportBinary = document.getElementById('exportBinary');
	buttonExportBinary.addEventListener('click', exportBinary);

	function exportBinary(mesh) {
		var exporter = new STLExporter();
		var result = exporter.parse(mesh, {binary: true});
		saveArrayBuffer(result, 'stars.stl');
	}

	function saveArrayBuffer( buffer, filename ) {
		save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
	}

	var link = document.createElement( 'a' );
	link.style.display = 'none';
	document.body.appendChild( link );

	function save( blob, filename ) {
		link.href = URL.createObjectURL( blob );
		link.download = filename;
		link.click();

	}

	return {
		scene : scene
	}
})();
