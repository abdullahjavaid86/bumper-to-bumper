// import React, { useEffect, useState } from "react";
// import { fabric } from "fabric";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import "./styles.css";

// export default function App() {
//   const { editor, onReady } = useFabricJSEditor();

//   const history = [];
//   const [color, setColor] = useState("#35363a");
//   const [cropImage, setCropImage] = useState(true);

//   useEffect(() => {
//     if (!editor || !fabric) {
//       return;
//     }

//     if (cropImage) {
//       editor.canvas.__eventListeners = {};
//       return;
//     }

//     if (!editor.canvas.__eventListeners["mouse:wheel"]) {
//       editor.canvas.on("mouse:wheel", function (opt) {
//         var delta = opt.e.deltaY;
//         var zoom = editor.canvas.getZoom();
//         zoom *= 0.999 ** delta;
//         if (zoom > 20) zoom = 20;
//         if (zoom < 0.01) zoom = 0.01;
//         editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//         opt.e.preventDefault();
//         opt.e.stopPropagation();
//       });
//     }

//     if (!editor.canvas.__eventListeners["mouse:down"]) {
//       editor.canvas.on("mouse:down", function (opt) {
//         var evt = opt.e;
//         if (evt.ctrlKey === true) {
//           this.isDragging = true;
//           this.selection = false;
//           this.lastPosX = evt.clientX;
//           this.lastPosY = evt.clientY;
//         }
//       });
//     }

//     if (!editor.canvas.__eventListeners["mouse:move"]) {
//       editor.canvas.on("mouse:move", function (opt) {
//         if (this.isDragging) {
//           var e = opt.e;
//           var vpt = this.viewportTransform;
//           vpt[4] += e.clientX - this.lastPosX;
//           vpt[5] += e.clientY - this.lastPosY;
//           this.requestRenderAll();
//           this.lastPosX = e.clientX;
//           this.lastPosY = e.clientY;
//         }
//       });
//     }

//     if (!editor.canvas.__eventListeners["mouse:up"]) {
//       editor.canvas.on("mouse:up", function (opt) {
//         // on mouse up we want to recalculate new interaction
//         // for all objects, so we call setViewportTransform
//         this.setViewportTransform(this.viewportTransform);
//         this.isDragging = false;
//         this.selection = true;
//       });
//     }

//     editor.canvas.renderAll();
//   }, [editor]);

//   const addBackground = () => {
//     if (!editor || !fabric) {
//       return;
//     }

//     fabric.Image.fromURL(
//       "https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg",
//       (image) => {
//         editor.canvas.setBackgroundImage(
//           image,
//           editor.canvas.renderAll.bind(editor.canvas)
//         );
//       }
//     );
//   };

//   const fromSvg = () => {
//     fabric.loadSVGFromString(
//       `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
//     <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
//     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="500" height="500" viewBox="0 0 500 500" xml:space="preserve">
//     <desc>Created with Fabric.js 5.3.0</desc>
//     <defs>
//     </defs>
//     <g transform="matrix(1 0 0 1 662.5 750)"  >
//       <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  xlink:href="https://thegraphicsfairy.com/wp-content/uploads/2019/02/Anatomical-Heart-Illustration-Black-GraphicsFairy.jpg" x="-662.5" y="-750" width="1325" height="1500"></image>
//     </g>
//     <g transform="matrix(1 0 0 1 120.5 120.5)"  >
//     <circle style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  cx="0" cy="0" r="20" />
//     </g>
//     <g transform="matrix(1 0 0 1 245.5 200.5)"  >
//     <line style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  x1="-75" y1="-50" x2="75" y2="50" />
//     </g>
//     <g transform="matrix(1 0 0 1 141.4 220.03)" style=""  >
//         <text xml:space="preserve" font-family="Arial" font-size="16" font-style="normal" font-weight="normal" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(53,54,58); fill-rule: nonzero; opacity: 1; white-space: pre;" ><tspan x="-16.9" y="-5.46" >inset</tspan><tspan x="-16.9" y="15.51" >text</tspan></text>
//     </g>
//     <g transform="matrix(1 0 0 1 268.5 98.5)"  >
//     <rect style="stroke: rgb(53,54,58); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  x="-20" y="-20" rx="0" ry="0" width="40" height="40" />
//     </g>
//     </svg>`,
//       (objects, options) => {
//         editor.canvas._objects.splice(0, editor.canvas._objects.length);
//         editor.canvas.backgroundImage = objects[0];
//         const newObj = objects.filter((_, index) => index !== 0);
//         newObj.forEach((object) => {
//           editor.canvas.add(object);
//         });

