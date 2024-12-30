import { init3D } from "./init";
import * as THREE from 'three';
import GUI from "lil-gui";

const scene3d = init3D()


const drawGraph = (quantity, minRange, coefficient, exp, others) => {
    /**
     * using a dummy equation y = 2sin(x)^2 + 3
     * range in the -2 to +2
     * with a math.random use (-2*-2)-2
     */

    const points = new Float32Array(quantity * 3)
    // scene3d.camera.position.z = others / (others / 9)
    // scene3d.camera.position.y = others


    for (let i = 0; i < points.length; i += 3) {
        //x with (-3 to 3) it will be (-3*-2)+-3
        points[i] = Math.random() * (minRange * -2) + minRange

        //y = 2x^2 + 3
        points[i + 1] = (coefficient * (Math.pow(Math.sin(points[i]), exp))) + others


        //z
        points[i + 2] = Math.random() * 2
    }

    const particleGeo = new THREE.BufferGeometry()

    particleGeo.setAttribute('position', new THREE.BufferAttribute(points, 3))


    const material = new THREE.PointsMaterial({
        size: 0.05,
        sizeAttenuation: true,
        depthTest: true,
        depthWrite: true,
        alphaTest: 0.01,
        color: 0x1ff032,
    })

    const particle = new THREE.Points(particleGeo, material)
    scene3d.scene.add(particle)
    console.log(quantity, minRange, coefficient, exp, others, particle)

    particle.position.z = -3
    particle.position.y = -others

    return { particle }
}

const gui = new GUI()


const params = {
    quantity: 20000,
    minRange: -4,
    coefficient: 4,
    exp: 2,
    others: 3,
    drawGraph: () => {

        drawGraph(params.quantity, params.minRange, params.coefficient, params.exp, params.others)
    },
    reset: () => {
        window.location.reload();
    }
}


gui.add(params, 'quantity').min(1000).max(50000).setValue(params.quantity).step(1000).name('quantity')
gui.add(params, 'coefficient').min(1).max(100).setValue(params.coefficient).step(.1).name('coefficient')
gui.add(params, 'minRange').min(-100).max(-1).setValue(params.minRange).step(1).name('minRange')
gui.add(params, 'exp').min(2).max(100).setValue(2).step(params.exp).name('power')
gui.add(params, 'others').min(2).max(500).setValue(params.others).step(.1).name('others')
gui.add(params, 'drawGraph').name('drawGraph');
gui.add(params, 'reset').name('reset');
gui.add(clear, 'clear').name('reset to default')






