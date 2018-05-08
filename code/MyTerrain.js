/**
 * 
 */
class MyTerrain extends Plane {
    constructor(scene) {
        super(scene, 50, 0, 50, 0, 50);

        this.streetAppearance = new CGFappearance(this.scene);
        this.streetAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.streetAppearance.loadTexture("../textures/streetFloorTexture.jpg");
        this.streetAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.streetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.streetAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    }

    display() {
        this.scene.pushMatrix();
            this.streetAppearance.apply();
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(50, 50, 1);
            super.display();
        this.scene.popMatrix();
        
    }
}