var degToRad = Math.PI / 180.0;
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
		this.initInterfaceVariables();
		this.initAppearance();

		this.setUpdatePeriod(1000/60);
		
	};

	initCameras(){
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights(){
		this.setGlobalAmbientLight(0.2,0.2,0.2, 1.0);

		// Create light 1
		this.lights[0] = new CGFlight(this, 0);
		this.lights[0].setPosition(0, 5, 0, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].setAmbient(0.8, 0.8, 0.8, 1);
		this.lights[0].setDiffuse(0.5, 0.5, 0.5, 1.0);
		this.lights[0].setSpecular(1, 1, 1, 1.0);
		this.lights[0].setLinearAttenuation(0.1);
		this.lights[0].enable();

		// Create light 2
		
		this.lights[1].setPosition(10, 20, -10, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[1].setDiffuse(0.3, 0.3, 0.3, 1.0);
		this.lights[1].setSpecular(0.15, 0.15, 0.15, 1.0);
		this.lights[1].setLinearAttenuation(0.1);
		this.lights[1].enable();
		
		// Create light 3
		this.lights[2].setPosition(-10, 20, 10, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[2].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[2].setDiffuse(0.3, 0.3, 0.3, 1.0);
		this.lights[2].setSpecular(0.15, 0.15, 0.15, 1.0);
		this.lights[2].setLinearAttenuation(0.1);
		this.lights[2].enable();

		// Create light 4
		this.lights[3].setPosition(-10, 20, -10, 1);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[3].setDiffuse(0.3, 0.3, 0.3, 1.0);
		this.lights[3].setSpecular(0.15, 0.15, 0.15, 1.0);
		this.lights[3].setLinearAttenuation(0.1);
		this.lights[3].enable();
	
	};

	initObjects() {
		this.car = new MyVehicle(this);
		this.floor = new MyTerrain(this);

		// request objects by teacher
		this.myTrapezium = new MyTrapeziumPrism(this, 5, 3, 45, 2, 2);
		this.myCylinder = new MyCylinder(this, 20, 5);
		this.mySemiSphere = new SemiSphere(this, 20, 5);
	}

	initAppearance() {
		this.feupTexture = new CGFappearance(this);
		this.feupTexture.loadTexture("../textures/feuplogo.jpg");
	}

	updateLights(){
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	
	update(){
		this.checkKeys();
	}

	/*
	+------------------------------------+
	|                                    |
	|               TASK4                |
	|                                    |
	+------------------------------------+
	*/

	checkKeys(){

		var text="Keys pressed: ";
		var keysPressed=false;
	
		if (this.gui.isKeyPressed("KeyW")){
			text+=" W ";
			keysPressed=true;
			this.car.move(this.speed, 0);
		}

		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			keysPressed=true;
			this.car.move(-this.speed, 0);
		}

		if (this.gui.isKeyPressed("KeyA")){
			text+=" A ";
			keysPressed=true;
			this.car.move(0, this.speed);
		}

		if (this.gui.isKeyPressed("KeyD")){
			text+=" D ";
			keysPressed=true;
			this.car.move(0, -this.speed);
		}

		if (keysPressed)
			console.log(text);
	}

	/*
	+----------------------------------+
	|                                  |
	|               GUI                |
	|                                  |
	+----------------------------------+
	*/

	/**
	 * Declares and defines a set of variables for GUI controller
	 */
	initInterfaceVariables(){
		this.Light1 = true;
		this.Light2 = true;
		this.Light3 = true;
		this.Light4 = true;
		this.speed = 0.1;
		this.Texture = 'space';
		this.showObjects = false;
		this.visibleAxis = false;
	}

	/**
	 * Toggles the lights on the scene (GUI)
	 * @param {number} lightIndex The light index
	 * @param {boolean} turnOn true to enable the light, false otherwise
	 */
	toggleLight(lightIndex, turnOn){
		if(turnOn){
			this.lights[lightIndex].disable();
		}
		else{
			this.lights[lightIndex].enable();
		}
	}

	/**
	 * Shows/hides the scene axis (GUI)
	 */
	toggleAxis(){
		this.visibleAxis = !this.visibleAxis;
	};

	/**
	 * Shows/hides some objects on scene (GUI)
	 * The objects are: one semi-sphere, one trapezium prism and one cylinder
	 * All these objects have a texture applied
	 */
	toggleSceneObjects() {
		this.showObjects = !this.showObjects; 
	}

	display(){
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
		if(this.visibleAxis){
			this.axis.display();
		}

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
			this.car.display();
		this.popMatrix();

		this.pushMatrix();
			this.floor.display();
		this.popMatrix();
		
		if(this.showObjects) {
			// apply texture TODO
			this.feupTexture.apply();

			// change camera
			//this.camera.setPosition(vec3.fromValues(-10, 0, -15));
			//this.camera.setTarget(vec3.fromValues(-20, 0, -15));
			
			// transformations
			this.pushMatrix();
				this.translate(-15,0,-20);
				this.myTrapezium.display();
			this.popMatrix();

			this.pushMatrix();
				this.scale(1,10,1);
				this.translate(-17,0,-20);
				this.rotate(-Math.PI/2, 1, 0, 0);
				this.myCylinder.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(-20,0,-20);
				this.rotate(-Math.PI/2, 1, 0, 0);
				this.mySemiSphere.display();
			this.popMatrix();
		}
		// ---- END Scene drawing section
	};
};
