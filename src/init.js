import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



export function init3D() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let aspect = width / height;
    const canvas = document.querySelector('canvas')

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;

    // Position the camera
    camera.position.z = 5;

    // Function to handle resizing
    function resize() {
        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            aspect = width / height;

            // Update camera and renderer
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    // Function to render the scene
    function render() {
        requestAnimationFrame(render);

        renderer.render(scene, camera);
    }

    // Call the resize function
    resize();

    // Start rendering
    render();

    return {
        scene, camera, canvas, width, height, renderer
    }

}