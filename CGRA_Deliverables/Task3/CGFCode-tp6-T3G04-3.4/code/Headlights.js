class Headlights extends CGFobject {

	constructor(scene){
        super(scene);

        this.darkRedAppearance = new CGFappearance(this.scene);
		this.darkRedAppearance.loadTexture("../textures/dark_red.jpg");
        this.darkRedAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.darkRedAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.darkRedAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.mirrorAppearance = new CGFappearance(this.scene);
        this.mirrorAppearance.setSpecular(0.95, 0.95, 0.95, 1);
        this.mirrorAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
        this.mirrorAppearance.setAmbient(0.6, 0.6, 0.6, 1);

		this.cylinder = new MyCylinder(this.scene, 30, 30);
        this.semiSphere = new SemiSphere(this.scene, 30, 30);

    };
    
    display(){
        
		this.scene.pushMatrix();
			this.darkRedAppearance.apply();
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.mirrorAppearance.apply();
			this.semiSphere.display();
		this.scene.popMatrix();

    }
};
