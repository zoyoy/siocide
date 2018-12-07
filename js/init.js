var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
function createScene()
{
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    scene.gravity = new BABYLON.Vector3(0, -0.5, 0);

    // Add lights to the scene
    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(50, 20, -50), scene);

    // Add and manipulate meshes in the scene
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200}, scene);
    ground.checkCollisions = true;
    var box = BABYLON.MeshBuilder.CreateBox("box", {width: 5, height: 5, depth: 5}, scene);
    var align_to_ground = box.getBoundingInfo().boundingBox.extendSize.y;
    box.position = new BABYLON.Vector3(0, align_to_ground, 0);
    box.checkCollisions = true;

    return scene;
};
/******* End of the create scene function ******/    

var scene = createScene(); //Call the createScene function

function initPlayer()
{
    var spawnPoint = new BABYLON.Vector3(10,4,10);
    var player = new Player(spawnPoint, scene);
    return player;
}
var player = initPlayer();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", engine.resize());
// Watch for pressed keys
window.addEventListener("keyup", onKeyUp, false);
function onKeyUp(event)
{
    switch (event.keyCode)
    {
        case 16:
            var jump = new BABYLON.Animation("jump", "position.y", 20, 
                BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                
            var keys = [];
            keys.push({
                frame: 0,
                value: 0
            });
            keys.push({
                frame: 50,
                value: 2
            });
            keys.push({
                frame: 100,
                value: 0
            });
            jump.setKeys(keys);
            player.animations.push(jump);
            scene.beginAnimation(jump, )
            break;
    }
}

function initPointerLock()
{
    canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock ||
                            canvas.webkitPointerLockElement;
    canvas.requestPointerLock();
}