//         editor.canvas.renderAll();
//       }
//     );
//   };

//   useEffect(() => {
//     if (!editor || !fabric) {
//       return;
//     }
//     editor.canvas.setHeight(500);
//     editor.canvas.setWidth(500);
//     addBackground();
//     editor.canvas.renderAll();
//   }, [editor?.canvas.backgroundImage]);

//   const toggleSize = () => {
//     editor.canvas.freeDrawingBrush.width === 12
//       ? (editor.canvas.freeDrawingBrush.width = 5)
//       : (editor.canvas.freeDrawingBrush.width = 12);
//   };

//   useEffect(() => {
//     if (!editor || !fabric) {
//       return;
//     }
//     editor.canvas.freeDrawingBrush.color = color;
//     editor.setStrokeColor(color);
//   }, [color]);

//   const toggleDraw = () => {
//     editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
//   };
//   const undo = () => {
//     if (editor.canvas._objects.length > 0) {
//       history.push(editor.canvas._objects.pop());
//     }
//     editor.canvas.renderAll();
//   };
//   const redo = () => {
//     if (history.length > 0) {
//       editor.canvas.add(history.pop());
//     }
//   };

//   const clear = () => {
//     editor.canvas._objects.splice(0, editor.canvas._objects.length);
//     history.splice(0, history.length);
//     editor.canvas.renderAll();
//   };

//   const removeSelectedObject = () => {
//     editor.canvas.remove(editor.canvas.getActiveObject());
//   };

//   const onAddCircle = () => {
//     editor.addCircle();
//     editor.addLine();
//   };
//   const onAddRectangle = () => {
//     editor.addRectangle();
//   };
//   const addText = () => {
//     editor.addText("inset text");
//   };

//   const exportSVG = () => {
//     const svg = editor.canvas.toSVG();
//     console.info(svg);
//   };

//   return (
//     <div className="App">
//       <h1>FabricJS React Sample</h1>
//       <button onClick={onAddCircle}>Add circle</button>
//       <button onClick={onAddRectangle} disabled={!cropImage}>
//         Add Rectangle
//       </button>
//       <button onClick={addText} disabled={!cropImage}>
//         Add Text
//       </button>
//       <button onClick={toggleDraw} disabled={!cropImage}>
//         Toggle draw
//       </button>
//       <button onClick={clear} disabled={!cropImage}>
//         Clear
//       </button>
//       <button onClick={undo} disabled={!cropImage}>
//         Undo
//       </button>
//       <button onClick={redo} disabled={!cropImage}>
//         Redo
//       </button>
//       <button onClick={toggleSize} disabled={!cropImage}>
//         ToggleSize
//       </button>
//       <button onClick={removeSelectedObject} disabled={!cropImage}>
//         Delete
//       </button>
//       <button onClick={(e) => setCropImage(!cropImage)}>Crop</button>
//       <label disabled={!cropImage}>
//         <input
//           disabled={!cropImage}
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//         />
//       </label>
//       <button onClick={exportSVG} disabled={!cropImage}>
//         {" "}
//         ToSVG
//       </button>
//       <button onClick={fromSvg} disabled={!cropImage}>
//         fromsvg
//       </button>

//       <div
//         style={{
//           border: `3px ${!cropImage ? "dotted" : "solid"} Green`,
//           width: "500px",
//           height: "500px"
//         }}
//       >
//         <FabricJSCanvas className="sample-canvas" onReady={onReady} />
//       </div>
//     </div>
//   );
// }
// //////////////////////////////////////////////////////
// import React, { useRef, useEffect } from "react";
// import { fabric } from "fabric";

// const Arrow = ({ fromX, fromY, toX, toY, color }) => {
//   const headLength = 10;
//   const angle = Math.atan2(toY - fromY, toX - fromX);

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current);
//     const line = new fabric.Line([fromX, fromY, toX, toY], {
//       stroke: color,
//       strokeWidth: 2,
//       selectable: false,
//     });

//     const headLeft = new fabric.Line(
//       [
//         toX,
//         toY,
//         toX - headLength * Math.cos(angle - Math.PI / 6),
//         toY - headLength * Math.sin(angle - Math.PI / 6),
//       ],
//       {
//         stroke: color,
//         strokeWidth: 2,
//         selectable: false,
//       }
//     );

