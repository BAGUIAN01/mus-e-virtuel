import * as POSTER from "./poster.js";
import * as MESH from "./mesh.js";
import * as DOOR from "./door.js";
import * as AMER from "./amer.js";

function creerScene() {
  var scn = new BABYLON.Scene(engine);
  scn.gravity = new BABYLON.Vector3(0, -9.8, 0);
  scn.collisionsEnabled = true;
  return scn;
}

function creerCamera(name, options, scn, currentDescArray) {
  // console.log("creation camera");
  // Création de la caméra
  // =====================

  //default point
  const camera = new BABYLON.UniversalCamera(
    name,
    new BABYLON.Vector3(10, 2.1, 5),
    scn
  );
  camera.setTarget(new BABYLON.Vector3(0.0, 0.7, 0.0));

  //spawn in tatooine
  // const camera = new BABYLON.UniversalCamera(name, new BABYLON.Vector3(-10, 3, -10), scn);
  // camera.setTarget(new BABYLON.Vector3(80, 0.7, -10));

  //spawn in come
  // const camera = new BABYLON.UniversalCamera(name,new BABYLON.Vector3(-2,1.7,0),scn) ;
  // camera.setTarget(new BABYLON.Vector3(-80,0.7,0)) ;

  //spawn in death star
  // const camera = new BABYLON.UniversalCamera(name,new BABYLON.Vector3(-2,1.7,10),scn) ;
  // camera.setTarget(new BABYLON.Vector3(-150,0.7,10)) ;

  //spawn in mezanine
  // const camera = new BABYLON.UniversalCamera(name, new BABYLON.Vector3(-3, 8.7, -10), scn);
  // camera.setTarget(new BABYLON.Vector3(-2, 0.7, 50));

  camera.minZ = 0.05;
  camera.checkCollisions = true;
  camera.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
  camera.applyGravity = true;
  camera.keysUp = [90, 38];
  camera.keysDown = [40, 83];
  camera.keysLeft = [81, 37];
  camera.keysRight = [68, 39];
  camera.inertia = 0.01;
  camera.angularSensibility = 1000;
  camera.speed = options.speed;

  function castRay() {
    var origin = camera.position;
    var direction = camera.getDirection(BABYLON.Vector3.Backward());
    var length = 5;

    var ray = new BABYLON.Ray(origin, direction, length);

    var hit = scn.pickWithRay(ray);

    if (hit.pickedMesh) {
      if (
        hit.pickedMesh.name == "poster" ||
        hit.pickedMesh.name == "hitbox_desc"
      ) {
        //|| (hit.pickedMesh.name == "hitbox")
        if (!currentDescArray.includes(hit.pickedMesh)) {
          currentDescArray.add(hit.pickedMesh);
          showModal(hit.pickedMesh.text);
        }
      } else {
        if (!currentDescArray.isEmpty()) {
          cancelTyping();
          hideModal();
          currentDescArray.clear();
        }
        console.log(hit.pickedMesh.name);
      }
    }
  }

  scn.registerBeforeRender(function () {
    castRay();
  });

  return camera;
}

function creerBoxcamera(name, opt, scn, cam) {
  const boxCamera = BABYLON.MeshBuilder.CreateSphere(
    "boite_camera",
    { diameter: 10 },
    scn
  );
  boxCamera.checkCollisions = true;
  boxCamera.parent = cam;

  return boxCamera;
}

function creerReticule(nom, opts, scn, cam) {
  //const reticule = BABYLON.MeshBuilder.CreateSphere("reticule", {segments:20, diameter: 0.05}, scn);
  const reticule = BABYLON.MeshBuilder.CreateCylinder(
    "reticule",
    { height: 10, diameter: 0.02 },
    scn
  );
  const retMat = new BABYLON.StandardMaterial("reticuleMat", scn);
  retMat.emissiveColor = BABYLON.Color3.Red();
  retMat.specularColor = BABYLON.Color3.Black();
  retMat.diffuseColor = BABYLON.Color3.Black();
  reticule.material = retMat;
  reticule.isPickable = false;
  reticule.isVisible = true;
  reticule.parent = cam;
  reticule.position.z = -6;
  reticule.rotation.x = Math.PI / 2;
  return reticule;
}

function creerCiel(nom, options, scene) {
  const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scene);
  skyMaterial.backFaceCulling = false;
  skyMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "./assets/skybox/skybox",
    scene
  );
  skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  const skyBox = BABYLON.Mesh.CreateBox("skybox", 100, scene);
  skyBox.material = skyMaterial;

  return skyBox;
}

function creerSol(name, options, scn) {
  options = options || {};
  const width = options.largeur || 100.0;
  const height = options.profondeur || width;

  const subdivisions = Math.round(width / 10);

  let materiau = options.materiau || null;

  const sol = BABYLON.MeshBuilder.CreateGround(
    name,
    { width, height, subdivisions },
    scn
  );

  if (materiau) {
    sol.material = materiau;
  } else {
    materiau = new BABYLON.StandardMaterial("materiau-defaut-" + name, scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 0.8, 0.6);
    sol.material = materiau;
  }

  sol.checkCollisions = true;

  return sol;
}

