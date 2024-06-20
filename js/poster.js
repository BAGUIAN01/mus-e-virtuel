// Creation d'un poster avec un cadre de description
export function withDescription(
	name,
	parentObject,
	dText,
	posterPosition,
	posterRotation,
	posterParams,
    scene
) {
    const poster = create(name, posterParams, scene);
	poster.position   = posterPosition;
	poster.rotation.y   = posterRotation;
    poster.parent     = parentObject;
	poster.text       = dText
	return poster
}
// Creation d'un poster
export function create(
	nom,
	opts,
	scn)
{
	const f_UV = new Array(6);
	for (let i = 0; i < 6; i++) f_UV[i] = new BABYLON.Vector4(0, 0, 0, 0);
	f_UV[1] = new BABYLON.Vector4(1,0,0,1);

	let options     = opts || {} ; 
	let hauteur     = options.hauteur || 1.0 ; 
	let largeur     = options.largeur || 0.75 ; 	
	let epaisseur   = options.epaisseur || 0.005 ; 	
	let textureName = options.tableau || "./assets/dark_vador.png"; 
	let faceUV      = options.faceUV || f_UV ; 	


	var tableau = BABYLON.MeshBuilder.CreateBox("poster", {width:largeur,height:hauteur,depth:epaisseur,faceUV:faceUV}, scn);
	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau.material = mat;
	tableau.checkCollisions = true;

	return tableau ; 

}