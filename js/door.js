
export function CreateDoor(
	name,
	opts,
	scn)

{
	let options     = opts || {} ; 
	let hauteur     = options.hauteur || 3 ; 
	let largeur     = options.largeur || 2 ; 	
	let epaisseur   = options.epaisseur || 0.1 ;


	var porte = BABYLON.MeshBuilder.CreateBox(name, {width:largeur,height:hauteur,depth:epaisseur}, scn);
	porte.checkCollisions = true;

	return porte;
}

export function SlidingDoor(
	name,
	positionDoor,
	rotationDoor,
	paramDoor,
	boxCamera,
	scn)
{
	var door = CreateDoor(name, paramDoor, scn);
	door.position = positionDoor;
	door.rotation.y = rotationDoor;


	//Ouverture et fermeture de la porte
	door.actionManager = new BABYLON.ActionManager(scn);

	let ouverture =	new BABYLON.InterpolateValueAction(
		{
			trigger : BABYLON.ActionManager.OnIntersectionEnterTrigger,
			parameter : {
				mesh : boxCamera
			}
		},
		door,
		'position.z',
		positionDoor.z-2,
		1000,
	);

	let fermeture =	new BABYLON.InterpolateValueAction(
		{
			trigger : BABYLON.ActionManager.OnIntersectionExitTrigger,
			parameter : {
				mesh : boxCamera
			}
		},
		door,
		'position.z',
		positionDoor.z,
		1000,
	);

	door.actionManager.registerAction(ouverture);
	door.actionManager.registerAction(fermeture);


	return door;
}