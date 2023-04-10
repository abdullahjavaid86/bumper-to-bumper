import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import React, { useContext, useEffect, useState } from "react";

import { ImageSelectionContext } from "@/contexts/image-selection-context";
import { fabric } from "fabric";
import jsPDF from "jspdf";
import { useRouter } from "next/router";

export default function Editor() {
  const { editor, onReady } = useFabricJSEditor();

  const { selected } = useContext(ImageSelectionContext);

  const { push } = useRouter();
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  useEffect(() => {
    if (!selected.hasOwnProperty("image")) {
      push("/home");
    }
  }, []);

  const addBackground = () => {
    if (!editor || !fabric) {
      return;
    }

    fabric.Image.fromURL(selected.image, (image) => {
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
    editor.canvas.setHeight(500);
    editor.canvas.setWidth(500);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };
  const onAddLine = () => {
    editor.addLine();
  };
  const onAddText = (text) => {
    editor.addText(text);
  };

  const toggleDrawingMode = () => {
    const { canvas } = editor;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setIsDrawingMode(canvas.isDrawingMode);
  };

  const deleteSelected = () => {
    editor.deleteSelected();
  };

  const deleteAll = () => {
    if (window.confirm("Are you sure? This can not be undone"))
      editor.deleteAll();
  };

  const onDownload = () => {
    const imgData = editor.canvas.toDataURL({
      format: "image/jpeg",
      quality: 1.0,
    });
    const pdf = new jsPDF();

    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save("download.pdf");
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
        <FabricJSCanvas
          style={{ width: "100%", height: "100%" }}
          onReady={onReady}
        />
      </div>

      <div className="canvas_actions">
        <button onClick={onAddCircle}>Add Circle</button>
        <button onClick={onAddRectangle}>Add Rectangle</button>
        <button onClick={onAddLine}>Add Line</button>
        <button onClick={() => onAddText("some text")}>Add Text</button>
        <button
          onClick={toggleDrawingMode}
          className={isDrawingMode ? "drawing_mode" : ""}
        >
          Toggle Drawing mode
        </button>
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={deleteAll}>Delete All</button>
        <button onClick={onDownload}>Export as PDF</button>
      </div>
    </>
  );
}
