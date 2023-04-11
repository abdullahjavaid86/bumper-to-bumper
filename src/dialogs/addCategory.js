import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DialogTitle, Dialog, IconButton } from "@mui/material";
import CloseIcon from "../icons/closeIcon";

const styles = {
  title: {
    color: "#1565C0",
    fontWeight: "bold",
  },
  displayCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  addMore: {
    backgroundColor: "#2CB23B",
    color: "white",
    mb: 2,
  },
  submit: {
    letterSpacing: "2px",
    fontWeight: "bold",
    mb: 2,
  },
};

export default function AddCategory(props) {
  const { open, handleClose, addItem } = props;
  const [products, setProducts] = useState(["product1"]);

  const validationSchema = Yup.object({
    categoryName: Yup.string().required("Category Name is required"),
  });

  const onSubmit = async (values) => {
    if (values.categoryName) {
    let newProducts = []; 
    products.forEach((product, index) => {
      if (values[product]) {
        const data = {
          id: index + 1,
          name: values[product],
        };
        newProducts.push(data);
      }
    });
    addItem(values.categoryName.trim().length? values.categoryName : "No Name", newProducts);
    handleClose();
    }
  };

  const addMoreProduct = () => {
    setProducts([...products, `product${products.length + 1}`]);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <DialogTitle sx={styles.title}>
        {"Add New Category"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{ categoryName: "", product1: "" }}
        validationSchema={validationSchema}
      >
        {({ errors, values, handleChange }) => (
          <>
            <Form style={styles.displayCenter}>
              <FormControl sx={{ mb: 2 }} variant="outlined">
                <TextField
                  sx={{
                    width: { sm: 200, md: 450 },
                  }}
                  label="Category Name"
                  variant="outlined"
                  name="categoryName"
                  id="categoryName"
                  type="text"
                  onChange={handleChange("categoryName")}
                  helperText={errors.categoryName ?? ""}
                />
              </FormControl>
              {products.map((product, index) => (
                <FormControl sx={{ mb: 2 }} variant="outlined">
                  <TextField
                    sx={{
                      width: { sm: 200, md: 450 },
                    }}
                    label={`Product${index + 1}`}
                    variant="outlined"
                    name={`product${index + 1}`}
                    id={`${index}`}
                    type="text"
                    onChange={handleChange(`product${index + 1}`)}
                  />
                </FormControl>
              ))}
              <Button
                sx={styles.addMore}
                onClick={addMoreProduct}
                variant="contained"
                color="success"
              >
                + Add More Products
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  onSubmit(values);
                }}
                variant="contained"
                sx={styles.submit}
              >
                Add Category
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
