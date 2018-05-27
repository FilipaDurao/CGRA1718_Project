/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
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

		// fill vertices and normals array

		var theta = 2.0*Math.PI/this.slices; // external angle
		for(let j = 0; j < this.stacks; j++) {
			for(let i = 0; i < this.slices; i++) {
				// push the vertice twice
				
				this.vertices.push(
					Math.cos(i*theta),
					Math.sin(i*theta),
					j*1.0/this.stacks
				);
				this.normals.push(Math.cos(theta/2.0 + theta*i), Math.sin(theta/2.0 + theta*i), 0);

				//
				this.vertices.push(
					Math.cos((i+1)*theta),
					Math.sin((i+1)*theta),
					j*1.0/this.stacks
				);
				this.normals.push(Math.cos(theta/2.0 + theta*i), Math.sin(theta/2.0 + theta*i), 0);

				//
				this.vertices.push(
					Math.cos(i*theta),
					Math.sin(i*theta),
					(j+1)*1.0/this.stacks
				);
				this.normals.push(Math.cos(theta/2.0 + theta*i), Math.sin(theta/2.0 + theta*i), 0);

				//
				this.vertices.push(
					Math.cos((i+1)*theta),
					Math.sin((i+1)*theta),
					(j+1)*1.0/this.stacks
				);
				this.normals.push(Math.cos(theta/2.0 + theta*i), Math.sin(theta/2.0 + theta*i), 0);

				// add the in
				var a = i*4+j*this.slices*4;
				this.indices.push(a, a+1, a+2);
				this.indices.push(a+1, a+3, a+2);
			}
		}
					
		this.primitiveType=this.scene.gl.TRIANGLES;
				 
		this.initGLBuffers();
	};
};
