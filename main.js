import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Камера
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

// Отрисовщик
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 0;
controls.maxDistance = 200;
controls.minPolarAngle = 0;
controls.maxPolarAngle = 5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий общий свет
scene.add(ambientLight);

const geometries = [
  new THREE.SphereGeometry(1, 16, 16), // Сфера
  new THREE.BoxGeometry(1, 1, 1), // Куб
  new THREE.ConeGeometry(1, 2, 3), // Треугольная пирамида
  new THREE.TorusGeometry(0.8, 0.3, 16, 32), // Тор
];

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];

for (let i = 0; i < 300; i++) {
  const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const material = new THREE.MeshLambertMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  
  mesh.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );

  const scale = Math.random() * 2 + 0.5; // Размер от 0.5 до 2.5
  mesh.scale.set(scale, scale, scale);

  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); 
  renderer.render(scene, camera);
}

animate();

