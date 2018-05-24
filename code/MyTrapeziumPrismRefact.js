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
        this.ANGLE = angle*Math.PI/180;
        this.HEIGHT = height;
        this.LENGTH = length;

        // set texture coordinates
        this.minS = minS || 0;
        this.maxS = maxS || 1;
        this.minT = minT || 0;
        this.maxT = maxT || 1;

        this.initBuffers();
    };
    

    initBuffers() {
        // declaration and empty initialization
        this.vertices = [];
        this.indices = [];
        
        /*
         * fill vertices and indices (trapezium bottom base, parallel to Oxy)
         */
        this.vertices.push(
            -this.BASE_WIDTH/2, -this.LENGTH/2, -this.HEIGHT/2,
            this.BASE_WIDTH/2, -this.LENGTH/2, -this.HEIGHT/2,
            -this.BASE_WIDTH/2, this.LENGTH/2, -this.HEIGHT/2,
            this.BASE_WIDTH/2, this.LENGTH/2, -this.HEIGHT/2
        );
        
        this.indices.push(
            0, 2, 1,
            2, 3, 1
        );
        
           
        /*
         * fill vertices and indices (trapezium top base, parallel to Oxy)
         */
        
        // the starting coordinate, on the -x side, based on the bottom vertice and angle
        let x = -this.BASE_WIDTH/2 + this.HEIGHT*Math.tan(this.ANGLE);
        
        // the top base vertices on the other side, +x
        let y = x + this.TOP_WIDTH;

        this.vertices.push(
            x, -this.LENGTH/2, this.HEIGHT/2,
            y, -this.LENGTH/2, this.HEIGHT/2,
            x, this.LENGTH/2, this.HEIGHT/2,
            y, this.LENGTH/2, this.HEIGHT/2
        );

        // fill indices
        this.indices.push(
            4, 5, 6,
            5, 7, 6
        );
        

        /**
         * Fill indices for laterals, from y perspective
         */
        this.indices.push(
            // from -y perspective
            0, 1, 4, 
            1, 5, 4,
            // from +y perspective
            6, 7, 2,
            7, 3, 2
        );

        /**
         * Fill indices for laterals from x direction
         */
         this.indices.push(
            // from -x perspective
            0, 4, 2,
            4, 6, 2,
            // from +x perspective
            1, 3, 5,
            3, 7, 5
        );
        
        /**
         * Fill texture coordinates
         */
        this.texCoords = [
            this.minS, this.minT,
            this.maxS, this.minT,
            this.minS, this.minT/3,
            this.maxS, this.minT/3,
            this.minS, this.minT/3*2,
            this.maxS, this.minT/3*2,
            this.minS, this.maxT,
            this.maxS, this.maxT
        ];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};