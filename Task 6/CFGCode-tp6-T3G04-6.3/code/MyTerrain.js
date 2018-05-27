/**
 * 
 */
class MyTerrain extends Plane {
    constructor(scene, nrDivs, altimetry) {
        super(scene, nrDivs, 0, 1, 0, 1);

        this.streetAppearance = new CGFappearance(this.scene);
        this.streetAppearance.loadTexture("../textures/floorTextured.png");
        this.streetAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.streetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.streetAppearance.setAmbient(0.8, 0.8, 0.8, 1);

        this.applyAltimetry(altimetry);
    }

    display() {
        this.scene.pushMatrix();
            this.streetAppearance.apply();
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(50, 50, 1);
            super.display();
        this.scene.popMatrix();
        
    }

    applyAltimetry(altimetry) {
        for(let i = 0; i <= this.nrDivs; i++) { // for each y coordinate
            for(let j = 0; j <= this.nrDivs; j++) { // for each x coordinate
                this.vertices[i*(this.nrDivs+1)*3 + (j+1)*3 - 1] = altimetry[i][j];
            }
        }

        this.initGLBuffers();
    }
}