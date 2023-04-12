import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ImageSelectionContext } from "@/contexts/image-selection-context";
import SideBar from "@/components/sideBar";
import { fabric } from "fabric";
import { isEmpty } from "@/utils/common";
import jsPDF from "jspdf";
import { useRouter } from "next/router";
import ImageSelector from "@/dialogs/imageSelector";

const styles = {
  action: {
    backgroundColor: "#1565C0",
    border: `1px solid #1565C0`,
    borderRadius: "3px",
    letterSpacing: "1px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    padding: "6px",
  },
};

export default function Editor() {
  const { editor, onReady } = useFabricJSEditor();
  const { selected } = useContext(ImageSelectionContext);

  const { push } = useRouter();
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [openImageSelector, setOpenImageSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

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
    editor.canvas.setHeight(600);
    editor.canvas.setWidth(800);
    addBackground();
    editor.canvas.renderAll();
  }, [editor?.canvas.backgroundImage]);

  useEffect(()=> {
    if(!isEmpty(selectedCategory)) {
      renderCategoryDetails();
    }
  },[selectedCategory]);

  const handleOpenImageSelector = () => {
    setOpenImageSelector(true);
  }

  const handleCloseImageSelector = () => {
    setOpenImageSelector(false);
  }

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

  const onImageAdd = (imageSrc) => {
    const canvas = editor.canvas;

    fabric.util.loadImage(
      imageSrc,
      (img) => {
        const img1 = new fabric.Image(img);
        img1.set({
          left: 0,
          top: 0,
          width: 150,
          height: 150,
        });
        canvas.add(img1);
        canvas.centerObject(img1);
      },
      null,
      {
        crossOrigin: "anonymous",
      }
    );
  };

  const renderCategoryDetails = () => {
    const canvas = editor.canvas;
    const categoryNameBox = new fabric.Textbox(selectedCategory.category, {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: "#1565C0",
    });
    canvas.add(categoryNameBox);
    selectedCategory.products.forEach((product, index) => {
      const productNameBox = new fabric.Textbox(product.name, {
        left: 50,
        top: 70 + index * 19,
        width: 200,
        fontSize: 14,
        backgroundColor: "#81b8f7",
      });
      canvas.add(productNameBox);
    });
    setSelectedCategory({});
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
            }}
          >
            <FabricJSCanvas
              style={{ width: "100%", height: "100%" }}
              onReady={onReady}
            />
          </div>

          <div className="canvas_actions">
            <button style={styles.action} onClick={onAddRectangle}>Add Box</button>
            <button style={styles.action} onClick={onAddLine}>Add Line</button>
            <button style={styles.action} onClick={() => onAddText("some text")}>Add Text</button>
            <button
              onClick={toggleDrawingMode}
              className={isDrawingMode ? "drawing_mode" : ""}
              style={styles.action}
            >
              Toggle Drawing mode
            </button>
            <button style={styles.action} onClick={deleteSelected}>Delete Selected</button>
            <button style={styles.action} onClick={deleteAll}>Delete All</button>
            <button style={styles.action} onClick={onDownload}>Export as PDF</button>
            <button style={styles.action} onClick={handleOpenImageSelector}>Add Image</button>
          </div>
        </Box>
      </Box>
      <ImageSelector
        open={openImageSelector}
        handleClose={handleCloseImageSelector}
        onSelectImage={onImageAdd}
      />
    </Box>
  );
}
