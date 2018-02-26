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

            /* Face // Oyz, x=-0.5 */
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,

            /* Face // Oxz ^ y=-0.5 */
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,

            /* Face // Oxy ^ y=0.5 */
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,

            /* Face // Oxy ^ z=-0.5 */
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,

            /* Face // Oxy ^ z=0.5 */
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5
        ];

        this.indices = [
            /* Face // Oyz, x=0.5 */
            0, 1, 3,
            1, 2, 3,

            /* Face // Oyz, x=-0.5 */
            4, 5, 7,
            5, 6, 7,

            /* Face // Oxz ^ y=-0.5 */
            8, 9, 11,
            9, 10, 11,

            /* Face // Oxz ^ y=0.5 */
            12, 13, 15,
            13, 14, 15,

            /* Face // Oxy ^ z=-0.5 */
            16, 17, 19,
            17, 18, 19,

            /* Face // Oxy ^ z=0.5 */
            20, 21, 23,
            21, 22, 23
        ];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
