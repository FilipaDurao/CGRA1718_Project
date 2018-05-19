class MyVehicle extends CGFobject
{
	constructor(scene){
        super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.frontWheel = new Wheel(this.scene);
        this.backWheel = new Wheel(this.scene);
        this.tri = new MyTriangle(this.scene, 1, 1, 1);
		this.roof = new Roof(this.scene, 1, 3, 1, 1.6);
		this.lights = new Headlights(this.scene);
		this.mirror = new RearMirror(this.scene);

		this.redAppearance = new CGFappearance(this.scene);
		this.redAppearance.loadTexture("../textures/red.jpg");
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);
        
        this.spaceAppearance = new CGFappearance(this.scene);
		this.spaceAppearance.loadTexture("../textures/galaxy.jpeg");
        this.spaceAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.spaceAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.spaceAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.feupAppearance = new CGFappearance(this.scene);
		this.feupAppearance.loadTexture("../textures/feup.jpeg");
        this.feupAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.feupAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.feupAppearance.setAmbient(0.6, 0.6, 0.6, 1);

		this.WHEEL_WIDTH = 0.575;
		this.WHEEL_DIAMETER = 0.8;

		this.speed = 0;
		this.direction = 0;
        this.xPos = 0;
        this.zPos = 0;

    };

    display(){
		
		this.performMovement();
    	
    	var LENGTH = 5;
    	var HEIGHT = 2;
    	var WIDTH = 1.6;

		var ROOF_TOP_LENGHT = 1.5;
		var ROOF_BOTTOM_LENGHT = 2.74;
		var ROOF_HEIGHT = 1;
		
		if(this.scene.Texture == 'Red'){
			this.redAppearance.apply();
		}
		else if(this.scene.Texture == 'space'){
			this.spaceAppearance.apply();
		}
		else{
			this.feupAppearance.apply();
		}

    	var FRONT_LENGTH = 0.4*LENGTH/5;
    	var FRONT_HEIGHT = 0.8*HEIGHT/2;
    	
		// In front of front wheels
		this.scene.pushMatrix();
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
		
		// Roof
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 1);
			this.scene.translate(0, 1, ROOF_BOTTOM_LENGHT)
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.roof.display();
		this.scene.popMatrix();

		// Rear Mirrors
		this.scene.pushMatrix();
			this.scene.translate(-0.23, 1, 3.5);
			this.scene.scale(0.2, 0.15 ,0.2);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.mirror.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(WIDTH + 0.23, 1, 3.5);
			this.scene.scale(0.2, 0.15 ,0.2);
			this.scene.rotate(Math.PI, 1, 0, 0);
			this.mirror.display();
		this.scene.popMatrix();

		var WHEEL_WIDTH = 0.575;
		var WHEEL_DIAMETER = 0.8;
		
		// Front wheel left
		this.scene.pushMatrix();
			this.scene.translate(WIDTH - 0.3, 0, 4.05);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		// Front wheel right
		this.scene.pushMatrix();
			this.scene.translate(-0.25, 0, 4.05);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.frontWheel.display();
		this.scene.popMatrix();

		// Back wheel right
		this.scene.pushMatrix();
			this.scene.translate(-0.25, 0, 0.95);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.backWheel.display();
		this.scene.popMatrix();

		// Back wheel left
		this.scene.pushMatrix();
			this.scene.translate(WIDTH - 0.3, 0, 0.95);
			this.scene.translate(0, WHEEL_DIAMETER/2, 0);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.4, 0.4, 0.5);
			this.backWheel.display();
		this.scene.popMatrix();

		// Car's lights
		this.scene.pushMatrix();
			this.scene.translate(WIDTH/6, 0.5, LENGTH);
			this.scene.scale(0.18, 0.18, 0.1);
			this.lights.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(WIDTH*5/6, 0.5, LENGTH);
			this.scene.scale(0.18, 0.18, 0.1);
			this.lights.display();
		this.scene.popMatrix();

    }

	move(speed, turnAngle){
		this.frontWheel.rotateWheel(speed/(this.WHEEL_DIAMETER/2));
		this.backWheel.rotateWheel(speed/(this.WHEEL_DIAMETER/2));
		this.frontWheel.turnWheel(turnAngle);
		this.direction += speed * this.frontWheel.turnAngle;
		this.zPos += speed * Math.cos(this.direction);
		this.xPos += speed * Math.sin(this.direction);
	}

	performMovement(){
		this.scene.translate(this.xPos, 0, this.zPos);
		this.scene.rotate(this.direction, 0, 1, 0);
	}

};
