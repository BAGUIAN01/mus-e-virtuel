// Creation d'un mesh
export function create(
	nom,
	opts,
	mesh_filename,
	position,
	rots,
	hitbox_opt,
	hitbox_offset,
	hitbox_isVisible,
	scn)
{
	let name             = nom || "mesh";
	let options          = opts || {} ; 
	let asset_url        = options.asset_url || "./assets/meshs/" ; 
	let scale            = options.scale || 1 ; 
	let hitbox_options   = hitbox_opt || 	{largeur: 5, hauteur:5, profondeur:5};
	let rotations        = rots || 	{x: 0, y:0, z:0};

	var assetsManager = new BABYLON.AssetsManager(scn);

	var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);

	meshTask.onSuccess = function (task) {
		var mesh = task.loadedMeshes[0];
		mesh.rotation.x = rotations.x;
		mesh.rotation.y = rotations.y;
		mesh.rotation.z = rotations.z;
		mesh.name = name;
		mesh.position = position;
		mesh.scaling.scaleInPlace(scale);
		const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox",hitbox_options, scn);
		hitbox.parent = mesh;
		hitbox.position = hitbox_offset; 
		hitbox.checkCollisions = true;
		hitbox.isVisible = hitbox_isVisible;
	}
	assetsManager.load();
}

export function withDescription(
	nom,
	dText,
	opts,
	mesh_filename,
	position,
	rots,
	hitbox_opt,
	hitbox_offset,
	hitbox_isVisible,
	scn)
{
	let name             = nom || "mesh";
	let options          = opts || {} ; 
	let asset_url        = options.asset_url || "./assets/meshs/" ; 
	let scale            = options.scale || 1 ; 
	let hitbox_options   = hitbox_opt || 	{largeur : 5, hauteur:5, profondeur:5};
	let rotations        = rots || 	{x: 0, y:0, z:0};
	let text = dText;

	var assetsManager = new BABYLON.AssetsManager(scn);

	var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);

	meshTask.onSuccess = function (task) {
		var mesh = task.loadedMeshes[0];
		mesh.rotation.x = rotations.x;
		mesh.rotation.y = rotations.y;
		mesh.rotation.z = rotations.z;
		mesh.name = name;
		mesh.position = position;
		mesh.scaling.scaleInPlace(scale);
		const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox_desc",hitbox_options, scn);
		hitbox.parent = mesh;
		hitbox.position = hitbox_offset; 
		hitbox.checkCollisions = true;
		if (hitbox_isVisible) hitbox.visibility = 1;
		else hitbox.visibility = 0.0;
		hitbox.text = text;

	}
	assetsManager.load();
}


// Creation d'un mesh
export function withRotationAnimation(
	nom,
	opts,
	mesh_filename,
	position,
	rots,
	hitbox_opt,
	hitbox_offset,
	hitbox_isVisible,
	rot_anim,
	scn)
{
	let name             = nom || "mesh";
	let options          = opts || {} ; 
	let asset_url        = options.asset_url || "./assets/meshs/" ; 
	let scale            = options.scale || 1 ; 
	let hitbox_options   = hitbox_opt || 	{largeur : 5, hauteur:5, profondeur:5};
	let rotations        = rots || 	{x: 0, y:0, z:0};
	let rotation_animation= rot_anim || 	{rot_x :0, rot_y:0, rot_z:0};


	var assetsManager = new BABYLON.AssetsManager(scn);

	var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);

	meshTask.onSuccess = function (task) {
		var mesh = task.loadedMeshes[0];
		mesh.rotation.x = rotations.x;
		mesh.rotation.y = rotations.y;
		mesh.rotation.z = rotations.z;
		mesh.name = name;
		mesh.position = position;
		mesh.scaling.scaleInPlace(scale);
		const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox_desc",hitbox_options, scn);
		hitbox.parent = mesh;
		hitbox.position = hitbox_offset; 
		hitbox.checkCollisions = true;
		if (hitbox_isVisible) hitbox.visibility = 1;
		else hitbox.visibility = 0.0;


		scn.registerBeforeRender(function () {
			mesh.rotation.x = mesh.rotation.x + rotation_animation.rot_x;
			mesh.rotation.y = mesh.rotation.y + rotation_animation.rot_y;
			mesh.rotation.z = mesh.rotation.z + rotation_animation.rot_z;
		});
	}
	assetsManager.load();
}

export function withAnimationAndDescription(
	nom,
	dText,
	opts,
	mesh_filename,
	position,
	rots,
	hitbox_opt,
	hitbox_offset,
	hitbox_isVisible,
	rot_anim,
	scn)
{
	let name             = nom || "mesh";
	let options          = opts || {} ; 
	let asset_url        = options.asset_url || "./assets/meshs/" ; 
	let scale            = options.scale || 1 ; 
	let hitbox_options   = hitbox_opt || 	{largeur : 5, hauteur:5, profondeur:5};
	let rotations        = rots || 	{x: 0, y:0, z:0};
	let rotation_animation= rot_anim || 	{rot_x :0, rot_y:0, rot_z:0};
	let text = dText;

	var assetsManager = new BABYLON.AssetsManager(scn);

	var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);

	meshTask.onSuccess = function (task) {
		var mesh = task.loadedMeshes[0];
		mesh.rotation.x = rotations.x;
		mesh.rotation.y = rotations.y;
		mesh.rotation.z = rotations.z;
		mesh.name = name;
		mesh.position = position;
		mesh.scaling.scaleInPlace(scale);
		const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox_desc",hitbox_options, scn);
		hitbox.parent = mesh;
		hitbox.position = hitbox_offset; 
		hitbox.checkCollisions = true;
		if (hitbox_isVisible) hitbox.visibility = 1;
		else hitbox.visibility = 0.0;
		hitbox.text = text;


		scn.registerBeforeRender(function () {
			mesh.rotation.x = mesh.rotation.x + rotation_animation.rot_x;
			mesh.rotation.y = mesh.rotation.y + rotation_animation.rot_y;
			mesh.rotation.z = mesh.rotation.z + rotation_animation.rot_z;
		});
	}
	assetsManager.load();
}

