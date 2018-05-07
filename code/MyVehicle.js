class MyVehicle extends CGFobject
{
	constructor(scene){
        super(scene);
        this.cube = new UnitCubeQuad(this.scene);

    };

    display(){

		// Capô
		this.scene.pushMatrix();
            this.scene.scale(1.5, 0.3, 0.6);
            this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
            this.scene.translate(0, -0.2, 0.55);
            this.scene.scale(1.5, 0.7, 0.5);
            this.cube.display();
		this.scene.popMatrix();
    }


};
