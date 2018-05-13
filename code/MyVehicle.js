class MyVehicle extends CGFobject
{
	constructor(scene){
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.frontWheel = new Wheel(this.scene);
        this.backWheel = new Wheel(this.scene);
        this.tri = new MyTriangle(this.scene, 1, 1, 1);
		//scene, width, top_length, bottom_lenght, height
		this.roof = new Roof(this.scene, 1.6, 1.5, 2.75, 1);

		this.redAppearance = new CGFappearance(this.scene);
		this.redAppearance.loadTexture("../textures/red.jpg");
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    };

    display(){

    	var LENGTH = 5;
    	var HEIGHT = 2;
    	var WIDTH = 1.6;

		var ROOF_TOP_LENGHT = 1.5;
		var ROOF_BOTTOM_LENGHT = 2.74;
		var ROOF_HEIGHT = 1;

		// Roof
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.scene.translate(0, 1, ROOF_BOTTOM_LENGHT)
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.roof.display();
		this.scene.popMatrix();

    	var FRONT_LENGTH = 0.4*LENGTH/5;
    	var FRONT_HEIGHT = 0.8*HEIGHT/2;

		// In front of front wheels
		this.scene.pushMatrix();
			this.redAppearance.apply();
            this.scene.translate(WIDTH/2, FRONT_HEIGHT/2 + 0.2, FRONT_LENGTH/2 + 4.6);
            this.scene.scale(WIDTH, FRONT_HEIGHT, FRONT_LENGTH);
            this.cube.display();
		this.scene.popMatrix();

		var CAPOT_LENGTH = 1.1*LENGTH/5;
		var CAPOT_HEIGHT = 0.2*HEIGHT/2;

		// Capô above front wheels
		this.scene.pushMatrix();
			this.scene.translate(WIDTH/2, CAPOT_HEIGHT/2 + 0.8, CAPOT_LENGTH/2 + 3.5);
            this.scene.scale(WIDTH, CAPOT_HEIGHT, CAPOT_LENGTH);
            this.cube.display();
		this.scene.popMatrix();

		var DOORS_LENGHT = 2*LENGTH/5;
		var DOORS_HEIGHT = 0.8*HEIGHT/2;

		// Car "Doors"
		this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, DOORS_HEIGHT/2 + 0.2, DOORS_LENGHT/2 + 1.5);
            this.scene.scale(WIDTH, DOORS_HEIGHT, DOORS_LENGHT);
            this.cube.display();
		this.scene.popMatrix();

		var ABOVE_BACK_WHEEL_LENGHT = LENGTH/5;
		var ABOVE_BACK_WHEEL_HEIGHT = 0.2*HEIGHT/2;

		// Above back wheels
		this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, ABOVE_BACK_WHEEL_HEIGHT/2 + 0.8, ABOVE_BACK_WHEEL_LENGHT/2 + 0.5);
            this.scene.scale(WIDTH, ABOVE_BACK_WHEEL_HEIGHT, ABOVE_BACK_WHEEL_LENGHT);
            this.cube.display();
		this.scene.popMatrix();

		var CAR_BACK_LENGHT = 0.5*LENGTH/5;
		var CAR_BACK_HEIGHT = 0.8*HEIGHT/2;

		// Car Back
		this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, CAR_BACK_HEIGHT/2 + 0.2, CAR_BACK_LENGHT/2);
            this.scene.scale(WIDTH, CAR_BACK_HEIGHT, CAR_BACK_LENGHT);
            this.cube.display();
		this.scene.popMatrix();

		var WHEEL_WIDTH = 0.575;
		var WHEEL_DIAMETER = 0.8;
		
		// Front wheel left
		this.scene.pushMatrix();
			this.scene.translate(WIDTH - 0.2, 0, 4.05);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		// Front wheel right
		this.scene.pushMatrix();
			this.scene.translate(0.2, 0, 4.05);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		// Back wheel right
		this.scene.pushMatrix();
			this.scene.translate(0.2, 0, 0.95);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		// Back wheel left
		this.scene.pushMatrix();
			this.scene.translate(WIDTH - 0.2, 0, 0.95);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		/*this.scene.pushMatrix();
			this.scene.translate(1.6, 0.2, 4.6);
			this.scene.scale(1, 0.6, 0.3);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, 1, 0);
			this.scene.rotate(-Math.PI/2, 0, 0, 1);
			this.tri.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.6, 0.2, 1.5);
			this.scene.scale(1, 0.6, 0.3);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.translate(0, 1, 0);
			this.scene.rotate(-Math.PI/2, 0, 0, 1);
			this.tri.display();
		this.scene.popMatrix();*/


    }


};
