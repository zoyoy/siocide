class Player
{
    constructor(spawnpoint, scene)
    {
        // The player's spawning position
        this.spawnPoint = spawnpoint;
        // The player's height
        this.height = 2;
        // The player's speed
        this.speed = 0.5;
        // The player's inertia
        this.inertia = 0.9;
        // The mouse sensitivity (lower is more sensitive)
        this.sensi = 1000;
        // The player object's animations list
        this.animations = [];
        // The player camera
        this.camera = initCamera(this.height, this.speed, this.inertia, this.sensi);
        
        function initCamera(height, speed, inertia, sensi)
        {
            var cam = new BABYLON.FreeCamera("camera", spawnpoint, scene);
            cam.attachControl(scene.getEngine().getRenderingCanvas());
            // Define player's hitbox
            cam.ellipsoid = new BABYLON.Vector3(2, height, 2);
            // Activate collisions
            cam.checkCollisions = true;
            // Activate gravity !
            cam.applyGravity = true;
            // Remap keys to move with ZQSD
            cam.keysUp = [90]; // Z
            cam.keysDown = [83]; // S
            cam.keysLeft = [81]; // Q
            cam.keysRight = [68]; // D
            cam.speed = speed;
            cam.inertia = inertia;
            cam.sensi = sensi;
            return cam;
        }
    }
}