export function TurningYoda(
	nom,
	opts,
	mesh_filename,
	position,
	rots,
	hitbox_opt,
	hitbox_offset,
	hitbox_isVisible,
	scn)
{
	let name             = nom || "mesh";
	let options          = opts || {} ; 
	let asset_url        = options.asset_url || "./assets/meshs/" ; 
	let scale            = options.scale || 1 ; 
	let hitbox_options   = hitbox_opt || 	{largeur: 5, hauteur:5, profondeur:5};
	let rotations        = rots || 	{x: 0, y:0, z:0};

	const points = []; //list of track points
	points.push(position); 
	points.push(position.x + 10); 
	points.push(position.z + 7); 
	points.push(position.x - 10); 
	points.push(points[0]);

	BABYLON.MeshBuilder.CreateLines("square", {points: points}); //draw track

	const slide = function (turn, dist) { //after covering dist apply turn
		this.turn = turn;
		this.dist = dist;
	}

	const track = [];
	track.push(new slide(-Math.PI/2, 10));
	track.push(new slide(-Math.PI/2, 10+7));
	track.push(new slide(-Math.PI/2, 10+7+10));
	track.push(new slide(-Math.PI/2, 10+7+10+7));


	let distance = 0;
	let step = 0.03;
	let i = 0;

	var assetsManager = new BABYLON.AssetsManager(scn);

	var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);


	meshTask.onSuccess = function (task) {
		var mesh = task.loadedMeshes[0];
		mesh.rotation.x = rotations.x;
		mesh.rotation.y = rotations.y;
		mesh.rotation.z = rotations.z;
		mesh.name = name;
		mesh.position = position;
		mesh.scaling.scaleInPlace(scale);
		const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox",hitbox_options, scn);
		hitbox.parent = mesh;
		hitbox.position = hitbox_offset; 
		hitbox.checkCollisions = true;
		hitbox.isVisible = hitbox_isVisible;

		scn.onBeforeRenderObservable.add(() => {
			mesh.movePOV(0, 0, -step);
			//mesh2.movePOV(0, 0, -step);
			distance += step;
				
			if (distance > track[i].dist) {        
				mesh.rotate(BABYLON.Axis.Y, track[i].turn, BABYLON.Space.LOCAL);
				//mesh2.rotate(BABYLON.Axis.Y, track[i].turn, BABYLON.Space.LOCAL);
				i +=1;
				i %= track.length;
				if (i === 0) {
					distance = 0;
					mesh.position = position; //reset to initial conditions
					mesh.rotation = BABYLON.Vector3.Zero();//prevents error accumulation
					// mesh2.position = new BABYLON.Vector3(-10, 8, -5); //reset to initial conditions
					// mesh2.rotation = BABYLON.Vector3.Zero();
				}
			}
		});

		
	}
	assetsManager.load();
}

export function levitationMode(
    nom,
    opts,
    mesh_filename,
    position,
    rots,
    hitbox_opt,
    hitbox_offset,
    hitbox_isVisible,
	vitesse,
	circonférence_cercle,
    scn)
{
    let name             = nom || "mesh";
    let options          = opts || {} ; 
    let asset_url        = options.asset_url || "./assets/meshs/" ; 
    let scale            = options.scale || 1 ; 
    let hitbox_options   = hitbox_opt || {largeur: 5, hauteur: 5, profondeur: 5};
    let rotations        = rots || {x: 0, y: 0, z: 0};
	let speed_object	 = vitesse;

    let angle = 0; // angle initial pour le mouvement circulaire
    let radius = circonférence_cercle; // rayon du cercle
    let speed = speed_object; // vitesse de rotation sur le cercle
    let rotationSpeed = 0.02; // vitesse de rotation sur lui-même

    var assetsManager = new BABYLON.AssetsManager(scn);
    var meshTask  = assetsManager.addMeshTask("task", "", asset_url, mesh_filename);

    meshTask.onSuccess = function (task) {
        var mesh = task.loadedMeshes[0];
        mesh.rotation.x = rotations.x;
        mesh.rotation.y = rotations.y;
        mesh.rotation.z = rotations.z;
        mesh.name = name;
        mesh.position = position;
        mesh.scaling.scaleInPlace(scale);
        const hitbox = BABYLON.MeshBuilder.CreateBox("hitbox", hitbox_options, scn);
        hitbox.parent = mesh;
        hitbox.position = hitbox_offset; 
        hitbox.checkCollisions = true;
        hitbox.isVisible = hitbox_isVisible;

        scn.onBeforeRenderObservable.add(() => {
            // Calculer la nouvelle position
            angle += speed;
            mesh.position.x = position.x + radius * Math.cos(angle);
            mesh.position.z = position.z + radius * Math.sin(angle);
            mesh.position.y = position.y; // Maintenir la hauteur constante

            // Appliquer la rotation continue sur lui-même
            mesh.rotation.x += rotationSpeed; // Rotation autour de l'axe X
            mesh.rotation.y += rotationSpeed; // Rotation autour de l'axe Y
            mesh.rotation.z += rotationSpeed; // Rotation autour de l'axe Z

            // Réinitialiser l'angle pour éviter les valeurs trop grandes
            if (angle >= 2 * Math.PI) {
                angle -= 2 * Math.PI;
            }
        });
    };

    assetsManager.load();
}