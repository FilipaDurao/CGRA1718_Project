 
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();
		this.initAxisButton();
		this.initLightsFolder();
		this.initSpeedSlider(0,5);
		this.initObjectsToggle();
		this.initDropDownTextures();
		this.initKeys();

		return true;
	};

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}
	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};
	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};
	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}

	initAxisButton(){
		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		this.gui.add(this.scene, 'toggleAxis');
	}

	initLightsFolder(){
		// add a group of controls (and open/expand by default)
		var group=this.gui.addFolder("Lights");
		group.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		group.add(this.scene, 'Light1').onChange(()=>{
			if(this.scene.Light1){
				this.scene.toggleLight(0, false);
			}
			else{
				this.scene.toggleLight(0, true);
			}
		});

		group.add(this.scene, 'Light2').onChange(()=>{
			if(this.scene.Light2){
				this.scene.toggleLight(1, false);
			}
			else{
				this.scene.toggleLight(1, true);
			}
		});

		group.add(this.scene, 'Light3').onChange(()=>{
			if(this.scene.Light3){
				this.scene.toggleLight(2, false);
			}
			else{
				this.scene.toggleLight(2, true);
			}
		});
		
		group.add(this.scene, 'Light4').onChange(()=>{
			if(this.scene.Light4){
				this.scene.toggleLight(3, false);
			}
			else{
				this.scene.toggleLight(3, true);
			}
		});
	}

	initSpeedSlider(min, max) {
		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'speed', min, max);
	}

	initObjectsToggle() {
		this.gui.add(this.scene, 'showObjects');
	}

	initDropDownTextures(){ 
        this.gui.add(this.scene, 'Texture', [ 'Red', 'feup', 'space' ] ); 
    }


};