function creerPrairie(name, options, scn) {
  let sol = BABYLON.Mesh.CreateGround(name, 220.0, 220.0, 2.0, scn);
  sol.checkCollisions = true;
  sol.material = new BABYLON.StandardMaterial("blanc", scn);
  // sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
  sol.material.diffuseTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn
  );
  sol.material.specularTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn
  );
  sol.material.emissiveTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn
  );
  sol.material.ambientTexture = new BABYLON.Texture(
    "./assets/textures/grass.png",
    scn
  );
  sol.material.diffuseTexture.uScale = 10.0;
  sol.material.diffuseTexture.vScale = 10.0;
  sol.material.specularTexture.uScale = 10.0;
  sol.material.specularTexture.vScale = 10.0;
  sol.material.emissiveTexture.uScale = 10.0;
  sol.material.emissiveTexture.vScale = 10.0;
  sol.material.ambientTexture.uScale = 10.0;
  sol.material.ambientTexture.vScale = 10.0;
  sol.receiveShadows = true;
  sol.metadata = { type: "ground" };
  return sol;
}

function creerMateriauStandard(nom, options, scn) {
  let couleur = options.couleur || null;
  let texture = options.texture || null;
  let uScale = options.uScale || 1.0;
  let vScale = options.vScale || 1.0;

  let materiau = new BABYLON.StandardMaterial(nom, scn);
  if (couleur != null) materiau.diffuseColor = couleur;
  materiau.specularColor = new BABYLON.Color3(0, 0, 0);
  if (texture != null) {
    materiau.diffuseTexture = new BABYLON.Texture(texture, scn);
    materiau.diffuseTexture.uScale = uScale;
    materiau.diffuseTexture.vScale = vScale;
  }
  return materiau;
}

function creerSphere(nom, opts, scn) {
  let options = opts || {};
  let diametre = opts.diametre || 1.0;
  let materiau = opts.materiau || null;

  if (materiau == null) {
    materiau = new BABYLON.StandardMaterial("blanc", scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  }

  let sph = BABYLON.Mesh.CreateSphere(nom, 16, diametre, scn);
  sph.material = materiau;

  return sph;
}

function creerBoite(nom, opts, scn) {
  let options = opts || {};
  let width = options.largeur || 1.0;
  let height = options.hauteur || 1.0;
  let depth = options.profondeur || 1.0;
  let materiau = options.materiau || null;
  let faceUV = options.faceUV || null;
  let faceColors = options.faceColors;

  if (materiau == null) {
    materiau = new BABYLON.StandardMaterial("blanc", scn);
    materiau.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  }

  let box = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width, height, depth, faceUV: faceUV, faceColors: faceColors },
    scn
  );
  box.material = materiau;
  box.checkCollisions = true;

  return box;
}

function creerPoster(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options["hauteur"] || 1.0;
  let largeur = options["largeur"] || 1.0;
  let textureName = options["tableau"] || "";

  var group = new BABYLON.TransformNode("group-" + nom);
  var tableau1 = BABYLON.MeshBuilder.CreatePlane(
    "tableau-" + nom,
    { width: largeur, height: hauteur },
    scn
  );
  var verso = BABYLON.MeshBuilder.CreatePlane(
    "verso-" + nom,
    { width: largeur, height: hauteur },
    scn
  );
  tableau1.parent = group;
  tableau1.position.z = -0.01;
  verso.parent = group;
  verso.rotation.y = Math.PI;

  var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
  mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
  tableau1.material = mat;

  tableau1.checkCollisions = true;

  return group;
}

function creerCloison(nom, opts, scn) {
  let options = opts || {};
  let hauteur = options.hauteur || 3.0;
  let largeur = options.largeur || 5.0;
  let epaisseur = options.epaisseur || 0.1;
  let faceUV = options.faceUV;

  let materiau =
    options.materiau || new BABYLON.StandardMaterial("materiau-pos" + nom, scn);

  let groupe = new BABYLON.TransformNode("groupe-" + nom);

  let cloison = BABYLON.MeshBuilder.CreateBox(
    nom,
    { width: largeur, height: hauteur, depth: epaisseur, faceUV: faceUV },
    scn
  );
  cloison.material = materiau;
  cloison.parent = groupe;
  cloison.position.y = hauteur / 2.0;
  cloison.checkCollisions = true;
  //cloison.checkCollisions = false;

  return groupe;
}

