import * as pv from "bio-pv";

let viewer;
let structure;

function preset() {
  viewer.clear();
  var ligand = structure.select({ rnames: ["RVP", "SAH"] });
  viewer.ballsAndSticks("ligand", ligand);
  viewer.cartoon("protein", structure);
}

export function PDBViewer(data) {
  viewer = pv.Viewer(document.getElementById("container"), {
    quality: "medium",
    width: 800,
    height: 600,
    antialias: true,
    outline: true,
  });
  structure = pv.io.pdb(data);
  preset();
  viewer.centerOn(structure);
  viewer.autoZoom();
}
