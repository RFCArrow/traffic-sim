let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

//Create a Pixi Application
let app = new PIXI.Application({width: 512, height: 512});
app.renderer.backgroundColor = 0xFFFFFF;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


