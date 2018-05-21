class Wheel extends CGFobject {
    constructor(scene) {
        super(scene);
        this.circle = new MyCircle(this.scene,30);
        this.circle.initBuffers();
        this.cylinder = new MyCylinder(this.scene,30,30);
        this.cylinder.initBuffers();
        this.semiSphere = new SemiSphere(this.scene,30,30);
        this.semiSphere.initBuffers();

        this.tireAppearance = new CGFappearance(this.scene);
        this.tireAppearance.loadTexture("../textures/tireTexture.jpg");
        this.tireAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tireAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.tireAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.tireSideAppearance = new CGFappearance(this.scene);
        this.tireSideAppearance.loadTexture("../textures/sideTireTexture.jpg");
        this.tireSideAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tireSideAppearance.setDiffuse(1, 1, 1, 1);
        this.tireSideAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.janteAppearance = new CGFappearance(this.scene);
        this.janteAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.janteAppearance.setDiffuse(1, 1, 1, 1);
        this.janteAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.angle = 0;
        this.turnAngle = 0;
        this.RADIOUS = 1;
    }
    
    display() {
    	this.performTurn();
        this.performRotation();

        this.scene.pushMatrix();
        this.tireAppearance.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.tireSideAppearance.apply();
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.janteAppearance.apply();
        this.scene.translate(0, 0, 1);
        this.scene.scale(0.75, 0.75, 0.15)
        this.semiSphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
			this.janteAppearance.apply();
			this.scene.translate(0, 0, 0);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.scale(0.75, 0.75, 0.15)
			this.semiSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.janteAppearance.apply();
			this.scene.translate(0, 0, 0);
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.scale(0.75, 0.75, 0.15)
			this.semiSphere.display();
		this.scene.popMatrix();

    }

    rotateWheel(angle) {
        this.angle += angle;
    }

    turnWheel(turnAngle){    	
    	if(this.turnAngle < 0.3 && this.turnAngle > -0.3){
			this.turnAngle += turnAngle;
    	}
    	
    	if(turnAngle == 0){
    		this.turnAngle -= this.turnAngle/3;
    	}
    }

    performRotation() {
    	this.scene.rotate(this.angle, 0, 0, 1);
    }

    performTurn(){
    	this.scene.rotate(this.turnAngle, 0, 1, 0);
    }

}
;