//     const headRight = new fabric.Line(
//       [
//         toX,
//         toY,
//         toX - headLength * Math.cos(angle + Math.PI / 6),
//         toY - headLength * Math.sin(angle + Math.PI / 6),
//       ],
//       {
//         stroke: color,
//         strokeWidth: 2,
//         selectable: false,
//       }
//     );

//     canvas.add(line, headLeft, headRight);
//   }, []);

//   return <canvas ref={canvasRef} width={400} height={400} />;
// };

// export default Arrow;
// // import React, { useEffect } from "react";
// // import { fabric } from "fabric";
// // import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

// // export default function Editor() {
// //   const { editor, onReady } = useFabricJSEditor();

// //   useEffect(() => {
// //     if (!editor || !fabric) {
// //       return;
// //     }

// //     fabric.Image.fromURL("./sampleTruck.png", (image) => {
// //       // Set the image as the background of the canvas using CSS
// //       editor.canvas.wrapperEl.style.backgroundImage = `url(${image.toDataURL()})`;
// //       editor.canvas.wrapperEl.style.backgroundPosition = "center";
// //       editor.canvas.wrapperEl.style.backgroundRepeat = "no-repeat";
// //       editor.canvas.wrapperEl.style.backgroundSize = "contain";
// //     });

// //     // Add a mouse down event listener to the canvas
// //     editor.canvas.on("mouse:down", (options) => {
// //       // Get the coordinates of the click
// //       const { x, y } = options.pointer;

// //       // Create a new arrow object
// //       const arrow = new fabric.LineArrow([x, y, x, y], {
// //         stroke: "red",
// //         strokeWidth: 2,
// //         selectable: false,
// //       });

// //       // Add the arrow to the canvas
// //       editor.canvas.add(arrow);
// //     });
// //   }, [editor]);

// //   return (
// //     <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
// //       <div style={{ flex: 1 }}>
// //         {/* Render other components on the left side */}
// //       </div>
// //       <div
// //         style={{
// //           flex: 1,
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           position: "relative"
// //         }}
// //       >
// //         {/* Render the FabricJSCanvas component on the right side */}
// //         <FabricJSCanvas style={{ width: "100%", height: "100%" }} onReady={onReady} />
// //       </div>
// //     </div>
// //   );
// // })


// // var canvas = new fabric.Canvas('canvas');
// // 	canvas.selection = false;
// // 	var rect, ellipse, line, triangle, isDown, origX, origY, freeDrawing = true, textVal, activeObj;
// // 	var isRectActive = false, isCircleActive = false, isArrowActive = false;
	
// // 	var rectangle = document.getElementById('rect');
// // 	var circle = document.getElementById('circle');
// // 	var arrowSel = document.getElementById('arrow');
// // 	var freedrawing = document.getElementById('freedrawing');
// // 	rectangle.addEventListener('click', function () {
// // 		isRectActive = !isRectActive;
// // 	});
// // 	circle.addEventListener('click', function () { 
// // 		isCircleActive = !isCircleActive;
// // 	});
// // 	arrowSel.addEventListener('click', function () { 
// // 		isArrowActive = !isArrowActive;
// // 	});
// // 	freedrawing.addEventListener('click', function () { 
// // 		freeDrawing = !freeDrawing;
// // 	});
// // 	canvas.on('mouse:down', function(o) {
// // 		if (freeDrawing) {
// // 		    isDown = true;
// // 		    var pointer = canvas.getPointer(o.e);
// // 		    origX = pointer.x;
// // 		    origY = pointer.y;
// // 		    if(isRectActive) {
// // 		    	rect = new fabric.Rect({
// // 			        left: origX,
// // 			        top: origY,
// // 			        width: pointer.x-origX,
// // 			        height: pointer.y-origY,
// // 			        fill: '',
// // 			        stroke : 'red',
// // 			        type : 'rect',
// // 			        uuid : generateUUID(),
// // 			        strokeWidth:5,
// // 			    });
// // 			    canvas.add(rect);
// // 			    activeObj = rect;
// // 			} else if (isCircleActive) {
// // 				ellipse = new fabric.Ellipse({
// //                     left: origX,
// //                     top: origY,
// //                     originX: 'left',
// //                     originY: 'top',
// //                     rx: pointer.x - origX,
// //                     ry: pointer.y - origY,
// //                     angle: 0,
// //                     fill: '',
// //                     stroke: 'orange',
// //                     strokeWidth:6,
// //                     type : 'ellipse',
// //                     uuid : generateUUID()
// //                 });
// // 		       canvas.add(ellipse);
// // 		       activeObj = ellipse;
// // 			} else if (isArrowActive) {
// // 				var points = [pointer.x, pointer.y, pointer.x, pointer.y];
// // 	            line = new fabric.Line(points, {
// // 	                strokeWidth: 6,
// // 	                fill: 'red',
// // 	                stroke: 'red',
// // 	                originX: 'center',
// // 	                originY: 'center',
// // 	                id:'arrow_line',
// // 	                uuid : generateUUID(),
// // 	                type : 'arrow'
// // 	            });
// // 	            var centerX = (line.x1 + line.x2) / 2;
// // 	            var centerY = (line.y1 + line.y2) / 2;
// // 	            deltaX = line.left - centerX;
// // 	            deltaY = line.top - centerY;