function creerHall(nom, opts, scn, ret, cam) {
  let scene = scn;
  let reticule = ret;
  let camera = cam;

  const black_tile = PRIMS.standardMaterial("black-tile", scene);
  const text_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_diff_1k.jpg",
    scene
  );
  const bump_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_nor_gl_1k.jpg",
    scene
  );
  black_tile.bumpTexture = bump_hall;
  black_tile.diffuseTexture = text_hall;
  const spec_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_disp_1k.jpg",
    scene
  );
  black_tile.specularTexture = spec_hall;
  black_tile.ambientTexture = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_ao_1k.jpg",
    scene
  );
  black_tile.roughness = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_rough_1k.jpg",
    scene
  );

  const white_tile = PRIMS.standardMaterial("white-tile", scene);
  const text2_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_disp_1k.jpg",
    scene
  );
  const bump2_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_nor_gl_1k.jpg",
    scene
  );
  white_tile.bumpTexture = bump2_hall;
  white_tile.diffuseTexture = text2_hall;
  const spec2_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_disp_1k.jpg",
    scene
  );
  white_tile.specularTexture = spec2_hall;
  white_tile.ambientTexture = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_ao_1k.jpg",
    scene
  );
  white_tile.roughness = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_rough_1k.jpg",
    scene
  );

  const white_short_tile = PRIMS.standardMaterial("white-tile", scene);
  const text2_short_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_disp_1k.jpg",
    scene
  );
  const bump2_short_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_nor_gl_1k.jpg",
    scene
  );
  white_short_tile.bumpTexture = bump2_short_hall;
  white_short_tile.diffuseTexture = text2_short_hall;
  const spec2_short_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_disp_1k.jpg",
    scene
  );
  white_short_tile.specularTexture = spec2_short_hall;
  const ambient2_short_hall = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_ao_1k.jpg",
    scene
  );
  white_short_tile.ambientTexture = ambient2_short_hall;
  white_short_tile.roughness = new BABYLON.Texture(
    "./assets/rubber_tiles_1k/rubber_tiles_rough_1k.jpg",
    scene
  );
  text2_short_hall.uScale = 2;
  text2_short_hall.vScale = 0.5;
  bump2_short_hall.uScale = 2;
  bump2_short_hall.vScale = 0.5;
  spec2_short_hall.uScale = 2;
  spec2_short_hall.vScale = 0.5;
  ambient2_short_hall.uScale = 2;
  ambient2_short_hall.vScale = 0.5;

  const murNord = PRIMS.box(
    "wall-n",
    { largeur: 30.1, hauteur: 5, profondeur: 0.1 },
    scene
  );
  murNord.position = new BABYLON.Vector3(0.1, 2.5, 0);
  murNord.rotation.y = Math.PI / 2;

  const murSud = PRIMS.box(
    "wall-s",
    { largeur: 30.1, hauteur: 10, profondeur: 0.1, materiau: white_tile },
    scene
  );
  murSud.position = new BABYLON.Vector3(15, 5, 0);
  murSud.rotation.y = Math.PI / 2;

  const murEst = PRIMS.wall(
    "wall-e",
    { largeur: 15.1, hauteur: 10, materiau: white_tile },
    scene
  );
  murEst.position = new BABYLON.Vector3(7.5, 0, -15.1);

  const murOuest = PRIMS.wall(
    "wall-o",
    { largeur: 15.1, hauteur: 10, materiau: white_tile },
    scene
  );
  murOuest.position = new BABYLON.Vector3(7.5, 0, 15.1);

  const sol = PRIMS.wall(
    "sol",
    { largeur: 15.1, hauteur: 30.1, materiau: black_tile },
    scene
  );
  sol.position = new BABYLON.Vector3(7.5, 0, -15.05);
  sol.rotation.x = Math.PI / 2;

  const plafond = PRIMS.wall(
    "plafond",
    { largeur: 15.1, hauteur: 30.1, materiau: white_tile },
    scene
  );
  plafond.position = new BABYLON.Vector3(7.5, 10, -15.05);
  plafond.rotation.x = Math.PI / 2;

  const portePrincipale = PRIMS.box(
    "portePrincipale",
    { largeur: 4, hauteur: 6, profondeur: 5 },
    scene
  );
  portePrincipale.position = new BABYLON.Vector3(15, 1.5, 0);
  portePrincipale.rotation.y = Math.PI / 2;

  const porteSalle1 = PRIMS.box(
    "porte1",
    { largeur: 2, hauteur: 3, profondeur: 5 },
    scene
  );
  porteSalle1.position = new BABYLON.Vector3(-1, 1.5, -10);
  porteSalle1.rotation.y = Math.PI / 2;

  const porteSalle2 = creerBoite(
    "porte2",
    { largeur: 2, hauteur: 3, profondeur: 5 },
    scene
  );
  porteSalle2.position = new BABYLON.Vector3(-1, 1.5, 0);
  porteSalle2.rotation.y = Math.PI / 2;

  const porteSalle3 = creerBoite(
    "porte3",
    { largeur: 2, hauteur: 3, profondeur: 5 },
    scene
  );
  porteSalle3.position = new BABYLON.Vector3(-1, 1.5, 10);
  porteSalle3.rotation.y = Math.PI / 2;

  const ouverturePrincipale = creuser(murSud, portePrincipale);
  const ouvertureSalle1 = creuser(murNord, porteSalle1);
  ouvertureSalle1.checkCollisions = true;
  const ouvertureSalle2 = creuser(ouvertureSalle1, porteSalle2);
  ouvertureSalle2.checkCollisions = true;
  const ouvertureSalle3 = creuser(ouvertureSalle2, porteSalle3);

  ouverturePrincipale.material = white_tile;
  ouvertureSalle3.material = white_short_tile;

  ouverturePrincipale.checkCollisions = true;
  ouvertureSalle3.checkCollisions = true;

  MESH.create(
    "stair",
    { scale: 1.8 },
    "industrial_stair-left.glb",
    new BABYLON.Vector3(8.5, -0.6, -12.4),
    { x: 0, y: Math.PI / 2, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.create(
    "grass",
    { scale: 0.5 },
    "realtime_grass.glb",
    new BABYLON.Vector3(8, 0, 12),
    { x: 0, y: Math.PI, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 3, 0.5),
    false,
    scene
  );

  MESH.create(
	"tree",
	{ scale: 0.25 },
    "tree_gn.glb",
    new BABYLON.Vector3(11, 0, 12),
    { x: 0, y: Math.PI, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 3, 0.5),
    false,
    scene
  );

  MESH.create(
    "yoda_levitation",
    { scale: 0.02 },
    "master_yoda.glb",
    new BABYLON.Vector3(8, 0, 10),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 3, 0.5),
    false,
    scene
  );

  var levitation_ls = MESH.levitationMode(
    "lightsaber",
    { scale: 0.1 },
    "lightsaber_ana.glb",
    new BABYLON.Vector3(8, 3.5, 8.5),
    { x: 0, y: 0, z: 0 },
    { width: 0.25, height: 0.25, depth: 0.25 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    0.02, //vitesse objet le long de l'axe
    0.01, //radius
    scene
  );

  var levitation_helmet2 = MESH.levitationMode(
    "helmet2",
    { scale: 0.01 },
    "scout_helmet.glb",
    new BABYLON.Vector3(7, 3, 10),
    { x: 0, y: 0, z: 0 },
    { width: 0.25, height: 0.25, depth: 0.25 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    0.01, //vitesse objet le long de l'axe
    0.01, //radius
    scene
  );

  const barrier1 = PRIMS.box("barrier1", {
    largeur: 0.1,
    hauteur: 10,
    profondeur: 10,
  });
  barrier1.position = new BABYLON.Vector3(5, 5, -12);
  barrier1.rotation.y = Math.PI / 2;
  barrier1.checkCollisions = true;
  barrier1.isVisible = false;

  const barrier2 = PRIMS.box("barrier2", {
    largeur: 0.1,
    hauteur: 3,
    profondeur: 27,
  });
  barrier2.position = new BABYLON.Vector3(0, 6, 1.5);
  barrier2.checkCollisions = true;
  barrier2.isVisible = false;

  const barrier3 = PRIMS.box("barrier3", {
    largeur: 0.1,
    hauteur: 3,
    profondeur: 5,
  });
  barrier3.position = new BABYLON.Vector3(-3, 6, -12);
  barrier3.checkCollisions = true;
  barrier3.isVisible = false;

  //Create amer
  var amerCome = AMER.Create(
    "amerCome",
    { diameter: 0.5, position: new BABYLON.Vector3(5, 1, 0), visibility: 0.5 },
    scene,
    camera,
    reticule
  );

  var amerTatooine1 = AMER.Create(
    "amerObiwan",
    {
      diameter: 0.5,
      position: new BABYLON.Vector3(-12, 1, -8),
      visibility: 0.5,
    },
    scene,
    camera,
    reticule
  );
}

function creerMezanine(nom, opts, scn) {
  let scene = scn;

  const mossy_rock = PRIMS.standardMaterial("black-tile", scene);
  const text_rock = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_diff_1k.jpg",
    scene
  );
  const bump_rock = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_nor_gl_1k.jpg",
    scene
  );
  mossy_rock.bumpTexture = bump_rock;
  mossy_rock.diffuseTexture = text_rock;
  const spec_rock = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_disp_1k.jpg",
    scene
  );
  mossy_rock.specularTexture = spec_rock;
  mossy_rock.ambientTexture = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_ao_1k.jpg",
    scene
  );
  mossy_rock.roughness = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_rough_1k.jpg",
    scene
  );
  text_rock.uScale = 2;
  text_rock.vScale = 0.5;
  bump_rock.uScale = 2;
  bump_rock.vScale = 0.5;
  spec_rock.uScale = 2;
  spec_rock.vScale = 0.5;

  const mossy_rock_plafond = PRIMS.standardMaterial("black-tile", scene);
  const text_rock_plafond = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_diff_1k.jpg",
    scene
  );
  const bump_rock_plafond = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_nor_gl_1k.jpg",
    scene
  );
  mossy_rock_plafond.bumpTexture = bump_rock_plafond;
  mossy_rock_plafond.diffuseTexture = text_rock_plafond;
  const spec_rock_plafond = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_disp_1k.jpg",
    scene
  );
  mossy_rock_plafond.specularTexture = spec_rock_plafond;
  mossy_rock_plafond.ambientTexture = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_ao_1k.jpg",
    scene
  );
  mossy_rock_plafond.roughness = new BABYLON.Texture(
    "./assets/mossy_rock_1k/mossy_rock_rough_1k.jpg",
    scene
  );
  text_rock_plafond.uScale = 2;
  text_rock_plafond.vScale = 5;
  bump_rock_plafond.uScale = 2;
  bump_rock_plafond.vScale = 5;
  spec_rock_plafond.uScale = 2;
  spec_rock_plafond.vScale = 5;

  const sand_tatooine = PRIMS.standardMaterial("sand_tatooine", scene);
  const text_sand = new BABYLON.Texture(
    "./assets/baseball_playground/baseball_playground_diff_1k.jpg",
    scene
  );
  sand_tatooine.diffuseTexture = text_sand;

  const murNord = PRIMS.wall(
    "wall-2",
    { largeur: 30.1, hauteur: 5, materiau: mossy_rock },
    scene
  );
  murNord.position = new BABYLON.Vector3(-15, 5, 0);
  murNord.rotation.y = Math.PI / 2;

  const murEst = PRIMS.wall(
    "wall-i",
    { largeur: 15.1, hauteur: 5, materiau: mossy_rock },
    scene
  );
  murEst.position = new BABYLON.Vector3(-7.5, 5, -15.1);

  const murOuest = PRIMS.wall(
    "wall-3",
    { largeur: 15.1, hauteur: 5, materiau: mossy_rock },
    scene
  );
  murOuest.position = new BABYLON.Vector3(-7.5, 5, 15.1);

  const plafond = PRIMS.wall("wall", {
    largeur: 15.1,
    hauteur: 30.1,
    materiau: mossy_rock_plafond,
  });
  plafond.position = new BABYLON.Vector3(-7.5, 10, -15.05);
  plafond.rotation.x = Math.PI / 2;

  const sol = PRIMS.wall("wall", {
    largeur: 15.1,
    hauteur: 30.1,
    materiau: mossy_rock_plafond,
  });
  sol.position = new BABYLON.Vector3(-7.5, 5.05, -15.05);
  sol.rotation.x = Math.PI / 2;

  var cube = MESH.TurningMesh(
    "yoda",
    { scale: 0.05 },
    "baby_yoda.glb",
    new BABYLON.Vector3(-3, 4.8, 4),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  const poster1 = POSTER.withDescription(
    "poster1",
    murNord,
    "Here is the house of Yoda. Yoda was living in a little hutt in Dagobah a secluded swampy planet, filled with a rich, biodiverse ecosystem.  ",
    new BABYLON.Vector3(-12, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/yoda_house.jpeg", hauteur: 3, largeur: 4 },
    scene
  );

  const poster2 = POSTER.withDescription(
    "poster2",
    murNord,
    "Yoda is one of the most powerful and revered Jedi Masters in the history of the Jedi Order. Known for his wisdom, knowledge of the Force, and skills in lightsaber combat, Yoda served as the Grand Master of the Jedi Order for many years.",
    new BABYLON.Vector3(-5, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/yoda.jpeg", hauteur: 3, largeur: 4 },
    scene
  );

  const poster3 = POSTER.withDescription(
    "poster3",
    murNord,
    "Luke Skywalker is a student of Yoda and represents a new hope for the Jedi Order and the galaxy at large.",
    new BABYLON.Vector3(12, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/luke.jpg", hauteur: 3, largeur: 4 },
    scene
  );

  const poster4 = POSTER.withDescription(
    "poster4",
    murOuest,
    "This picture represente a famous scene in Star Wars. Thanks to the force Luke was looking at the gost of 3 dead Jedi: his father, yoda, and Obiwan.",
    new BABYLON.Vector3(0, 2.5, -0.1),
    0,
    { tableau: "./assets/gost.jpeg", hauteur: 3, largeur: 7 },
    scene
  );

  const pancarte1 = POSTER.withDescription(
    "pancarte1",
    murNord,
    "Here is the house of Yoda. Yoda was living in a little hutt in Dagobah a secluded swampy planet, filled with a rich, biodiverse ecosystem.  ",
    new BABYLON.Vector3(-1, 1.5, -10),
    Math.PI,
    { tableau: "../assets/yoda_house.jpeg", hauteur: 3, largeur: 4 },
    scene
    );


}

// creation de la salle tatooine
function creerSalleTatooine(nom, opts, scn, bc) {
  let scene = scn;
  let boxCamera = bc;

  const mat_tatooine = PRIMS.standardMaterial("mat_tatooine", scene);
  const text_tatooine = new BABYLON.Texture(
    "./assets/sandy_gravel/sandy_gravel_diff_1k.png",
    scene
  );
  const bump_tatooine = new BABYLON.Texture(
    "./assets/sandy_gravel/sandy_gravel_nor_gl_1k.png",
    scene
  );
  mat_tatooine.bumpTexture = bump_tatooine;
  mat_tatooine.diffuseTexture = text_tatooine;
  const spec_tatooine = new BABYLON.Texture(
    "./assets/sandy_gravel/sandy_gravel_disp_1k.png",
    scene
  );
  mat_tatooine.specularTexture = spec_tatooine;
  mat_tatooine.roughness = new BABYLON.Texture(
    "./assets/sandy_gravel/sandy_gravel_rough_1k.png",
    scene
  );

  const sand_tatooine = PRIMS.standardMaterial("sand_tatooine", scene);
  const text_sand = new BABYLON.Texture(
    "./assets/baseball_playground/baseball_playground_diff_1k.jpg",
    scene
  );
  const bump_sand = new BABYLON.Texture(
    "./assets/baseball_playground/baseball_playground_nor_gl_1k.jpg",
    scene
  );
  sand_tatooine.bumpTexture = bump_sand;
  sand_tatooine.diffuseTexture = text_sand;
  sand_tatooine.useParallax = true;
  sand_tatooine.useParallaxOcclusion = true;
  sand_tatooine.parallaxScaleBias = 0.5;
  sand_tatooine.roughness = new BABYLON.Texture(
    "./assets/baseball_playground/baseball_playground_rough_1k.jpg",
    scene
  );
  text_sand.uScale = 2;
  text_sand.vScale = 2;
  bump_sand.uScale = 2;
  bump_sand.vScale = 2;

  const mat_door = PRIMS.standardMaterial("mat_door", scene);
  const text_door = new BABYLON.Texture(
    "./assets/concrete_wall_008_1k/concrete_wall_008_disp_1k.jpg",
    scene
  );
  const bump_door = new BABYLON.Texture(
    "./assets/concrete_wall_008_1k/concrete_wall_008_nor_gl_1k.jpg",
    scene
  );
  mat_door.bumpTexture = bump_door;
  mat_door.diffuseTexture = text_door;
  const spec_door = new BABYLON.Texture(
    "./assets/concrete_wall_008_1k/concrete_wall_008_disp_1k.jpg",
    scene
  );
  mat_door.specularTexture = spec_door;
  const ambient_door = new BABYLON.Texture(
    "./assets/concrete_wall_008_1k/concrete_wall_008_ao_1k.jpg",
    scene
  );
  mat_door.ambientTexture = ambient_door;
  mat_door.roughness = new BABYLON.Texture(
    "./assets/concrete_wall_008_1k/concrete_wall_008_rough_1k.jpg",
    scene
  );

  const murNord = PRIMS.wall(
    "wall-2",
    { largeur: 10.1, hauteur: 5, materiau: mat_tatooine },
    scene
  ); //2
  murNord.position = new BABYLON.Vector3(-15, 0, -10.1);
  murNord.rotation.y = Math.PI / 2;

  //[TO DO] : fixed materiau mur sud
  const murSud = PRIMS.box(
    "wall-3",
    { largeur: 10.1, hauteur: 5, profondeur: 0.1 },
    scene
  ); //4
  murSud.position = new BABYLON.Vector3(0, 2.5, -10.1);
  murSud.rotation.y = Math.PI / 2;

  const murEst = PRIMS.wall(
    "wall-i",
    { largeur: 15, hauteur: 5, materiau: mat_tatooine },
    scene
  );
  murEst.position = new BABYLON.Vector3(-7.5, 0, -15.1);

  const murOuest = PRIMS.wall(
    "wall-3",
    { largeur: 15, hauteur: 5, epaisseur: 0.1, materiau: mat_tatooine },
    scene
  ); //1
  murOuest.position = new BABYLON.Vector3(-7.5, 0, -5.1);

  const plafond = PRIMS.wall(
    "plafond",
    { largeur: 15.1, hauteur: 10.1, materiau: mat_tatooine },
    scene
  );
  plafond.position = new BABYLON.Vector3(-7.5, 5, -15.15);
  plafond.rotation.x = Math.PI / 2;

  const sol = PRIMS.wall(
    "sol",
    { largeur: 15.1, hauteur: 10.1, materiau: sand_tatooine },
    scene
  );
  sol.position = new BABYLON.Vector3(-7.5, 0, -15.15);
  sol.rotation.x = Math.PI / 2;

  const porteSalle1 = PRIMS.box("porte1", { largeur: 2, hauteur: 3 }, scene);
  porteSalle1.position = new BABYLON.Vector3(0, 1.5, -10);
  porteSalle1.rotation.y = Math.PI / 2;

  const ouvertureSalle1 = creuser(murSud, porteSalle1);
  ouvertureSalle1.material = mat_tatooine;
  ouvertureSalle1.checkCollisions = true;

  MESH.create(
    "clay_pot",
    { scale: 1 },
    "clay_pot1.glb",
    new BABYLON.Vector3(-14, 0, -6),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.create(
    "clay_pot",
    { scale: 1.2 },
    "clay_pot1.glb",
    new BABYLON.Vector3(-14.5, 0, -5.5),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.create(
    "clay_pot",
    { scale: 1 },
    "clay_pot1.glb",
    new BABYLON.Vector3(-14, 0, -14.5),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.create(
    "clay_pot",
    { scale: 1.2 },
    "clay_pot1.glb",
    new BABYLON.Vector3(-14.5, 0, -14),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.create(
    "clay_pot",
    { scale: 1.4 },
    "clay_pot1.glb",
    new BABYLON.Vector3(-14.5, 0, -14.5),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );

  MESH.withDescription(
    "eopie",
    "This is an eopie. It's an animal to travel in the desert of Tatooine. Like a camel.",
    { scale: 1 },
    "eopie_star_wars_texture.glb",
    new BABYLON.Vector3(-13, 0, -13),
    { x: 0, y: 0, z: 0 },
    { width: 1, height: 3, depth: 2.5 },
    new BABYLON.Vector3(0, 0.5, 0.5),
    false,
    scene
  );

  MESH.withAnimationAndDescription(
    "building",
    "This is a typical Tatooine House ",
    { scale: 0.1 },
    "tatooine_styled_house_v2.glb",
    new BABYLON.Vector3(-7, 1.5, -10),
    { x: 0, y: 0, z: 0 },
    { width: 11, height: 8, depth: 11 },
    new BABYLON.Vector3(-1, 2.5, 0),
    false,
    { rot_x: 0, rot_y: 0.003, rot_z: 0 },
    scene
  );

  MESH.create(
    "top_barrel",
    { scale: 3 },
    "star_wars_tatooine_barrel_top.glb",
    new BABYLON.Vector3(-6.6, -0.48, -10.02),
    { x: 0, y: 0, z: 0 },
    { width: 0.5, height: 0.5, depth: 0.5 },
    new BABYLON.Vector3(0, 0.5, 0),
    false,
    scene
  );
  const support_building = PRIMS.box(
    "support1",
    { largeur: 1.3, hauteur: 2.5, profondeur: 1.3, materiau: mat_tatooine },
    scene
  );
  support_building.position = new BABYLON.Vector3(-7, 0, -10);

  const poster1 = POSTER.withDescription(
    "Tatooine_landscape",
    murNord,
    "Typical Tatooine landscape. There is an house, dome-shaped building complex that appears to be constructed from the same sand-colored material as the surrounding desert, suggesting that it's well-integrated into the environment. There is also piece of various mechanical structures ",
    new BABYLON.Vector3(0, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/tatooine_1.jpg", hauteur: 3, largeur: 7 },
    scene
  );

  const cadre_out_poster_1 = PRIMS.box(
    "cadre1",
    { largeur: 7.2, hauteur: 3.2, profondeur: 0.1 },
    scene
  );
  cadre_out_poster_1.position = new BABYLON.Vector3(-14.9, 2.5, -10.1);
  cadre_out_poster_1.rotation.y = Math.PI / 2;

  const cadre_in_poster_1 = PRIMS.box(
    "cadre1",
    { largeur: 7, hauteur: 3, profondeur: 0.2 },
    scene
  );
  cadre_in_poster_1.position = new BABYLON.Vector3(-14.9, 2.5, -10.1);
  cadre_in_poster_1.rotation.y = Math.PI / 2;

  const cadre_poster_1 = creuser(cadre_out_poster_1, cadre_in_poster_1);

  const poster2 = POSTER.withDescription(
    "poster2",
    murOuest,
    "The planet of Tatooine is composed about TWO moon !",
    new BABYLON.Vector3(0, 2.5, -0.1),
    0,
    { tableau: "./assets/tatooine_moon.png", hauteur: 3, largeur: 2.5 },
    scene
  );

  const poster3 = POSTER.withDescription(
    "poster3",
    murOuest,
    "You are now looking at Obiwan. A strong and famous jedi, who was the master of Anakin and Luke Skywalker",
    new BABYLON.Vector3(-5, 2.5, -0.1),
    0,
    { tableau: "./assets/obiwan.jpg", hauteur: 3, largeur: 2.5 },
    scene
  );

  const poster4 = POSTER.withDescription(
    "poster4",
    murOuest,
    "Here is the planet of Tatooine ",
    new BABYLON.Vector3(5, 2.5, -0.1),
    0,
    { tableau: "./assets/planet.png", hauteur: 3, largeur: 2.5 },
    scene
  );

  const poster5 = POSTER.withDescription(
    "Tatooine_dune",
    murEst,
    "A vast desert landscape with rolling sand dunes, under a clear blue sky. A solitary figure in a cloak stands in the foreground, inspired from the Jawas. Some small habitants of Tatooine.",
    new BABYLON.Vector3(-1, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/jawas.png", hauteur: 3, largeur: 2.5 },
    scene
  );

  const poster6 = POSTER.withDescription(
    "Tatooine_market",
    murEst,
    "An image inspired by Tatooine market. A futuristic architecture, along with various alien species wandering and interacting in the streets, creates a lively and culturally diverse atmosphere.",
    new BABYLON.Vector3(3, 2.5, 0.1),
    Math.PI,
    { tableau: "./assets/tatooine_market.png", hauteur: 3, largeur: 2.5 },
    scene
  );

  const doorT = DOOR.SlidingDoor(
    "Tatooine Door",
    new BABYLON.Vector3(0.05, 1.5, -10),
    Math.PI / 2,
    { width: 2, height: 3, depth: 0.05 },
    boxCamera,
    scene
  );
  doorT.material = mat_door;

  const doorC = DOOR.SlidingDoor(
    "Come Door",
    new BABYLON.Vector3(0.05, 1.5, 0),
    Math.PI / 2,
    { width: 2, height: 3, depth: 0.05 },
    boxCamera,
    scene
  );
  doorC.material = mat_door;

  const doorB = DOOR.SlidingDoor(
    "Black Door",
    new BABYLON.Vector3(0.05, 1.5, 10),
    Math.PI / 2,
    { width: 2, height: 3, depth: 0.05 },
    boxCamera,
    scene
  );
  doorB.material = mat_door;
}

// creation de la salle du lac de come
function creerSalleCome(nom, opts, scn) {
  let scene = scn;

  const murNord = PRIMS.wall(
    "wall-2",
    { largeur: 10.1, hauteur: 5, epaisseur: 0.1 },
    scene
  );
  murNord.position.x = -15;
  murNord.rotation.y = Math.PI / 2;

  const murSud = PRIMS.box(
    "wall-3",
    { largeur: 10.1, hauteur: 5, profondeur: 0.1 },
    scene
  );
  murSud.position = new BABYLON.Vector3(0, 2.5, 0);
  murSud.rotation.y = Math.PI / 2;

  const murEst = PRIMS.wall(
    "wall-i",
    { largeur: 15, hauteur: 5, epaisseur: 0.1 },
    scene
  );
  murEst.position = new BABYLON.Vector3(-7.5, 0, -5);

  const murOuest = PRIMS.wall(
    "wall-3",
    { largeur: 15, hauteur: 5, epaisseur: 0.1 },
    scene
  );
  murOuest.position = new BABYLON.Vector3(-7.5, 0, 5);

  const plafond = PRIMS.wall(
    "plafond",
    { largeur: 15.1, hauteur: 10.1 },
    scene
  );
  plafond.position = new BABYLON.Vector3(-7.5, 5, -5.05);
  plafond.rotation.x = Math.PI / 2;

  const porteSalle2 = creerBoite(
    "porte2",
    { largeur: 2, hauteur: 3, profondeur: 5 },
    scene
  );
  porteSalle2.position = new BABYLON.Vector3(-1, 1.5, 0);
  porteSalle2.rotation.y = Math.PI / 2;

  const ouvertureSalle2 = creuser(murSud, porteSalle2);
  ouvertureSalle2.checkCollisions = true;
}

// creation de la salle 1
function creerSalleEtoileDeLaMort(nom, opts, scn) {
  let scene = scn;

  const murNord = PRIMS.wall("wall-2", { largeur: 10.1, hauteur: 5 }, scene);
  murNord.position = new BABYLON.Vector3(-15, 0, 10.1);
  murNord.rotation.y = Math.PI / 2;

  const murSud = PRIMS.box(
    "wall-3",
    { largeur: 10.1, hauteur: 5, profondeur: 0.1 },
    scene
  );
  murSud.position = new BABYLON.Vector3(0, 2.5, 9.95);
  murSud.rotation.y = Math.PI / 2;

  const murEst = PRIMS.wall("wall-i", { largeur: 15, hauteur: 5 }, scene);
  murEst.position = new BABYLON.Vector3(-7.5, 0, 5.1);

  const murOuest = PRIMS.wall(
    "wall-3",
    { largeur: 15, hauteur: 5, epaisseur: 0.1 },
    scene
  );
  murOuest.position = new BABYLON.Vector3(-7.5, 0, 15.1);

  const plafond = PRIMS.wall(
    "plafond",
    { largeur: 15.1, hauteur: 10.1 },
    scene
  );
  plafond.position = new BABYLON.Vector3(-7.5, 5, 5.05);
  plafond.rotation.x = Math.PI / 2;

  const porteSalle3 = creerBoite(
    "porte3",
    { largeur: 2, hauteur: 3, profondeur: 5 },
    scene
  );
  porteSalle3.position = new BABYLON.Vector3(-1, 1.5, 10);
  porteSalle3.rotation.y = Math.PI / 2;

  const ouvertureSalle3 = creuser(murSud, porteSalle3);
  ouvertureSalle3.checkCollisions = true;

  // MESH.create(
  // 	"mesh_test",
  // 	{ scale: 0.3 },
  // 	"control_computer.glb",
  // 	new BABYLON.Vector3(-2, 0, 14.8),
  // 	{ width: 5, height: 10, depth: 5 },
  // 	new BABYLON.Vector3(-1.5, 0, -1),
  // 	false,
  // 	scene
  // );

  MESH.create(
    "computer_1",
    { scale: 0.3 },
    "control_computer.glb",
    new BABYLON.Vector3(-4, 0, 14.8),
    0,
    { width: 5, height: 10, depth: 5 },
    new BABYLON.Vector3(-1.5, 0, -1),
    false,
    scene
  );

  MESH.create(
    "computer_2",
    { scale: 0.3 },
    "control_computer.glb",
    new BABYLON.Vector3(-2.7, 0, 14.8),
    0,
    { width: 5, height: 10, depth: 5 },
    new BABYLON.Vector3(-1.5, 0, -1),
    false,
    scene
  );

  MESH.create(
    "computer_3",
    { scale: 0.3 },
    "control_computer.glb",
    new BABYLON.Vector3(-4.7, 0, 14.8),
    0,
    { width: 5, height: 10, depth: 5 },
    new BABYLON.Vector3(-1.5, 0, -1),
    false,
    scene
  );

  // MESH.create(
  // 	"mesh_test",
  // 	{ scale: 0.3 },
  // 	"control_computer.glb",
  // 	new BABYLON.Vector3(-4.7, 0, 5.4),
  // 	Math.PI,
  // 	{ width: 5, height: 10, depth: 5 },
  // 	new BABYLON.Vector3(-1.5, 0, -1),
  // 	false,
  // 	scene
  // );
}

function creerEscalier(nom, opts, scn) {
  let scene = scn;
  const numberOfBoxes = 11;
  const initialX = 9.5;
  const initialZ = -13.5;

  for (let i = 0.8; i <= numberOfBoxes; i++) {
    const height = i;
    const box = creerBoite(
      `box${i}`,
      { largeur: 3, hauteur: height, profondeur: 1 },
      scene
    );
    box.position = new BABYLON.Vector3(initialX - (i - 1), 0, initialZ);
    box.rotation.y = Math.PI / 2;
    box.checkCollisions = true;
    box.visibility = false;
  }
}

function creuser(mesh0, mesh1) {
  const csg0 = BABYLON.CSG.FromMesh(mesh0);
  const csg1 = BABYLON.CSG.FromMesh(mesh1);
  csg0.subtractInPlace(csg1);
  const csgMesh = csg0.toMesh();
  mesh0.dispose();
  mesh1.dispose();
  return csgMesh;
}

const PRIMS = {
  camera: creerCamera,
  BoxCamera: creerBoxcamera,
  reticule: creerReticule,
  wall: creerCloison,
  sphere: creerSphere,
  box: creerBoite,
  poster: creerPoster,
  standardMaterial: creerMateriauStandard,
  meadow: creerPrairie,
  ground: creerSol,
  sky: creerCiel,
  creuser: creuser,
  hall: creerHall,
  mezanine: creerMezanine,
  salleTatooine: creerSalleTatooine,
  salleCome: creerSalleCome,
  salleEtoileDeLaMort: creerSalleEtoileDeLaMort,
  escalier: creerEscalier,
};

export { PRIMS };
