import {PRIMS} from './prims.js' ; 
import {Simu}  from './simu.js' ; 
import { Create } from "./amer.js";


class World extends Simu {

	constructor(){
		super() ; 
	}

	requete_http(www, port, requete, foo){
		const entete = "http://" + www + ":" + port + "/" + requete ;
		loadJSON(entete, (res) => {
			const data = JSON.parse(res) ; 
			foo(data) ; 
		}) ;
	} 


	createWorld(data) {
		const scene = this.scene ;
		const camera = this.camera ;
		const boxCamera = this.boxCamera;
		const reticule = this.reticule;
		const currentDescArray = this.currentDescArray;


		const light0 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,1,0), scene);
		const light1 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
		light1.intensity = 0.2 ;

		const light2 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
		light2.intensity = 0.2 ;

		const materiau1 = PRIMS.standardMaterial("mat1",{texture:"./assets/240.jpg"},scene) ; 
		const materiau2 = PRIMS.standardMaterial("mat_sol",{texture:"./assets/marble.jpg",uScale:25,vScale:25},scene);
		const materiau3 = PRIMS.standardMaterial("etoile",{texture:"./assets/mur_etoile.jpg"},scene) ;


		const ciel = PRIMS.sky("ciel",  {}, scene) ; 

		const sol = PRIMS.ground("sol", {materiau:materiau1}, scene) ;
		//const meadow = PRIMS.meadow("prairie", {}, scene);

		const sphere = PRIMS.sphere("sph1", {}, scene) ; 
		const sph    = PRIMS.sphere("sph2", {}, scene);
			sph.position.y = 0.5 ; 
		const sph1 = PRIMS.creuser(sphere,sph);

		
		//Creer hall
		const hall = PRIMS.hall("hall", {}, scene, reticule, camera);

		//Creer mezanine
		const mezanine = PRIMS.mezanine("mezanine", {}, scene);

		//Création de la salle Tatooine
		const salleTatooine = PRIMS.salleTatooine("salle-Tatooine", {}, scene, boxCamera);

		// //Création de la salle Come
		const salleCome = PRIMS.salleCome("salle-Come", {}, scene);

		// //Création de la salle autre
		const salleAutre = PRIMS.salleEtoileDeLaMort("salle-etoile-de-le-mort", {}, scene);

		// //Création escalier
		const escalier = PRIMS.escalier("ecal", {}, scene);

		// teleportation amers

		const amerPositions = [
			new BABYLON.Vector3(4, 2, 10),
			new BABYLON.Vector3(2, 2, 0),
			new BABYLON.Vector3(4, 2, -8),
	  
			new BABYLON.Vector3(10, 2, -12),
		  ];
	  
		amerPositions.forEach((position, index) => {
			const amer = Create(
			  "amer" + index,
			  {
				diameter: 0.5,
				position: position,
				visibility: 0.5,
			  },
			  scene,
			  camera,
			  reticule
			);
		  });

		  // pancarte
		// const renoir = creatPancarte("renoir",{tableau:"../assets/Renoir.jpg", hauteur:1, largeur:2},scene, salleCome, 0, 2, -0.16,0) ;
		


    	}

		




}

export {World}
