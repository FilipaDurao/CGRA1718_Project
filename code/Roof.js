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
        this.scene.pushMatrix();
            let length = this.HEIGHT/Math.sin(this.frontWindowAngle);
            this.scene.translate(0, 0, this.WIDTH/2);
            this.scene.rotate(-this.frontWindowAngle, 0, 0, 1);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.translate(0, length/2, 0);
            this.scene.scale(this.WIDTH, length, 0);
            this.frontWindow.display();
        this.scene.popMatrix();
    }


};
