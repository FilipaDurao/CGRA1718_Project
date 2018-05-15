/**
 * MyTrapeziumPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapeziumPrism extends CGFobject {
    /*      TOP WIDTH
         **************     \
        *angle          *   \ HEIGHT
       ******************** \
            BASE_WIDTH
    */
    
    /**
     * 
     * @param {*} scene The scene
     * @param {*} base_width 
     * @param {*} top_width 
     * @param {*} angle The slant between the left most vertices of base and top (degrees)
     * @param {*} height
     * @param {*} length 
     */

    //https://www.buzzle.com/images/diagrams/trapezoidal-prism.jpg

	constructor(scene, base_width, top_width, angle, height, length) {
        super(scene);
        // set some constants that define the trapezium prism properties
        this.BASE_WIDTH = base_width;
        this.TOP_WIDTH = top_width;
        this.ANGLE = angle*Math.PI/180;
        this.HEIGHT = height;
        this.LENGTH = length;

        // init 2D solids
        // 2 trapeziums, for the sides, and 4 planes for base, top, front and back
        this.lateralTrapezium1 = new MyTrapezium(scene, base_width, top_width, height, angle);
        this.lateralTrapezium2 = new MyTrapezium(scene, base_width, top_width, height, angle);
        this.basePlane = new Plane(scene);
        this.topPlane = new Plane(scene);
        this.frontPlane = new Plane(scene);
        this.backPlane = new Plane(scene);
    };
    
	getFrontEdgeAngle() {
		return this.theta;
	}

	getBackEdgeAngle() {
		// aux is the horizontal distance between the right-most side vertices
		let aux = this.a - this.b - this.height/Math.tan(this.theta);
		return Math.atan(this.height / aux);
	}

	getBackEdgeLenght() {
		// aux is the horizontal distance between the right-most side vertices
		let aux = this.a - this.b - this.height/Math.tan(this.theta);
		return Math.sqrt(aux*aux + this.height*this.height);
    }
    
    display(){
        // lateral trapeziums
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.LENGTH);
            this.lateralTrapezium1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.lateralTrapezium2.invert(); // changes the orientation
            this.lateralTrapezium2.display();
        this.scene.popMatrix();

        // base panel
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH/2, 0, this.LENGTH/2);
            this.scene.scale(this.BASE_WIDTH, 0, this.LENGTH);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.basePlane.display();
        this.scene.popMatrix();

        // top panel
        let x = this.HEIGHT/Math.tan(this.ANGLE); // the horizontal distance from base and top plane
        this.scene.pushMatrix();
            this.scene.translate(x + this.TOP_WIDTH/2, this.HEIGHT, this.LENGTH/2);
            this.scene.scale(this.TOP_WIDTH, 0, this.LENGTH);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.topPlane.display();
        this.scene.popMatrix();
        
        // front panel
        let front_slane_lenght = this.lateralTrapezium1.getFrontEdgeLenght();
        this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2 + this.ANGLE, 0, 0, 1);
            this.scene.translate(0, front_slane_lenght/2, this.LENGTH/2);
            this.scene.scale(0, front_slane_lenght, this.LENGTH);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.frontPlane.display();
        this.scene.popMatrix();


        let back_slane_lenght = this.lateralTrapezium1.getBackEdgeLenght();
        let back_slane_angle = this.lateralTrapezium1.getBackEdgeAngle();
        this.scene.pushMatrix();
            this.scene.translate(this.BASE_WIDTH, 0, this.LENGTH/2);
            this.scene.rotate(back_slane_angle, 0, 0, 1);
            this.scene.translate(0, back_slane_lenght/2, 0);
            this.scene.scale(0, back_slane_lenght, this.LENGTH);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.backPlane.display();
        this.scene.popMatrix();
    }
};