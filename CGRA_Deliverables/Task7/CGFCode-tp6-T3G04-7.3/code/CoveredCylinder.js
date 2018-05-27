class CoveredCylinder extends CGFobject
{
	constructor(scene, slices, stacks){
		super(scene);

		// The cylinder Parts
		this.cylinder = new MyCylinder(this.scene, slices, stacks);
		this.circle1 = new MyCircle(this.scene, slices);
		this.circle2 = new MyCircle(this.scene, slices);
	};

	display(){
	
		// First Cylinder cover
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.circle1.display();
        this.scene.popMatrix();

		// Second cylinder cover
        this.scene.pushMatrix();
           this.scene.rotate(Math.PI, 0, 1, 0); 
           this.circle1.display();
        this.scene.popMatrix();

		// The cylinder
        this.cylinder.display();
	};
};
