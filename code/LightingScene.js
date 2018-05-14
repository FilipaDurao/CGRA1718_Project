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
		this.initInterfaceVariables();

		
	};

	initCameras(){
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights(){
		this.setGlobalAmbientLight(0.2,0.2,0.2, 1.0);

		// Create light 1
		this.lights[0].setPosition(3, 4, 3, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].setAmbient(0.8, 0.8, 0.8, 1);
		this.lights[0].setDiffuse(0.9, 0.9, 0.9, 1.0);
		this.lights[0].setSpecular(0.5, 0.5, 0.5, 1.0);
		this.lights[0].enable();

		// Create light 2
		this.lights[1].setPosition(3, 4, -3, 1);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[1].setAmbient(0.8, 0.8, 0.8, 1);
		this.lights[1].setDiffuse(0.9, 0.9, 0.9, 1.0);
		this.lights[1].setSpecular(0.5, 0.5, 0.5, 1.0);
		this.lights[1].enable();

		// Create light 3
		this.lights[2].setPosition(-3, 4, 3, 1);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[2].setAmbient(0.8, 0.8, 0.8, 1);
		this.lights[2].setDiffuse(0.9, 0.9, 0.9, 1.0);
		this.lights[2].setSpecular(0.5, 0.5, 0.5, 1.0);
		this.lights[2].enable();

		// Create light 4
		this.lights[3].setPosition(-3, 4, -3, 1);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setAmbient(0.8, 0.8, 0.8, 1);
		this.lights[3].setDiffuse(0.9, 0.9, 0.9, 1.0);
		this.lights[3].setSpecular(0.5, 0.5, 0.5, 1.0);
		this.lights[3].enable();
	
	};

	initObjects() {
		this.car = new MyVehicle(this);
		this.floor = new MyTerrain(this);
		this.rear = new RearMirror(this);
	}

	initInterfaceVariables(){
		this.Light1=true;
		this.Light2=true;
		this.Light3=true;
		this.Light4=true;
		this.speed=3;
	}

	toggleLight(lightIndex, turnOn){
		if(turnOn){
			this.lights[lightIndex].disable();
		}
		else{
			this.lights[lightIndex].enable();
		}
	}

	toggleAxis(){
		this.visibleAxis = !this.visibleAxis;
	};

	updateLights(){
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
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

		var visibleAxis = false;

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

		/*this.pushMatrix();
			this.rear.display();
		this.popMatrix();*/

		// ---- END Scene drawing section
	};
};
