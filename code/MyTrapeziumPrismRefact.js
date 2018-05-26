/**
 * MyTrapeziumPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapeziumPrismA extends CGFobject {
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

    constructor(scene, base_width, top_width, angle, height, length, minS, maxS, minT, maxT) {
        super(scene);
        // set some constants that define the trapezium prism properties
        this.BASE_WIDTH = base_width;
        this.TOP_WIDTH = top_width;
        this.ANGLE = angle * Math.PI / 180;
        this.HEIGHT = height;
        this.LENGTH = length;

        // set texture coordinates
        this.minS = minS || 0;
        this.maxS = maxS || 1;
        this.minT = minT || 0;
        this.maxT = maxT || 1;

        this.initBuffers();
    };

    /**
	 * Returns the lenght of the back side (-x perspective) face that unites the top and base faces
	 */
    getBackEdgeLenght() {
        // aux is the horizontal distance between the right-most side vertices
        let aux = this.BASE_WIDTH - this.TOP_WIDTH - this.HEIGHT/Math.tan(this.ANGLE);
        return Math.sqrt(aux*aux + this.HEIGHT*this.HEIGHT);
    }

    initBuffers() {
        // declaration and empty initialization
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        /*
         * fill vertices, indices and textures (trapezium bottom base, parallel to Oxy)
         */

        // Note: the vertices are duplicated 3 times, because each vertice is intersected by 3 edges from 3 faces, thus it's needed for applying textures
        for (let i = 0; i < 4; i++)
            this.vertices.push(-this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2);
        for (let i = 0; i < 2; i++)
            this.vertices.push(this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2);
        for (let i = 0; i < 2; i++)
            this.vertices.push(-this.BASE_WIDTH / 2, this.LENGTH / 2, -this.HEIGHT / 2);

        this.vertices.push(this.BASE_WIDTH / 2, this.LENGTH / 2, -this.HEIGHT / 2);

        this.indices.push(
            0, 6, 4,
            6, 8, 4
        );

        /*
         * fill vertices, indices and textures (trapezium top base, parallel to Oxy)
         */

        // some pre calculus
        // the starting coordinate, on the -x side, based on the bottom vertice and angle
        let x = -this.BASE_WIDTH / 2 + this.HEIGHT * Math.tan(this.ANGLE);
        // the top base vertices on the other side, +x
        let y = x + this.TOP_WIDTH;

        this.vertices.push(
            x, -this.LENGTH / 2, this.HEIGHT / 2,
            y, -this.LENGTH / 2, this.HEIGHT / 2,
            x, this.LENGTH / 2, this.HEIGHT / 2,
            y, this.LENGTH / 2, this.HEIGHT / 2
        );

        // fill indices
        this.indices.push(
            9, 10, 11,
            10, 12, 11
        );

        /**
         * Fill vertices and indices for laterals, from y perspective
         */

        this.indices.push(
            // from -y perspective
            0, 4, 9,
            4, 10, 9,
            // from +y perspective
            6, 11, 12,
            8, 6, 12
        );

        /**
         * Fill indices for laterals from x direction
         */

        this.indices.push(
            // from -x perspective
            0, 9, 6,
            9, 11, 6,
            // from +x perspective
            4, 8, 12,
            4, 12, 10
        );

        /**
         * Fill texture coordinates
         */

        // these variables are used to determine the 't' and 's' values
        // maxT matches a coordinate 2*this.LENGTH + 2*this.HEIGHT
        // maxS matches a coordinate 
        let slangLenght1 = this.HEIGHT/Math.sin(this.ANGLE); // the lenght of face that unites bottom and top bases
        let slangLenght2 = this.getBackEdgeLenght();
        let dt = this.maxT / (2 * this.LENGTH + 2 * this.HEIGHT);
        let ds = this.maxS / (this.BASE_WIDTH + slangLenght1 + slangLenght2 + this.TOP_WIDTH);

        this.texCoords.push(
            // the first 4 vertices it's where all starts and all ends
            this.minS, this.minT,
            //this.maxS, this.minT,
            //this.minS, this.maxT,
            //this.maxS, this.maxT,
            this.minS, this.minT,
            this.minS, this.minT,
            this.minS, this.minT,

            this.minS + ds * this.BASE_WIDTH, this.minT,
            this.minS + ds * this.BASE_WIDTH, this.maxT,

            this.minS, this.minT + dt * this.LENGTH,
            this.maxS, this.minT + dt * this.LENGTH,

            this.minS + ds * this.BASE_WIDTH, this.minT + dt * this.LENGTH
        );

        this.texCoords.push(
            this.maxS - ds * Math.abs(x), this.maxT - dt * this.LENGTH,
            this.minS + ds * (this.BASE_WIDTH+Math.abs(x)), this.maxT - dt * this.LENGTH,
            this.maxS - ds * Math.abs(x), this.maxT - dt * (this.LENGTH + this.HEIGHT),
            this.minS + ds * (this.BASE_WIDTH+Math.abs(x)), this.maxT - dt * (this.LENGTH + this.HEIGHT)
        );

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};