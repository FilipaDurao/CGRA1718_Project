/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
        this.vertices = [
            /* Face // Oyz, x=0.5 */
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,

			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5

        ];

        this.indices = [
          0, 1, 2,
          3, 0, 2,

          4, 0, 3,
          3, 7, 4,

          1, 0, 5,
          0, 4, 5,

          6, 4, 7,
          6, 5, 4,

          2, 1, 5,
          5, 6, 2,

          6, 7, 3,
          6, 3, 2

        ];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};