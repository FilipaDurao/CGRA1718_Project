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
     * Returns the lenght of the back (-x perspective) face that unites the top and base faces
     */
    getBackEdgeLenght() {
        // aux is the horizontal distance between the right-most side vertices
        let aux = this.vertices[4] - this.vertices[10];
        return Math.sqrt(aux * aux + this.HEIGHT * this.HEIGHT);
    }

    /**
     * Returns the lenght of the front (-x perspective) face that unites the top and base faces
     */
    getFrontEdgeLenght() {
        // aux is the horizontal distance between the left-most side vertices
        let aux = this.vertices[0] - this.vertices[9];
        return Math.sqrt(aux * aux + this.HEIGHT * this.HEIGHT);
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

        // Note: the vertices are duplicated 3 times, because each vertice is intersected by 3 edges from 3 faces, thus it's needed for applying textures
        for (let i = 0; i < 1; i++)
            this.vertices.push(-this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2);
        for (let i = 0; i < 1; i++)
            this.vertices.push(this.BASE_WIDTH / 2, -this.LENGTH / 2, -this.HEIGHT / 2);
        for (let i = 0; i < 1; i++)
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

        // these variables are used to determine the 't' and 's' values for each vertice
        // maxT maps to lateral lenght around x axis
        // maxS maps to lateral lenght around y axis
        let dt = (this.maxT - this.minT) / (2 * this.LENGTH + 2 * this.HEIGHT);
        let ds = (this.maxS - this.minS) / (this.BASE_WIDTH + this.getBackEdgeLenght() + this.getFrontEdgeLenght() + this.TOP_WIDTH);
        console.log(this.getBackEdgeLenght());
        console.log(this.getFrontEdgeLenght());
        console.log(ds);
        this.texCoords.push(
            // the first 4 vertices it's where all starts and all ends
            this.minS, this.minT,
            //this.maxS, this.minT,
            //this.minS, this.maxT,
            //this.maxS, this.maxT,

            // second group of vertices is also part of the axis where t starts and ends
            this.minS + ds * this.BASE_WIDTH, this.minT,
            //this.minS + ds * this.BASE_WIDTH, this.maxT,

            // the next vertices are part of the axis where s starts and ends
            this.minS, this.minT + dt * this.LENGTH,
            //this.maxS, this.minT + dt * this.LENGTH,

            // last vertice from base face
            this.minS + ds * this.BASE_WIDTH, this.minT + dt * this.LENGTH,

            // top's face vertices
            this.minS + ds * (this.BASE_WIDTH + this.getBackEdgeLenght() + this.TOP_WIDTH), this.minT + dt * (this.LENGTH * 2 + this.HEIGHT),
            this.minS + ds * (this.BASE_WIDTH + this.getBackEdgeLenght()), this.minT + dt * (this.LENGTH * 2 + this.HEIGHT),
            this.minS + ds * (this.BASE_WIDTH + this.getBackEdgeLenght() + this.TOP_WIDTH), this.minT + dt * (this.LENGTH + this.HEIGHT),
            this.minS + ds * (this.BASE_WIDTH + this.getBackEdgeLenght()), this.minT + dt * (this.LENGTH + this.HEIGHT)
        );

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};