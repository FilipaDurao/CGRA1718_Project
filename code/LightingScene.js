var degToRad = Math.PI / 180.0;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(135/255, 206/255, 235/255, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.enableTextures(true);

		this.axis = new CGFaxis(this);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.initObjects();

		
	};

	initCameras(){
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights(){
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

		// Create light 0
		this.lights[0].setPosition(3, 4, 3, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(255, 255, 255, 1.0);
		this.lights[0].enable();

		// Create light 1
		this.lights[1].setPosition(3, 4, -3, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(255, 255, 255, 1.0);
		this.lights[1].enable();
		

	};

	initObjects() {
		this.wheel = new Wheel(this);
		this.car = new MyVehicle(this);
		this.floor = new Terrain(this);
	}

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		/*this.pushMatrix();
			this.floor.display();
		this.popMatrix();*/

		this.pushMatrix();
			this.car.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};
};
