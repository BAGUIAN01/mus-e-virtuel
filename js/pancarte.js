import * as MESH from "./mesh.js";
export default function createPancarte(nom,opts,scn, mur, x, y, z, angle){

	let options = opts || {} ; 
	let hauteur = options["hauteur"] || 2.0 ; 
	let largeur = options["largeur"] || 2.0 ; 	
	let textureName = options["tableau"] || ""; 

	var group = new BABYLON.TransformNode("group-"+nom)
	var cadre = BABYLON.MeshBuilder.CreatePlane("cadre", {width:largeur+0.4,height:hauteur+0.4}, scn);
	cadre.parent = group ; 
	cadre.position.y = hauteur/2.0 ;
	//cadre.position.z = 0.05;
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, {width:largeur,height:hauteur}, scn);
	tableau1.parent = group ; 
	tableau1.position.y = hauteur/2.0 ; 
	cadre.position.z = 0.01;

	var mat2 = new BABYLON.StandardMaterial("tex-cadre", scn);
	mat2.diffuseTexture = new BABYLON.Texture("assets/cadre.png", scn);
	cadre.material = mat2;

	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;

	group.parent = mur; // on accroche le tableau à la cloison 
	group.position.x = x;
	group.position.y = y; 
	group.position.z = z-0.1; 
	group.rotation.y = angle ;


	return group ; 

}