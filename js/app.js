//RENDERER
var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('app_canvas'),
    antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//camera
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
//SCENE
var scene = new THREE.Scene();

//light setup
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
var light1 = new THREE.PointLight(0xffffff, 0.7);
scene.add(light1);

//############### MOON
//Moon geometry
var moon_sphere = new THREE.SphereGeometry(40, 20, 20);
moon_sphere.vertices.push(
    new THREE.Vector3(-10, 10, 0),
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector3(10, -10, 0)
);
moon_sphere.faces.push(new THREE.Face3(0, 1, 2));
// Moon definition of material
var moon_material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load("img/moon_material.jpg"),
});
var moon_mesh = new THREE.Mesh(moon_sphere, moon_material);
// moon_mesh.position.set(-200,200, -1000);
moon_mesh.position.x = -250;
moon_mesh.position.y = 200;
moon_mesh.position.z = -1000;
scene.add(moon_mesh);

// ############# landscape
//landscape geometry
var landscape_geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
// material of landscape
var landscape_material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load("img/nature_background.jpg"),
});
var landscape_mesh = new THREE.Mesh(landscape_geometry, landscape_material);
landscape_mesh.position.x = 0;
landscape_mesh.position.y = 0;
landscape_mesh.position.z = -1000;
scene.add(landscape_mesh);

//cloud geometry
var cloud1_geometry = new THREE.PlaneGeometry(300, 200);
var cloud1_material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cloud1.png"),
    transparent: true,
    opacity: 0.9,
    color: 0xffffff
});
var cloud1_mesh = new THREE.Mesh(cloud1_geometry, cloud1_material);
cloud1_mesh.position.x = -600;
cloud1_mesh.position.y = 150;
cloud1_mesh.position.z = -900;
scene.add(cloud1_mesh);
//2nd cloud geometry
var cloud2_geometry = new THREE.PlaneGeometry(300, 200);
var cloud2_material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cloud2.png"),
    transparent: true,
    opacity: 0.9,
    color: 0xffffff
});
var cloud2_mesh = new THREE.Mesh(cloud2_geometry, cloud2_material);
cloud2_mesh.position.x = -600;
cloud2_mesh.position.y = 80;
cloud2_mesh.position.z = -900;
scene.add(cloud2_mesh);
//2nd cloud geometry
var cloud3_geometry = new THREE.PlaneGeometry(300, 200);
var cloud3_material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cloud3.png"),
    transparent: true,
    opacity: 0.9,
    color: 0xffffff
});
var cloud3_mesh = new THREE.Mesh(cloud3_geometry, cloud3_material);
cloud3_mesh.position.x = 200;
cloud3_mesh.position.y = 30;
cloud3_mesh.position.z = -900;
scene.add(cloud3_mesh);



//cloud count
var clouds_count = 0;
var render = function() {
    //rotation of the moon
    moon_mesh.rotation.x += 0.00;
    moon_mesh.rotation.y += 0.005;

    //animate cloud from left to right
    animate_clouds();
    //animate added clouds
    animate_new_clouds(clouds_count);

    //render scene
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render();

//animate new clouds
function animate_new_clouds(clouds_count){
  //console.log(clouds_count);
  for(var i = 0; i < clouds_count; i++){
    var temp_cloud = scene.getObjectByName("cloud_"+i);
    temp_cloud.position.x += .3;
    if (temp_cloud.position.x > 700)
        temp_cloud.position.x = -700;
  }
}
//moving clouds function
function animate_clouds() {
    //first cloud
    cloud1_mesh.position.x += .8;
    if (cloud1_mesh.position.x > 700)
        cloud1_mesh.position.x = -700;
    //second cloud
    cloud2_mesh.position.x += .3;
    if (cloud2_mesh.position.x > 700)
        cloud2_mesh.position.x = -700;
    //third cloud
    cloud3_mesh.position.x += .5;
    if (cloud3_mesh.position.x > 700)
        cloud3_mesh.position.x = -700;

}
//add more clouds

var add_cloud = function() {
    //random values
    var random_image = "img/cloud" + Math.floor((Math.random() * 3) + 1) + ".png";
    var random_x_position = Math.floor((Math.random() * 501) - 250);
    var random_y_position = Math.floor((Math.random() * 501) - 250);


    var c_geometry = new THREE.PlaneGeometry(300, 200);
    var c_material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(random_image),
        transparent: true,
        opacity: 0.9,
        color: 0xffffff
    });
    var c_mesh = new THREE.Mesh(c_geometry, c_material);
    c_mesh.name = "cloud_" + clouds_count; //unique id
    c_mesh.position.x = random_x_position;
    c_mesh.position.y = random_y_position;
    c_mesh.position.z = -900;
    scene.add(c_mesh);
    clouds_count += 1; //keep track of clouds count
}



// event listeners
var canvas_app = document.getElementById("app_canvas");
canvas_app.addEventListener("click", add_cloud, false);






//
