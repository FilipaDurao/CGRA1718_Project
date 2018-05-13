class Roof extends CGFobject
{
    /**
     * Constructor
     * @param {*} scene 
     * @param {*} width The width (seen from the car front) 
     * @param {*} length The length (seen from car sides)
     * @param {*} height The height
     */
	constructor(scene, width, top_length, bottom_lenght, height){
        super(scene);

        this.redAppearance = new CGFappearance(this.scene);
		this.redAppearance.loadTexture("../textures/red.jpg");
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        // declare dimension contants
        this.HEIGHT = height;
        this.WIDTH = width;
        this.TOP_LENGTH = top_length;
        this.BOTTOM_LENGTH = bottom_lenght;
        this.frontWindowAngle = Math.PI*45/180; // the horizontal angle with car body

        // front window
        this.frontWindow = new MyQuad(scene, 0, 1, 0, 1);

        // back window
        this.backWindow = new MyQuad(scene, 0, 1, 0, 1);

        // lateral window 1
        this.lateralWindow1 = new MyTrapezium(
            scene, 
            bottom_lenght, 
            top_length,
            height,
            this.frontWindowAngle * 180/Math.PI 
        );

        // lateral window 2
        this.lateralWindow2 = new MyTrapezium(
            scene, 
            bottom_lenght, 
            top_length,
            height,
            this.frontWindowAngle * 180/Math.PI 
        );
        this.lateralWindow2.invert();

        // top 
        this.roofTop = new MyQuad(scene);

        // bottom
        this.roofBottom = new MyQuad(scene);
    };
    
    display(){
        // lateral windows
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.WIDTH);
            this.lateralWindow1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.lateralWindow2.display();
        this.scene.popMatrix();

        // front window
        let fwin_lenght = this.HEIGHT/Math.sin(this.frontWindowAngle);
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.WIDTH/2);
            this.scene.rotate(-this.frontWindowAngle, 0, 0, 1);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.translate(0, fwin_lenght/2, 0);
            this.scene.scale(this.WIDTH, fwin_lenght, 0);
            this.frontWindow.display();
        this.scene.popMatrix();

        // back window
        let backWindowAngle = Math.PI/2 - this.lateralWindow1.getBackEdgeAngle();
        let bwin_lenght = this.lateralWindow1.getBackEdgeLenght();
        this.scene.pushMatrix();
            this.scene.translate(this.BOTTOM_LENGTH, 0, this.WIDTH/2);
            this.scene.rotate(backWindowAngle, 0, 0, 1);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.translate(0, bwin_lenght/2, 0);
            this.scene.scale(this.WIDTH, bwin_lenght, 0);
            this.backWindow.display();
        this.scene.popMatrix();

        // top roof
        this.scene.pushMatrix();
            this.redAppearance.apply();
            this.scene.translate(this.HEIGHT/Math.tan(this.frontWindowAngle) + this.TOP_LENGTH/2, this.HEIGHT, this.WIDTH/2);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(this.TOP_LENGTH, this.WIDTH, 0);
            this.roofTop.display();
        this.scene.popMatrix();

        // bottom
        this.scene.pushMatrix();
            this.scene.translate(this.BOTTOM_LENGTH/2, 0, this.WIDTH/2);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.scale(this.BOTTOM_LENGTH, this.WIDTH, 0);
            this.roofBottom.display();
        this.scene.popMatrix();
    }


};
