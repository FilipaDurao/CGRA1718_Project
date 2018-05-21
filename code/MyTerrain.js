/**
 * 
 */
class MyTerrain extends Plane {
    constructor(scene, nrDivs, altimetry) {
        super(scene, nrDivs, 0, nrDivs, 0, nrDivs);

        this.streetAppearance = new CGFappearance(this.scene);
        this.streetAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.streetAppearance.loadTexture("../textures/streetFloorTexture.jpg");
        this.streetAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.streetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.streetAppearance.setAmbient(0.8, 0.8, 0.8, 1);

        this.applyAltimetry(altimetry);
        console.log(altimetry);
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
                console.log(altimetry[i][j]);
                this.vertices[i*(this.nrDivs+1)*3 + (j+1)*3 - 1] = altimetry[i][j]*2;
                console.log("Vertice" + i+j+3 + "is now" + this.vertices[i + j + 3]);
            }
        }

        this.initGLBuffers();
    }
}