// ============================================
// THREE.JS - Interactive 3D Objects (Fixed Position)
// ============================================
const container = document.getElementById("canvas-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

const geometry1 = new THREE.TorusGeometry(10, 3, 16, 100);
const geometry2 = new THREE.OctahedronGeometry(8, 0);
const geometry3 = new THREE.TetrahedronGeometry(6, 0);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: true,
  transparent: true,
  opacity: 0.2,
});

const torus = new THREE.Mesh(geometry1, material);
const octahedron = new THREE.Mesh(geometry2, material);
const tetrahedron = new THREE.Mesh(geometry3, material);

torus.position.set(-15, 5, -20);
octahedron.position.set(15, -5, -30);
tetrahedron.position.set(0, 10, -25);

scene.add(torus);
scene.add(octahedron);
scene.add(tetrahedron);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

camera.position.z = 20;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;

  octahedron.rotation.x += 0.003;
  octahedron.rotation.y += 0.007;

  tetrahedron.rotation.x += 0.007;
  tetrahedron.rotation.y += 0.003;

  camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
