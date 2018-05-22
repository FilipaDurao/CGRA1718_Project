class MyCrane extends CGFobject {

	constructor(scene){
        super(scene);
        
        this.baseCylinder = new CoveredCylinder(this.scene, 30, 30);

        this.bottomBar = new CoveredCylinder(this.scene, 30, 30);

        this.middleCylinder = new CoveredCylinder(this.scene, 30, 30);

        this.topBar = new CoveredCylinder(this.scene, 30, 30);

        this.cable = new CoveredCylinder(this.scene, 30, 30);
        this.magnet = new CoveredCylinder(this.scene, 30, 30);

        this.craneAngle = Math.PI/2;
        this.topArmAngle = 0;
        this.bottomArmAngle = Math.PI/3;
        this.bottomBarLength = 10;
        this.topBarLength = 8;
        this.cableLength = 3;
        this.cableRadius = 0.05;

    }

    display(){
        
        // BASE
        this.scene.pushMatrix();
            this.scene.translate(0, 1, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.baseCylinder.display();
        this.scene.popMatrix();

        // BRAÇO INFERIOR
        this.scene.pushMatrix();
            this.scene.translate(0, 0.7, 0);        
            this.scene.rotate(this.craneAngle, 0, 1, 0);
            this.scene.rotate(-this.bottomArmAngle, 1, 0, 0);
            this.scene.scale(1/3, 1/3, this.bottomBarLength);
            this.bottomBar.display();
        this.scene.popMatrix();

        // DOBRADIÇA
        this.scene.pushMatrix();
            this.scene.rotate(this.craneAngle, 0, 1, 0);
            this.scene.translate(0,this.bottomBarLength*Math.sin(this.bottomArmAngle), 
                                   this.bottomBarLength*Math.cos(this.bottomArmAngle));
            this.scene.translate(-0.5, 0.5, 0.4);
            this.scene.rotate(Math.PI/2, 0, 1, 0);                     
            this.scene.scale(0.79, 0.79, 1);
            this.middleCylinder.display();
        this.scene.popMatrix();

        // BRAÇO SUPERIOR
        this.scene.pushMatrix();
            this.scene.rotate(this.craneAngle, 0 ,1, 0);
            this.scene.translate(0,this.bottomBarLength*Math.sin(this.bottomArmAngle), 
                                   this.bottomBarLength*Math.cos(this.bottomArmAngle));
            this.scene.rotate(this.topArmAngle, 1, 0, 0);
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(1/3, 1/3, this.topBarLength);
            this.topBar.display();
        this.scene.popMatrix();

        // CABO
        this.scene.pushMatrix();
            this.scene.rotate(this.craneAngle, 0 ,1, 0);
            this.scene.translate(0,
                                 this.bottomBarLength*Math.sin(this.bottomArmAngle)
                                    - this.topBarLength*Math.sin(this.topArmAngle),
                                 this.bottomBarLength*Math.cos(this.bottomArmAngle)
                                    + this.topBarLength*Math.cos(this.topArmAngle));
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.scale(this.cableRadius, this.cableRadius, this.cableLength);
            this.cable.display();
        this.scene.popMatrix();
        
        // MAGNET
        this.scene.pushMatrix();
            this.scene.rotate(this.craneAngle, 0 ,1, 0);
            this.scene.translate(0,
                                 this.bottomBarLength*Math.sin(this.bottomArmAngle)
                                    - this.topBarLength*Math.sin(this.topArmAngle)
                                    - this.cableLength,
                                 this.bottomBarLength*Math.cos(this.bottomArmAngle)
                                    + this.topBarLength*Math.cos(this.topArmAngle));
            this.scene.scale(1.5, 0.5, 1.5);
            this.scene.translate(0, 1, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.magnet.display();
        this.scene.popMatrix();

    }


    turnCrane(){
       var counter = Math.PI;
       while(counter > 0){
            this.craneAngle -= 0.1;
            counter -= 0.1;
       }
    }

    lowerCrane(){
        while(this.topArmAngle < Math.PI/5){
            this.topArmAngle += Math.PI/20;
       }
    }

    raiseCrane(){
        while(this.topArmAngle > 0){
            this.topArmAngle -= Math.PI/20;
       }
    }


};