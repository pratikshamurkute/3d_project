import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5,0.5,0.5);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 50;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('app').appendChild( renderer.domElement );

const ambientlight = new THREE.AmbientLight( 0xffffff, 0.2 ); //0-1 is a intensity of light /soft blue light
scene.add(ambientlight);


const pointLight = new THREE.PointLight( 0xffffff, 1000,1000 );
pointLight.position.set( 9, 0, 1 );
scene.add(pointLight);

const geometry = new THREE.BoxGeometry( 5, 5, 5 );
// const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const texture = new THREE.TextureLoader().load('texture.jpg');
const texture2 = new THREE.TextureLoader().load('texture2.jpg');
const texture3 = new THREE.TextureLoader().load('texture3.jpg');

const material = new THREE.MeshStandardMaterial( { 
  color: 'red',
  map: texture,  
  bumpMap: texture2,
  bumpScale:0.3,
  displacementMap: texture2,
  displacementScale: 0.2,
  // roughness: 0.2,
  // metalness:1,
  // normalMap: texture3
} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const lightGeometry = new THREE.SphereGeometry( 1, 32 , 15 );
const lightMaterial = new THREE.MeshBasicMaterial( { color: 'white' } );
const lightSphere = new THREE.Mesh( lightGeometry, lightMaterial );
lightSphere.position.set( 1, 6, 5);
scene.add( lightSphere );

const controls = new OrbitControls(camera,renderer.domElement);

// move cube left to right and right to left with animation
let q = 0;
animate();

function animate()
{

    controls.update();

    q+=0.01;

    let qSin = Math.sin(q);
    let qCos = Math.cos(q);

    cube.position.x=3* Math.sin(q);
  

   

    pointLight.position.set(30 * qCos, 0, 30 * qSin );
    lightSphere.position.set(30 * qCos, 0 , 30 * qSin );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
