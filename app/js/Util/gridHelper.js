
function createCanvasElement(iSize){
    var canvasElement = document.createElement("canvas");
    canvasElement.setAttribute("width",iSize);
    canvasElement.setAttribute("height",iSize);
    var context = canvasElement.getContext("2d");
    context.beginPath();
    context.arc(0.5, 0.5, 0.5, 0, 2 * Math.PI, false);
    setStyle(context);
    return canvasElement;
}
function setStyle(context){
    context.fillStyle = "rgba(3,3,3,0.3)";
      context.fill();
      context.lineWidth = 0;
      //context.strokeStyle = '#000000';
    context.stroke();
}
let _base64Grid = null;
export const GridHelper = {
    init(){
	var container = document.createElement("div");
	container.setAttribute("class","hide");
	var canvasElement = createCanvasElement(10);
	container.appendChild(canvasElement);
	_base64Grid = canvasElement.toDataURL();
	document.body.appendChild(container);
    },
    getBase64Image(){
	return _base64Grid;
    }
};
