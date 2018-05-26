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
     * @param {*} angle The slant between the left most vertices of base and top (internal angle in degrees)
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
     * Returns the lenght of the back (-x perspective) face that unites the top and base faces
     */
    getBackPanelLength() {
        // aux is the horizontal distance between the right-most side vertices
        let aux = this.vertices[3*3] - this.vertices[7*3];
        return Math.sqrt(aux * aux + this.HEIGHT * this.HEIGHT);
    }

    /**
     * Returns the lenght of the front (-x perspective) face that unites the top and base faces
     */
    getFrontPanelLength() {
        // aux is the horizontal distance between the left-most side vertices
        let aux = this.vertices[0] - this.vertices[4*3];
        return Math.sqrt(aux * aux + this.HEIGHT * this.HEIGHT);
    }

    /**
     * Returns the slang of the front panel measured from vertical axis
     */
    getFrontPanelAngle() {
        // aux is the horizontal distance between the left-most side vertices
		let aux = this.vertices[0] - this.vertices[4*3];
		return Math.atan(aux / this.HEIGHT);
    }

    /**
     * Returns the slang of the back panel measured from vertical axis
     */
    getBackPanelAngle() {
        let aux = this.vertices[3*3] - this.vertices[7*3];
        return Math.atan(aux/this.HEIGHT);
    }

    /**
     * Initializes vertices, indices and texCoords
     */
    initBuffers() {
        // declaration and empty initialization
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        /*
         * fill vertices, indices and textures (trapezium bottom base, parallel to Oxy)
         */

        this.vertices.push(
            -this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2,
            this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2, 
            -this.BASE_WIDTH / 2, this.LENGTH / 2, -this.HEIGHT / 2,
            this.BASE_WIDTH / 2, this.LENGTH / 2, -this.HEIGHT / 2
        );


        this.indices.push(
            0, 2, 1,
            2, 3, 1
        );

        /*
         * fill vertices, indices and textures (trapezium top base, parallel to Oxy)
         */

        // some pre calculus
        // the starting coordinate, on the -x side, based on the bottom vertice and angle
        let x = -this.BASE_WIDTH / 2 + this.HEIGHT * Math.tan(Math.PI/2 - this.ANGLE);
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
            4, 5, 6,
            5, 7, 6
        );

        /**
         * Fill vertices and indices for laterals, from y perspective
         */

        this.indices.push(
            // from -y perspective
            0, 1, 4,
            1, 5, 4,
            // from +y perspective
            2, 6, 3,
            6, 7, 3
        );

        /**
         * Fill indices for laterals from x direction
         */

        this.indices.push(
            // from -x perspective
            0, 4, 2,
            4, 6, 2,
            // from +x perspective
            1, 3, 7,
            1, 7, 5
        );

        /**
         * Fill texture coordinates
         */

        // these variables are used to determine the 't' and 's' values for each vertice
        // maxT maps to lateral lenght around x axis
        // maxS maps to lateral lenght around y axis
        let dt = (this.maxT - this.minT) / (2 * this.LENGTH + 2 * this.HEIGHT);

        // adding two more vertices to map t=1 on the same vertices with t=0
        this.vertices.push(-this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2,
            this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2
        );

        this.texCoords.push(
            // bottom face vertices
            this.minS, this.minT,
            this.maxS, this.minT,
            this.minS, this.minT + dt * this.LENGTH,
            this.maxS, this.minT + dt * this.LENGTH,

            // top's face vertices
            this.minS, this.minT + dt * (this.LENGTH * 2 + this.HEIGHT),
            this.maxS, this.minT + dt * (this.LENGTH * 2 + this.HEIGHT),
            this.minS, this.minT + dt * (this.LENGTH + this.HEIGHT),
            this.maxS, this.minT + dt * (this.LENGTH + this.HEIGHT),

            this.minS, this.maxT,
            this.maxS, this.maxT
        );


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};