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
        this.texCoords = [];

        /*
         * fill vertices, indices and textures (trapezium bottom base, parallel to Oxy)
         */

        // Note: the vertices are duplicated 3 times, because each vertice is intersected by 3 edges from 3 faces, thus it's needed for applying textures
        for(let i=0; i < 3; i++) 
            this.vertices.push(-this.BASE_WIDTH/2, -this.LENGTH/2, -this.HEIGHT/2);
        for(let i=0; i < 3; i++) 
            this.vertices.push(this.BASE_WIDTH/2, -this.LENGTH/2, -this.HEIGHT/2);
        for(let i=0; i < 3; i++) 
            this.vertices.push(-this.BASE_WIDTH/2, this.LENGTH/2, -this.HEIGHT/2);
        for(let i=0; i < 3; i++) 
            this.vertices.push(this.BASE_WIDTH/2, this.LENGTH/2, -this.HEIGHT/2);
        
        this.indices.push(
            0, 6, 3,
            6, 9, 3
        );

        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.minS, this.minT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS/2, this.minT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.minS, this.maxT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS/2, this.maxT);
           
        /*
         * fill vertices, indices and textures (trapezium top base, parallel to Oxy)
         */

        // some pre calculus
        // the starting coordinate, on the -x side, based on the bottom vertice and angle
        let x = -this.BASE_WIDTH/2 + this.HEIGHT*Math.tan(this.ANGLE);
        // the top base vertices on the other side, +x
        let y = x + this.TOP_WIDTH;

        for(let i=0; i < 3; i++) 
            this.vertices.push(x, -this.LENGTH/2, this.HEIGHT/2);
        for(let i=0; i < 3; i++) 
            this.vertices.push(y, -this.LENGTH/2, this.HEIGHT/2);
        for(let i=0; i < 3; i++)
            this.vertices.push(x, this.LENGTH/2, this.HEIGHT/2);   
        for(let i=0; i < 3; i++)
            this.vertices.push(y, this.LENGTH/2, this.HEIGHT/2);

        // fill indices
        this.indices.push(
            12, 15, 18,
            15, 21, 18
        );

        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS - Math.abs(x)/this.maxS, this.minT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS/2 + Math.abs(x)/this.maxS, this.minT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS - Math.abs(x)/this.maxS, this.maxT);
        for(let i=0; i < 3; i++) 
            this.texCoords.push(this.maxS/2 + Math.abs(x)/this.maxS, this.maxT);
        

        /**
         * Fill vertices and indices for laterals, from y perspective
         */
        this.indices.push(
            // from -y perspective
            0, 3, 12, 
            3, 15, 12,
            // from +y perspective
            21, 9, 6,
            6, 18, 21
        );

        /**
         * Fill indices for laterals from x direction
         */
         this.indices.push(
            // from -x perspective
            0, 12, 6,
            12, 18, 6,
            // from +x perspective
            3, 9, 21,
            21, 15, 3
        );
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};