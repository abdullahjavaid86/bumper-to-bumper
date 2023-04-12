import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import React, { useContext, useEffect, useState } from "react";
import { ImageSelectionContext } from "@/contexts/image-selection-context";
import { fabric } from "fabric";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import SideBar from "@/components/sideBar";

export default function Editor() {
  const { editor, onReady } = useFabricJSEditor();

  const { selected } = useContext(ImageSelectionContext);

  const { push } = useRouter();
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({}); 

  const isEmpty = (object) => JSON.stringify(object) === "{}"? true : false;

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
    pdf.save(`${selected.image}.pdf`);
  };

  const onImageAdd = () => {
    const canvas = editor.canvas;

    fabric.util.loadImage(
      "https://images.unsplash.com/photo-1681115085351-4c207e8e4ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      (img) => {
        const img1 = new fabric.Image(img);
        img1.set({
          left: 0,
          top: 0,
          width: 150,
          height: 150,
          opacity: 0.3,
        });
        canvas.add(img1);
        canvas.centerObject(img1);
      },
      null,
      {
        crossOrigin: "anonymous",
      }
    );

    const textbox = new fabric.Textbox("Lorum ipsum dolor sit amet", {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 12,
      fontWeight: "bold",
    });

    canvas.add(textbox);
    canvas.centerObject(textbox);
  };

  const renderCategoryDetails = () => { 
    if(isEmpty(selectedCategory)) return;
    const canvas = editor.canvas;
    const categoryNameBox = new fabric.Textbox(selectedCategory.category, {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: "#1565C0"
    });
    canvas.add(categoryNameBox);
    selectedCategory.products.forEach((product)=> {
      const productNameBox = new fabric.Textbox(product.name, {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 14,
        backgroundColor: "#81b8f7"
      });
      canvas.add(productNameBox);
    })

  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "20% 80%",
          gridTemplateRows: "auto",
          gridTemplateAreas: `"side   main"`,
        }}
      >
        <Box sx={{ border: "2px solid grey", gridArea: "side" }}>
          <SideBar 
            setSelectedCategory={setSelectedCategory}
            renderCategoryDetails={renderCategoryDetails}
          />
        </Box>
        <Box sx={{ gridArea: "main" }}>
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
            <button onClick={onImageAdd}>Add Image</button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
