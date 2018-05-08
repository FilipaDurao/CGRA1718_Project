class MyVehicle extends CGFobject
{
	constructor(scene){
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);

    };

    display(){

    	var LENGTH = 5;
    	var HEIGHT = 2;
    	var WIDTH = 2;

    	var FRONT_LENGTH = 0.4*LENGTH/5;
    	var FRONT_HEIGHT = 0.8*HEIGHT/2;

		// In front of front wheels
		/*this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, FRONT_HEIGHT/2 + 0.2, FRONT_LENGTH/2 + 4.6);
            this.scene.scale(WIDTH, FRONT_HEIGHT, FRONT_LENGTH);
            this.cube.display();
		this.scene.popMatrix();

		var CAPOT_LENGTH = 1.1*LENGTH/5;
		var CAPOT_HEIGHT = 0.6*HEIGHT/2;

		// Capô above front wheels
		this.scene.pushMatrix();
			this.scene.translate(WIDTH/2, CAPOT_HEIGHT/2 + 0.4, CAPOT_LENGTH/2 + 3.5);
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
		var ABOVE_BACK_WHEEL_HEIGHT =0.6*HEIGHT/2;

		// Above back wheels
		this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, ABOVE_BACK_WHEEL_HEIGHT/2 + 0.4, ABOVE_BACK_WHEEL_LENGHT/2 + 0.5);
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
		this.scene.popMatrix();*/

		var FRONT_WINDOW_LENGTH = 0.1*LENGTH/5;
		var FRONT_WINDOW_HEIGHT = HEIGHT/2;

		// Front window
		this.scene.pushMatrix();
            this.scene.translate(WIDTH/2, FRONT_WINDOW_HEIGHT/2, FRONT_WINDOW_LENGTH/2);
            this.scene.scale(WIDTH, FRONT_WINDOW_HEIGHT, FRONT_WINDOW_LENGTH);
            this.cube.display();
		this.scene.popMatrix();



    }


};