// // 	            triangle = new fabric.Triangle({
// // 	                left: line.get('x1') + deltaX,
// // 	                top: line.get('y1') + deltaY,
// // 	                originX: 'center',
// // 	                originY: 'center',
// // 	                selectable: false,
// // 	                pointType: 'arrow_start',
// // 	                angle: -45,
// // 	                width: 20,
// // 	                height: 20,
// // 	                fill: 'red',
// // 	                id:'arrow_triangle',
// // 	                uuid : line.uuid
// // 	            });
// // 	            canvas.add(line, triangle);
// // 		       activeObj = line;
// // 			}
// // 		}
// // 	});

// // 	var _FabricCalcArrowAngle = function(x1, y1, x2, y2) {
// //         var angle = 0, x, y;
// //         x = (x2 - x1);
// //         y = (y2 - y1);
// //         if (x === 0) {
// //             angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
// //         } else if (y === 0) {
// //             angle = (x > 0) ? 0 : Math.PI;
// //         } else {
// //             angle = (x < 0) ? Math.atan(y / x) + Math.PI :
// //                 (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
// //         }
// //         return (angle * 180 / Math.PI + 90);
// //     };

// // 	canvas.on('mouse:move', function(o) {
// // 	    if (isDown && freeDrawing) {
// // 	    var pointer = canvas.getPointer(o.e);

// // 	    if(isRectActive) {
// // 	    	if(origX>pointer.x){
// // 		        rect.set({ left: Math.abs(pointer.x) });
// // 		    }
// // 		    if(origY>pointer.y){
// // 		        rect.set({ top: Math.abs(pointer.y) });
// // 		    }
		    
// // 		    rect.set({ width: Math.abs(origX - pointer.x) });
// // 		    rect.set({ height: Math.abs(origY - pointer.y) });
// // 		} else if (isCircleActive) {
// // 			if(ellipse === null) {
// // 	            return;
// // 	        }
// // 	        var rx = Math.abs(origX - pointer.x)/2;
// // 	        var ry = Math.abs(origY - pointer.y)/2;
// // 	        if (rx > ellipse.strokeWidth) {
// // 	            rx -= ellipse.strokeWidth/2;
// // 	        }
// // 	        if (ry > ellipse.strokeWidth) {
// // 	            ry -= ellipse.strokeWidth/2;
// // 	        }
// // 	        ellipse.set({ rx: rx, ry: ry});

// // 	        if(origX > pointer.x){
// // 	            ellipse.set({originX: 'right' });
// // 	        } else {
// // 	            ellipse.set({originX: 'left' });
// // 	        }
// // 	        if(origY > pointer.y){
// // 	            ellipse.set({originY: 'bottom'  });
// // 	        } else {
// // 	            ellipse.set({originY: 'top'  });
// // 	        }
// // 		} else if (isArrowActive) {
// // 			line.set({
// //                 x2: pointer.x,
// //                 y2: pointer.y
// //             });
// //             triangle.set({
// //                 'left': pointer.x + deltaX,
// //                 'top': pointer.y + deltaY,
// //                 'angle': _FabricCalcArrowAngle(line.x1,
// //                                                 line.y1,
// //                                                 line.x2,
// //                                                 line.y2)
// //             });
// // 		}
// // 	    canvas.renderAll();
// // 	   }
// // 	});

