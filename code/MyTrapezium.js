/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject {
    /**
     * Constructor
     * @param {*} scene 
     * @param {*} a The bottom base width
     * @param {*} b The top base width
     * @param {*} height The vertical height
     * @param {*} theta The angle between the left-most vertices of edges 'a' and 'b' (degrees)
     */
	constructor(scene, a, b, height, theta) {
		super(scene);
        
        this.a = a;
        this.b = b;
        this.height = height;
        this.theta = theta*Math.PI/180;

		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [
			0, 0, 0,
			this.a, 0, 0, 
			this.height/Math.tan(this.theta), this.height, 0, 
			this.height/Math.tan(this.theta) + this.b, this.height, 0
		];

		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	invert() {
		this.indices = [
			0, 2, 1,
			1, 2, 3
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

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
};