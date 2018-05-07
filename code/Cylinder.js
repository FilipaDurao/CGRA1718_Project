/**
 * Cylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class Cylinder extends CGFobject
{
	constructor(scene, slices, stacks){
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers(){
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		// External angle
		var theta = 2.0*Math.PI/this.slices;

		for(let i = 0; i <= this.slices; i++) {
			for(let j = 0; j <= this.stacks; j++) {
				this.vertices.push(Math.cos(theta*i), Math.sin(theta*i), j/this.stacks);
				this.normals.push(Math.cos(theta*i),Math.sin(theta*i),0);
				this.texCoords.push(i*1/this.slices, j*1/this.stacks);
			}
		}

		for (let i = 0; i < this.slices; ++i) {
			for(let j = 0; j < this.stacks; ++j) {
				this.indices.push(
					(i+1)*(this.stacks+1) + j, i*(this.stacks+1) + j+1, i*(this.stacks+1) + j,
					i*(this.stacks+1) + j+1, (i+1)*(this.stacks+1) + j, (i+1)*(this.stacks+1) + j+1
				);
			}
		}

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	};
};