// // 	canvas.on('mouse:up', function(o) {
// // 		if(freeDrawing) {
// // 			isDown = false;
// // 			if (isRectActive || isCircleActive || isArrowActive) {
// // 				textVal = prompt('Please enter text value..', '45');
// // 			    if(isArrowActive) {
// // 			    	var group = new window.fabric.Group([line,triangle],
// // 			                {
// // 			                    borderColor: 'black',
// // 			                    cornerColor: 'green',
// // 			                    lockScalingFlip : true,
// // 			                    typeOfGroup : 'arrow',
// // 			                    userLevel : 1,
// // 			                    name:'my_ArrowGroup',
// // 			                    uuid : activeObj.uuid,
// // 			                    type : 'arrow'
// // 			                }
// // 			                );
// // 			    	canvas.remove(line, triangle);// removing old object
// // 			    	activeObj = group;
// // 			    	canvas.add(group);
// // 				}
// // 			  //add text to the canvas.
// // 				var _text = new fabric.Text(textVal, {
// // 			        fontSize: 30,
// // 			        fill : 'green',
// // 			        type : 'text',
// // 			        selectable : false,
// // 			        left : activeObj.left,
// // 			        top : activeObj.top - 30,
// // 			        uuid : activeObj.uuid,
// // 			        type : 'text'
// // 			    });
// // 				canvas.add(_text);
// // 			}
// // 		}
// // 		//set coordinates for proper mouse interaction
// // 		var objs = canvas.getObjects();
// //    	    for (var i = 0 ; i < objs.length; i++) {
// // 			objs[i].setCoords();
// //    	   	}
// // 	});
// // 	function generateUUID(){
// // 	    var d = new Date().getTime();
// // 	    if(window.performance && typeof window.performance.now === "function"){
// // 	        d += performance.now(); //use high-precision timer if available
// // 	    }
// // 	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
// // 	        var r = (d + Math.random()*16)%16 | 0;
// // 	        d = Math.floor(d/16);
// // 	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
// // 	    });
// // 	    return uuid;
// // 	}
// // 		canvas.on("object:modified", function (e) {
// // 	        try {
// // 	       	 	var obj = e.target;
// // 	   	     	    if (obj.type === 'ellipse') {
// // 						obj.rx *= obj.scaleX;
// // 						obj.ry *= obj.scaleY;
// // 	   	   	     	}
// // 		   	     	if (obj.type !== 'arrow') {
// // 						obj.width *= obj.scaleX;
// // 		   	     	    obj.height *= obj.scaleY;
// // 			   	     	obj.scaleX = 1; 
// // 		   	     	    obj.scaleY = 1;
// // 					}
// // 	   	     	    //find text with the same UUID
// // 	   	     	    var currUUID = obj.uuid;
// // 	   	     	    var objs = canvas.getObjects();
// // 	   	     	    var currObjWithSameUUID = null;
// // 	   	     	    for (var i = 0 ; i < objs.length; i++) {
// // 						if (objs[i].uuid === currUUID && 
// // 								objs[i].type === 'text') {
// // 							currObjWithSameUUID = objs[i];
// // 							break;
// // 						}
// // 	   	   	     	}
// // 	   	   	     	if (currObjWithSameUUID) {
// // 	   	   	     		currObjWithSameUUID.left = obj.left;
// // 	   	   	     		currObjWithSameUUID.top = obj.top - 30;
// // 	   	   	     		currObjWithSameUUID.opacity = 1;
// // 	      	   	   	}
// // 	          } catch (E) {
// // 	          }
// // 	   	});

// // 	var _hideText = function (e) {
// // 		try {
// //        	 	var obj = e.target;
// // //        	 	console.log(obj);
// //    	     	    //find text with the same UUID
// //    	     	    var currUUID = obj.uuid;
// //    	     	    var objs = canvas.getObjects();
// //    	     	    var currObjWithSameUUID = null;
// //    	     	    for (var i = 0 ; i < objs.length; i++) {
// // 					if (objs[i].uuid === currUUID && objs[i].type === 'text') {
// // 						currObjWithSameUUID = objs[i];
// // 						break;
// // 					}
// //    	   	     	}
// //    	   	     	if (currObjWithSameUUID) {
// //    	   	     		currObjWithSameUUID.opacity = 0;
// //       	   	   	}
// //           } catch (E) {
// //           }
// // 	}
   	
// //     canvas.on("object:moving", function (e) {
// //     	_hideText(e);
// //     });
// //     canvas.on("object:scaling", function (e) {
// //     	_hideText(e);
// //     });
// //     canvas.renderAll();