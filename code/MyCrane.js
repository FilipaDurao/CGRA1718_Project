class MyCrane extends CGFobject {

	constructor(scene){
        super(scene);
        
        this.baseCylinder = new CoveredCylinder(this.scene, 30, 30);

        this.bottomBar = new CoveredCylinder(this.scene, 30, 30);

        this.middleCylinder = new CoveredCylinder(this.scene, 30, 30);

        this.topBar = new CoveredCylinder(this.scene, 30, 30);

        this.cable = new CoveredCylinder(this.scene, 30, 30);
        this.magnet = new CoveredCylinder(this.scene, 30, 30);

        this.car = new MyVehicle(this.scene);

        this.craneAngle = Math.PI/2;
        this.topArmAngle = 0;
        this.bottomArmAngle = Math.PI/3;
        this.bottomBarLength = 10;
        this.topBarLength = 8;
        this.cableLength = 3;
        this.cableRadius = 0.05;

        this.loweringToPickCar = true;
        this.raisingCar = false;
        this.rotatingToDump = false;
        this.loweringCar = false;
        this.raisingCrane = false;
        this.rotatingBack = false;

        this.hasCar = false;
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


    turnCraneToDump(){
        this.craneAngle -= 0.01;
    }

    turnCraneBack(){
        this.craneAngle += 0.01;
    }

    lowerCrane(){
        this.topArmAngle += Math.PI/500;
    }

    raiseCrane(){
        this.topArmAngle -= Math.PI/500;
    }

    performAnimation(){

        if(this.loweringToPickCar){
            this.lowerCrane();

            if (this.topArmAngle < Math.PI/7 + 0.1 && this.topArmAngle > Math.PI/7 - 0.1 ){
                this.loweringToPickCar = false;
                this.raisingCar = true;
                this.hasCar = true;
            }
        }

        if(this.raisingCar){
            this.raiseCrane();

            if (this.topArmAngle < 0.1 && this.topArmAngle > -0.1 ){
                this.raisingCar = false;
                this.rotatingToDump = true;
            }
        }

        if(this.rotatingToDump){
            this.turnCraneToDump();

            if(this.craneAngle < -Math.PI/2 + 0.1 && this.craneAngle > -Math.PI/2 - 0.1){
                this.rotatingToDump = false;
                this.loweringCar = true;
            }
        }
        
        if(this.loweringCar){
          this.lowerCrane();

            if (this.topArmAngle < Math.PI/7 + 0.1 && this.topArmAngle > Math.PI/7 - 0.1 ){
                this.loweringCar = false;
                this.raisingCrane = true;
                this.hasCar = false;
            }
        }

        if(this.raisingCrane){
            this.raiseCrane();

            if (this.topArmAngle < 0.1 && this.topArmAngle > -0.1 ){
                this.raisingCrane = false;
                this.rotatingBack = true;
            }
        }

        if(this.rotatingBack){
            this.turnCraneBack();

            if(this.craneAngle < Math.PI/2 + 0.1 && this.craneAngle > Math.PI/2 - 0.1){
                this.rotatingBack = false;
                this.loweringToPickCar = true;
            }
        }



    }


};