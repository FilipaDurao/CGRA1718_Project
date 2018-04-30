var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.enableTextures(true);

		this.axis = new CGFaxis(this);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);

		this.materialC = new CGFappearance(this);
		this.materialC.setAmbient(0,0,1,1);
		this.materialC.setDiffuse(0,0,0,1);
		this.materialC.setSpecular(0,0,0,1);	
		this.materialC.setShininess(120);

		this.materialD = new CGFappearance(this);
		this.materialD.setAmbient(0.3,0.3,0.3,1);
		this.materialD.setDiffuse(1,0,0,1);
		this.materialD.setSpecular(1,0,0,1);	
		this.materialD.setShininess(120);

		// Floor material with texture
		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
		this.floorAppearance.setSpecular(1.0,1.0,1.0,1.0);
		this.floorAppearance.setDiffuse(1.0,1.0,1.0,1.0);
		this.floorAppearance.setAmbient(0.86,0.73,0.55,1.0);

		// Window material
		this.windowAppearance  = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.windowAppearance.setAmbient(1.0,1.0,1.0,1.0);

		// Slides
		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.slidesAppearance.setShininess(5);
		this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
		this.slidesAppearance.setAmbient(0.2, 0.2, 0.2, 1);

		// Whiteboard
		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
		this.boardAppearance.setShininess(120);
		this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
		this.boardAppearance.setAmbient(0.4, 0.4, 0.4, 1);
				
		// Marble
		this.marbleAppearance = new CGFappearance(this);
		this.marbleAppearance.loadTexture("../resources/images/marble.jpg");
		this.marbleAppearance.setSpecular(0.2, 0.2, 0.2, 1);
		this.marbleAppearance.setShininess(120);
		this.marbleAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
		this.marbleAppearance.setAmbient(0.4, 0.4, 0.4, 1);

		// Scene elements
		this.table = new MyTable(this);
		this.wall = new Plane(this);
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		this.chair = new MyChair(this);
		this.window = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
		this.screenProjection = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
		this.whiteBoard = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
		this.column = new MyCylinder(this, 20, 5);
		this.clock = new MyClock(this);

		this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		
		// Positions for four lights

		// Create light 0
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].setLinearAttenuation(1.0);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].enable();
		
		// Create light 1
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].setLinearAttenuation(1.0);
		this.lights[1].setQuadraticAttenuation(0);
		this.lights[1].enable();
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		
		// Create light 2 (Ex 3 Ponto 1)
		this.lights[2].setPosition(10.5, 6.0, 8.0, 1.0);
		this.lights[2].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[2].enable();

		// Create light 3
		this.lights[3].setPosition(4.0, 6.0, 8.0, 1.0);
		this.lights[3].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(1.0);
		this.lights[3].setQuadraticAttenuation(0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].enable();

		// Create light 4
		this.lights[4].setPosition(0.0, 4.0, 7.5, 1.0);
		this.lights[4].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1);
		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(1.0);
		this.lights[4].setQuadraticAttenuation(0);
		this.lights[4].setVisible(true);
		this.lights[4].enable();

	};

	update(currTime){
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.clock.update(this.deltaTime);
		//this.plane.update(this.deltaTime);
	}


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

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.window.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.materialC.apply();
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slidesAppearance.apply();
			this.screenProjection.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(11, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.whiteBoard.display();
		this.popMatrix();

		// First Chair
		this.pushMatrix();
			this.translate(5, 0, 10);
			this.rotate(Math.PI, 0, 1, 0);
			this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
			this.translate(12, 0, 10);
			this.rotate(Math.PI, 0, 1, 0);
			this.chair.display();
		this.popMatrix();

		// First Column
		this.pushMatrix();
			this.translate(12, 0, 13.6);
			this.scale(1, 8, 1);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.marbleAppearance.apply();
			this.column.display();
		this.popMatrix();

		// Second Column
		this.pushMatrix();
			this.translate(5, 0, 13.6);
			this.scale(1, 8, 1);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.column.display();
		this.popMatrix();

		// Clock
		this.pushMatrix();
			this.materialDefault.apply();
			this.translate(7.5, 7.25, 0);
			this.scale(0.75,0.75,0.2);
			this.clock.display();
		this.popMatrix();


		// ---- END Scene drawing section
	};
};
