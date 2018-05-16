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
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        // windows appearance
        this.windowAppearance = new CGFappearance(this.scene);
        this.windowAppearance.setAmbient(0.1, 0.1, 0.6, 1);

        // init some objects
        // one trapezium prism
        // front and back windows. two windows per side
        this.roofBody = new MyTrapeziumPrism(this.scene, base_width, top_width, this.SLANG, height, length);
        this.frontWindow = new Plane(this.scene);
        this.backWindow = new Plane(this.scene);
        this.frontLeftWindow = new MyTrapezium(this.scene, 2, 1, 0.7, this.SLANG);
    }

    display(){
        // the main body structure
        this.scene.pushMatrix();
            this.roofBody.display(); 
        this.scene.popMatrix();

        this.windowAppearance.apply();
        
        // define the front and back windows margins
        let verticalMargin = 0.15; // margin applied at top and bottom
        let horizontalMargin = 0.1; // margin applied at both sides

        // the front window
        let frontWindowHeight = this.roofBody.getFrontPanelLength() - verticalMargin*2;
        let frontWindowWidth = this.LENGTH - horizontalMargin*2;
        this.scene.pushMatrix();
            this.scene.translate(-0.01, 0, 0); // just a small shift, so that the panel is above the trapezium (avoid glitches)    
            this.scene.rotate(this.roofBody.getFrontPanelAngle(), 0, 0, 1);
            this.scene.translate(0, frontWindowHeight/2 + verticalMargin, frontWindowWidth/2 + horizontalMargin);
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
            this.scene.translate(0, backWindowHeight/2 + verticalMargin, backWindowWidth/2 + horizontalMargin);
            this.scene.scale(0, backWindowHeight, backWindowWidth); 
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.backWindow.display();
        this.scene.popMatrix();
    }


};
