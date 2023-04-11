import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  DialogTitle,
  Dialog,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  FormControl,
  TextField,
  Checkbox,
} from "@mui/material";
import CloseIcon from "../icons/closeIcon";
import RemoveIcon from "@/icons/removeIcon";

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
    letterSpacing: "2px",
    fontWeight: "bold",
    mt: 3,
    mb: 5,
  },
  addMore: {
    letterSpacing: "1px",
    fontWeight: "bold",
    backgroundColor: "#2CB23B",
    color: "white",
    mb: 2,
  },
};

export default function CategoryDetails(props) {
  const { open, handleClose, itemData, upDateItem, setSelectedCategory } = props;
  const [newProduct, setNewProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isUpdateProcess, setIsUpdateProcess] = useState(true);
  const [messege, setMessege] = useState("");

  const handleCloseDialog = () => {
    handleClose();
    setSelectedProducts([]);
    setIsUpdateProcess(true);
  }

  const handleProcessType = () => {
    setIsUpdateProcess(!isUpdateProcess);
    setSelectedProducts([]);
  };

  const handleSelectedProduct = (product) => {
    const isExistingProduct = selectedProducts.find(p => p.id === product.id);
    if (isExistingProduct) {
      const filterSelectedProducts= selectedProducts.filter(p => p.id !== product.id);
      setSelectedProducts(filterSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  const handleEdit = () => {
    setSelectedCategory({ id: itemData.id, category: itemData.category, products: selectedProducts });
    handleCloseDialog();
  }

  const handleDeleteProducts = (id) => {
    const filterProducts = products.filter((product) => product.id !== id);
    setProducts(filterProducts);
    setMessege("Product has been deleted successfully");
    setTimeout(() => {
      setMessege("");
    }, 3000);
  };

  const addNewProduct = () => {
    if (!newProduct) return;
    setProducts([...products, {id: products.length + 1, name: newProduct.trim().length? newProduct : "No Name"}]);
    setNewProduct("");
    setMessege("New Product has been added successfully");
    setTimeout(() => {
      setMessege("");
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
        Category Products Details
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
          {isUpdateProcess && (
            <Button
              variant="contained"
              sx={styles.submit}
              onClick={handleProcessType}
            >
              Edit
            </Button>
          )}
        </Box>
        <p style={styles.product}>Products:</p>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {products?.length ? (
                products.map((product, index) => (
                  <>
                    <ListItem key={index} disablePadding>
                      {!isUpdateProcess &&
                        <Checkbox 
                          color="success"
                          onClick={() => {handleSelectedProduct(product)}}
                        />
                      }
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
                  </>
                ))
              ) : (
                <span style={{ color: "red" }}>
                  No Products Found of that category!
                </span>
              )}
            </List>
            {messege && <span style={{ color: "#2CB23B" }}>{messege}</span>}
          </nav>
        </Box>
        {isUpdateProcess && <p style={styles.product}>Add New Products:</p>}
        <Formik
          initialValues={{ product: "" }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ errors }) => (
            <>
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
            </>
          )}
        </Formik>
        {isUpdateProcess ? (
          <Button
            type="submit"
            variant="contained"
            sx={styles.submit}
            onClick={handleUpdateCategory}
          >
            Update Category
          </Button>
        ) : (
          <Box sx={styles.displayFlex}>
            <Button type="submit" variant="contained" sx={styles.submit} onClick={handleEdit}>
              Edit
            </Button>
            <Button
              sx={styles.submit}
              variant="contained"
              onClick={handleProcessType}
            >
              {"<Back"}
            </Button>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
