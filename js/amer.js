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

    sphere.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, cam, "position", new BABYLON.Vector3(sphere.position.x, 2.1, sphere.position.z)));

    return sphere;
}
