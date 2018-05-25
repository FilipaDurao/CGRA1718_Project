class RearMirror extends CGFobject {

	constructor(scene){
        super(scene);

		this.redAppearance = new CGFappearance(this.scene);
		this.redAppearance.loadTexture("../textures/red.jpg");
        this.redAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.redAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.redAppearance.setAmbient(0.6, 0.6, 0.6, 1);
        
        this.spaceAppearance = new CGFappearance(this.scene);
		this.spaceAppearance.loadTexture("../textures/galaxy.jpeg");
        this.spaceAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.spaceAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.spaceAppearance.setAmbient(0.6, 0.6, 0.6, 1);

        this.feupAppearance = new CGFappearance(this.scene);
		this.feupAppearance.loadTexture("../textures/feup.jpeg");
        this.feupAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.feupAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.feupAppearance.setAmbient(0.6, 0.6, 0.6, 1);

		this.mirrorAppearance = new CGFappearance(this.scene);
        this.mirrorAppearance.setSpecular(0.95, 0.95, 0.95, 1);
        this.mirrorAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
        this.mirrorAppearance.setAmbient(0.6, 0.6, 0.6, 1);

		this.cylinder = new MyCylinder(this.scene, 30, 30);
        this.semiSphere = new SemiSphere(this.scene, 30, 30);
        this.circle = new MyCircle(this.scene, 30);

    };
    
    display(){
        
		if(this.scene.Texture == 'Red'){
			this.redAppearance.apply();
		}
		else if(this.scene.Texture == 'space'){
			this.spaceAppearance.apply();
		}
		else{
			this.feupAppearance.apply();
		}


		this.scene.pushMatrix();
			this.scene.translate(-1.5, 0, -0.2);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.scene.scale(0.2, 0.2, 0.5);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.semiSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.mirrorAppearance.apply();
			this.circle.display();
		this.scene.popMatrix();



    }
};