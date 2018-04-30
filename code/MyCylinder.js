/**
 * MyCylinder 
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];

		this.indices = [];

		this.normals = [];

		// External angle
		var theta = 2.0*Math.PI/this.slices; 
		
		// Fill vertices
		for(let i = 0; i <= this.stacks; i++) {
			for(let j = 0; j < this.slices; j++) {
				this.vertices.push(Math.cos(theta*j), Math.sin(theta*j), i/this.stacks);
				this.normals.push(Math.cos(theta*j),Math.sin(theta*j),0);
			} 
		}

		// Fill indices
		for(let i = 0; i < this.stacks; i++) {
			for(let j = 0; j < this.slices; j++) {
				this.indices.push(
					this.slices*i + j,
					this.slices*i + (j+1)%(this.slices),
					this.slices*(i + 1) + j
				);

				this.indices.push(
					this.slices*i + (j+1)%(this.slices),
					this.slices*(i + 1) + (j+1)%(this.slices),
					this.slices*(i + 1) + j
				);
			}
			
			
		}

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	};
};