class Roof extends CGFobject
{
    /**
     * Constructor
     * @param {*} scene 
     * @param {Number} top_width 
     * @param {Number} base_width 
     * @param {Number} height 
     * @param {Number} length 
     */
	constructor(scene, top_width, base_width, height, length){
        super(scene);

        // set the roof properties
        this.TOP_WIDTH = top_width;
        this.BASE_WIDTH = base_width;
        this.HEIGHT = height;
        this.LENGTH = length;
        this.SLANG = 45;

        // the appereance, this will probably change later on
        this.redAppearance = new CGFappearance(this.scene);
		this.redAppearance.loadTexture("../textures/red.jpg");
        this.redAppearance.setSpecular(0.3, 0.3, 0.3, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        // windows appearance
        this.windowAppearance = new CGFappearance(this.scene);
        this.windowAppearance.setAmbient(102/255,151/255,153/255, 1);
        this.windowAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
        this.windowAppearance.setSpecular(0.95, 0.95, 0.95, 1); 

        // init some objects
        // one trapezium prism
        // front and back windows. two windows per side
        this.roofBody = new MyTrapeziumPrism(this.scene, this.BASE_WIDTH, this.TOP_WIDTH, this.SLANG, this.HEIGHT, this.LENGTH);
        this.frontWindow = new Plane(this.scene, 50);
        this.backWindow = new Plane(this.scene, 50);
        this.lateralLeftWindow = new MyTrapezium(this.scene, this.BASE_WIDTH, this.TOP_WIDTH, this.HEIGHT, this.SLANG);
        this.lateralRightWindow = new MyTrapezium(this.scene, this.BASE_WIDTH, this.TOP_WIDTH, this.HEIGHT, this.SLANG);
        
        // invert right window
        this.lateralRightWindow.invert();
    }

    display(){
        // the main body structure
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH/2, this.HEIGHT/2, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.roofBody.display(); 
        this.scene.popMatrix();

        this.windowAppearance.apply();
        
        // define the front and back windows margins
        let verticalMargin = 0.2; // margin applied at top and bottom
        let horizontalMargin = 0.1; // margin applied at both sides

        // the front window
        let frontWindowHeight = this.roofBody.getFrontPanelLength() - verticalMargin*2;
        let frontWindowWidth = this.LENGTH - horizontalMargin*2;
        this.scene.pushMatrix();
            this.scene.translate(-0.01, 0, 0); // a little shift to avoid rendering glitches
            this.scene.rotate(this.roofBody.getFrontPanelAngle(), 0, 0, 1);
            this.scene.translate(0, frontWindowHeight/2 + verticalMargin, 0);
            this.scene.scale(0, frontWindowHeight, frontWindowWidth); 
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.frontWindow.display();
        this.scene.popMatrix();

        // the back window
        let backWindowHeight = this.roofBody.getBackPanelLength() - verticalMargin*2;
        let backWindowWidth = this.LENGTH - horizontalMargin*2;
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH + 0.01, 0, 0); // just a small shift, so that the panel is above the trapezium (avoid glitches)    
            this.scene.rotate(this.roofBody.getBackPanelAngle(), 0, 0, 1);
            this.scene.translate(0, backWindowHeight/2 + verticalMargin, 0);
            this.scene.scale(0, backWindowHeight, backWindowWidth); 
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.backWindow.display();
        this.scene.popMatrix();
        
        // lateral window left
        // a ratio to shrink the window such that vertical lenght is the same as other windows
        let ratio = frontWindowHeight*Math.sin(this.SLANG*degToRad)/this.HEIGHT; 
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH/2, this.HEIGHT/2, this.LENGTH/2 + 0.01);
            this.scene.scale(ratio, ratio, 1);
            this.lateralLeftWindow.display();
        this.scene.popMatrix();

        // lateral window right
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH/2, this.HEIGHT/2, -this.LENGTH/2 - 0.01);
            this.scene.scale(ratio, ratio, 1);
            this.lateralRightWindow.display();
        this.scene.popMatrix();


    }


};
