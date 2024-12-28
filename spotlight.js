//Zackary Bowling


/*
This project uses a model consisting of a room with eight walls and a floor
to demonstrate the use of a spotlight in a 3D scene

*/
let scene, camera, renderer, spotlight;
let spotlightPositions = [
    { x: 0, y: 10, z: 0 },
    { x: 5, y: 10, z: 0 },
    { x: -5, y: 10, z: 0 },
    { x: 0, y: 10, z: 5 },
    { x: 0, y: 10, z: -5 }
];
let cameraPositions = [
    { x: 0, y: 15, z: 10 },
    { x: 5, y: 15, z: 10 },
    { x: -5, y: 15, z: 10 },
    { x: 0, y: 15, z: 5 },
    { x: 0, y: 15, z: -5 },
    { x: 0, y: 20, z: 0 }
];
let spotlightDirection = new THREE.Vector3(0, -1, 0);

function init() {
    // Initialize scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 15, 30);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('glCanvas') });
    renderer.setSize(500, 400);

    // Initialize spotlight
    spotlight = new THREE.SpotLight(0xffffff, 1.5);
    spotlight.position.set(0, 10, 10);
    spotlight.angle = Math.PI / 6;
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Create walls
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });

    const mainWallGeometry = new THREE.BoxGeometry(1, 3, 10);
    const mainWall = new THREE.Mesh(mainWallGeometry, wallMaterial);
    mainWall.position.set(-4, 1.5, 0);
    scene.add(mainWall);

    const wallWidth = 1;
    const wallHeight = 3;
    
    const topWallGeometry = new THREE.BoxGeometry(4, wallHeight, wallWidth);
    const topWall = new THREE.Mesh(topWallGeometry, wallMaterial);
    topWall.position.set(-2, 1.5, -4.5);
    scene.add(topWall);
    
    const middleWallGeometry = new THREE.BoxGeometry(3, wallHeight, wallWidth);
    const middleWall = new THREE.Mesh(middleWallGeometry, wallMaterial);
    middleWall.position.set(-2.5, 1.5, 0);
    scene.add(middleWall);

    const bottomWallGeometry = new THREE.BoxGeometry(5, wallHeight, wallWidth);
    const bottomWall = new THREE.Mesh(bottomWallGeometry, wallMaterial);
    bottomWall.position.set(-1.5, 1.5, 4.5);
    scene.add(bottomWall);

    const additionalVerticalWallGeometry = new THREE.BoxGeometry(1, wallHeight, 2);
    const additionalVerticalWall = new THREE.Mesh(additionalVerticalWallGeometry, wallMaterial);
    additionalVerticalWall.position.set(-1, 1.5, 4);
    scene.add(additionalVerticalWall);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    animate();
}

function animate() {
    // Render loop
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();

function updateSpotlightPosition(position) {
    // Update spotlight position
    const pos = spotlightPositions[position - 1];
    spotlight.position.set(pos.x, pos.y, pos.z);
}

function updateCameraPosition(position) {
    // Update camera position
    const pos = cameraPositions[position];
    camera.position.set(pos.x, pos.y, pos.z);
    camera.lookAt(0, 0, 0); 
}

function adjustSpotlightDirection(direction) {
    // Adjust spotlight direction
    if (direction === 'left') spotlightDirection.x -= 0.1;
    if (direction === 'right') spotlightDirection.x += 0.1;
    if (direction === 'up') spotlightDirection.y += 0.1;
    if (direction === 'down') spotlightDirection.y -= 0.1;

    spotlight.target.position.set(spotlightDirection.x, spotlightDirection.y, spotlightDirection.z);
}

// Event listeners for UI controls
document.getElementById('spotlight-position').addEventListener('change', (e) => {
    updateSpotlightPosition(e.target.value);
});

document.getElementById('camera-position').addEventListener('change', (e) => {
    updateCameraPosition(e.target.value);
});

document.getElementById('aim-left').addEventListener('click', () => adjustSpotlightDirection('left'));
document.getElementById('aim-right').addEventListener('click', () => adjustSpotlightDirection('right'));
document.getElementById('aim-up').addEventListener('click', () => adjustSpotlightDirection('up'));
document.getElementById('aim-down').addEventListener('click', () => adjustSpotlightDirection('down'));

document.getElementById('increase-cutoff').addEventListener('click', () => {
    spotlight.angle = Math.min(spotlight.angle + 0.1, Math.PI / 2);
});
document.getElementById('decrease-cutoff').addEventListener('click', () => {
    spotlight.angle = Math.max(spotlight.angle - 0.1, 0.1);
});

init();
