import * as Yup from "yup";

import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CloseIcon from "../icons/closeIcon";
import { Edit } from "@mui/icons-material";
import RemoveIcon from "@/icons/removeIcon";
import styled from "@emotion/styled";

const styles = {
  title: {
    color: "#1565C0",
    fontWeight: "bold",
    fontSize: "25px",
  },
  displayCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    margin: "0% 4%",
  },
  displayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  details: {
    width: "100%",
    color: "black",
    fontWeight: "bold",
    fontSize: "23px",
  },
  product: {
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "5%",
    marginBottom: "2%",
  },
  name: {
    color: "#2CB23B",
    fontSize: "20px",
    marginLeft: "6%",
  },
  submit: {
    fontWeight: "bold",
  },
  addMore: {
    letterSpacing: "1px",
    fontWeight: "bold",
    backgroundColor: "#2CB23B",
    color: "white",
    mb: 2,
  },
};

const EditModeStyled = styled.span`
  color: red;
  font-size: 12px;
`;

export default function CategoryDetails(props) {
  const {
    open,
    handleClose,
    itemData,
    upDateItem,
    setSelectedCategory,
    renderCategoryDetails,
  } = props;
  const [newProduct, setNewProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isUpdateProcess, setIsUpdateProcess] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseDialog = () => {
    handleClose();
    setSelectedProducts([]);
    setIsUpdateProcess(true);
  };

  const handleProcessType = () => {
    setIsUpdateProcess((prev) => !prev);
    setSelectedProducts([]);
  };

  const handleSelectedProduct = (product) => {
    const isExistingProduct = selectedProducts.find((p) => p.id === product.id);
    if (isExistingProduct) {
      const filterSelectedProducts = selectedProducts.filter(
        (p) => p.id !== product.id
      );
      setSelectedProducts(filterSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleEdit = () => {
    setSelectedCategory({
      id: itemData.id,
      category: itemData.category,
      products: selectedProducts,
    });
    renderCategoryDetails();
    handleCloseDialog();
  };

  const handleDeleteProducts = (id) => {
    const filterProducts = products.filter((product) => product.id !== id);
    setProducts(filterProducts);
    setMessage("Product has been deleted successfully");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const addNewProduct = () => {
    if (!newProduct) return;
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: newProduct.trim().length ? newProduct : "No Name",
      },
    ]);
    setNewProduct("");
    setMessage("New Product has been added successfully");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleUpdateCategory = () => {
    upDateItem(itemData.id, products);
    handleCloseDialog();
  };

  const validationSchema = Yup.object({
    product: Yup.string().required("Product is required"),
  });

  useEffect(() => {
    setProducts(itemData.products);
  }, [itemData.products]);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" scroll="body">
      <DialogTitle sx={styles.title}>
        Category Products Details{" "}
        {isUpdateProcess ? <EditModeStyled>Edit Mode</EditModeStyled> : ""}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
      <Box sx={styles.displayCenter}>
        <Box sx={styles.displayFlex}>
          <p style={styles.details}>
            Category Name: <span style={styles.name}>{itemData.category}</span>
          </p>
          <Button
            variant={isUpdateProcess ? "contained" : "outlined"}
            startIcon={<Edit />}
            sx={styles.submit}
            onClick={handleProcessType}
            size="small"
          >
            Edit
          </Button>
        </Box>
        <p style={styles.product}>Products:</p>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {products?.length ? (
                products.map((product) => (
                  <Fragment key={product.id}>
                    <ListItem disablePadding>
                      {!isUpdateProcess && (
                        <Checkbox
                          color="success"
                          onClick={() => {
                            handleSelectedProduct(product);
                          }}
                        />
                      )}
                      <ListItemButton>
                        <ListItemText primary={`${product.name}`} />
                      </ListItemButton>
                      {isUpdateProcess && (
                        <IconButton
                          title="Delete Product"
                          onClick={() => {
                            handleDeleteProducts(product.id);
                          }}
                        >
                          <RemoveIcon color="#BDBDBD" />
                        </IconButton>
                      )}
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))
              ) : (
                <span style={{ color: "red" }}>
                  No Products Found of that category!
                </span>
              )}
            </List>
            {message && <span style={{ color: "#2CB23B" }}>{message}</span>}
          </nav>
        </Box>
        {isUpdateProcess && <p style={styles.product}>Add New Products:</p>}
        <Formik
          initialValues={{ product: "" }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ errors }) => (
            <Form>
              {isUpdateProcess && (
                <>
                  <FormControl sx={{ mb: 2 }} variant="outlined">
                    <TextField
                      sx={{
                        width: { sm: 200, md: 450 },
                      }}
                      label={`New Product`}
                      variant="outlined"
                      name="product"
                      id="product"
                      type="text"
                      value={newProduct}
                      onChange={() => setNewProduct(event.target.value)}
                      helperText={errors.product ?? ""}
                    />
                  </FormControl>
                  <Button
                    sx={styles.addMore}
                    onClick={addNewProduct}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    + Add New Product
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
        {isUpdateProcess ? (
          <Button
            type="submit"
            variant="contained"
            sx={{ ...styles.submit, mb: 3 }}
            onClick={handleUpdateCategory}
          >
            Update Category
          </Button>
        ) : (
          <Box sx={styles.displayFlex}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ...styles.submit, mb: 3, mt: 2 }}
              onClick={handleEdit}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
