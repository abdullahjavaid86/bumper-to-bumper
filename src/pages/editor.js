import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

export default function Editor() {
  const { editor, onReady } = useFabricJSEditor();

  const history = [];
  const [color, setColor] = useState("#35363a");
  const [cropImage, setCropImage] = useState(true);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL("./sampleTruck.png", (image) => {
      editor.canvas.wrapperEl.style.backgroundImage = `url(${image.toDataURL()})`;
      editor.canvas.wrapperEl.style.backgroundPosition = "center";
      editor.canvas.wrapperEl.style.backgroundRepeat = "no-repeat";
      editor.canvas.wrapperEl.style.backgroundSize = "contain";
      editor.canvas.setBackgroundImage(
        image,
        editor.canvas.renderAll.bind(editor.canvas)
      );
    });
  };

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    // editor.canvas.style.height = "100vh";
    // editor.canvas.style.width = "100%";
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.isDrawingMode = true;
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.color = color;
    editor.setStrokeColor(color);
  }, [color]);
  const drawArrow = (fromX, fromY, toX, toY) => {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const line = new fabric.Line([fromX, fromY, toX, toY], {
      stroke: "red",
      strokeWidth: 2,
      strokeLineCap: "round",
      selectable: false,
    });
    const triangle = new fabric.Triangle({
      angle: angle,
      width: headLength,
      height: headLength,
      fill: color,
      left: toX,
      top: toY,
      originX: "center",
      originY: "center",
      selectable: false,
    });
    const group = new fabric.Group([line, triangle], {
      selectable: false,
    });
    editor.canvas.add(group);
  };
  useEffect(() => {
    if (!editor || !fabric) {
      return;
    }

    const handleMouseDown = (event) => { 
      if (event.target) {
        const pointer = editor.canvas.getPointer(event.e);
        const x = pointer.x;
        const y = pointer.y;
        const line = new fabric.Line([x, y, x, y], {
          stroke: "red",
          strokeWidth: 2,
          strokeLineCap: "round",
          selectable: false,
        });
        editor.canvas.add(line);
        editor.canvas.on("mouse:move", function (event) {
          const pointer = editor.canvas.getPointer(event.e);
          line.set({ x2: pointer.x, y2: pointer.y });
          editor.canvas.renderAll();
        });
        editor.canvas.on("mouse:up", function (event) {
          editor.canvas.off("mouse:move");
          const pointer = editor.canvas.getPointer(event.e);
          const x2 = pointer.x;
          const y2 = pointer.y;
          drawArrow(x, y, x2, y2);
        });
      }
    };

    editor.canvas.on("mouse:down", handleMouseDown);

    return () => {
      editor.canvas.off("mouse:down", handleMouseDown);
    };
  }, [color, drawArrow, editor]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <FabricJSCanvas
        style={{ width: "100%", height: "100%" }}
        onReady={onReady}
      />
    </div>
    // </div>
  );
}
