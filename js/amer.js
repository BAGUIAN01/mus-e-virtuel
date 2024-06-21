export function Create(
    name,
    opts,
    scn,
    cam,
    ret)
{
    let options     = opts || {} ; 
	let diameter    = options.diameter || 0.5 ; 
    let position    = options.position;
	let visibility  = options.visibility || 1 ;

    const sphere = BABYLON.MeshBuilder.CreateSphere(name, {diameter: diameter}, scn);
    sphere.position = position;
    sphere.visibility = visibility;

    var mat_sphere = new BABYLON.StandardMaterial(name, scn);
    mat_sphere.specularColor = new BABYLON.Color3(0,0,0);
	mat_sphere.diffuseColor = new BABYLON.Color3(0.4, 1, 0.4);
	sphere.material = mat_sphere;

    sphere.actionManager = new BABYLON.ActionManager(scn);

    // Over/Out
	//sphere1.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, sphere1.material, "emissiveColor", sphere1.material.emissiveColor));
    //sphere1.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, sphere1.material, "emissiveColor", BABYLON.Color3.White()));
	//sphere1.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, camera, "position", new BABYLON.Vector3(sphere1.position.x, sphere1.position.y, sphere1.position.z)));
    sphere.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, cam, "position", new BABYLON.Vector3(sphere.position.x, 2.1, sphere.position.z)));

    return sphere;
}
