/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject {
    /**
     * Constructor
     * @param {*} scene 
     * @param {*} base_width The bottom base width
     * @param {*} top_width The top base width
     * @param {*} height The vertical height
     * @param {*} theta The left-most internal angle between top and base
     */
	constructor(scene, base_width, top_width, height, theta) {
		super(scene);
        
        this.base_width = base_width;
        this.top_width = top_width;
        this.height = height;
        this.theta = theta*Math.PI/180;
		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [
			-this.base_width/2, -this.height/2, 0,
			this.base_width/2, -this.height/2, 0, 
			-this.base_width/2 + this.height/Math.tan(this.theta), this.height/2, 0, 
			-this.base_width/2 + this.height/Math.tan(this.theta) + this.top_width, this.height/2, 0
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

	/**
	 * Returns the front edge slane relative to the vertical line (radians)
	 */
	getFrontEdgeAngle() {
		// aux is the horizontal distance between the left-most side vertices
		let aux = this.vertices[0] - this.vertices[6];
		return Math.atan(aux / this.height);
	}

	/**
	 * Returns the back edge slane relative to the vertical line (radians)
	 */
	getBackEdgeAngle() {
		// aux is the horizontal distance between the right-most side vertices
		let aux = this.vertices[3] - this.vertices[9];
		return Math.atan(aux / this.height);
	}

	/**
	 * Returns the lenght of the back edge
	 */
	getBackEdgeLenght() {
		// aux is the horizontal distance between the right-most side vertices
		let aux = this.base_width - this.top_width - this.height/Math.tan(this.theta);
		return Math.sqrt(aux*aux + this.height*this.height);
	}

	/**
	 * Returns the front edge lenght
	 */
	getFrontEdgeLenght() {
		return this.height / Math.sin(this.theta);
	}
};