/**
 * 
 */
class Terrain extends Plane {
    constructor(scene) {
        super(scene, 50, 0, 1, 0, 1);
    }

    display() {
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.scale(50, 1, 50);
        this.scene.popMatrix();
    }
}