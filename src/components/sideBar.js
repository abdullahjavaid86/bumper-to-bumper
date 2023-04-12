import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Fragment, useState } from "react";

import AddCategory from "@/dialogs/addCategory";
import CategoryDetails from "@/dialogs/categoryDetails";
import InboxIcon from "@mui/icons-material/Inbox";
import { PRODUCT_CATEGORY } from "@/constants/productCategories";

const styles = {
  addButton: {
    letterSpacing: "2px",
    fontWeight: "bold",
    mb: 2,
  },
};

export default function SideBar(props) {

  const { setSelectedCategory } = props;
  const [categoryList, setCategoryList] = useState(PRODUCT_CATEGORY);
  const [openNewCategory, setOpenNewCategory] = useState(false);
  const [openCategoryDetails, setOpenCategoryDetails] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const handleOpenNewCategoryModal = () => {
    setOpenNewCategory(true);
  };

  const handleCloseNewCategoryModal = () => {
    setOpenNewCategory(false);
  };

  const handleOpenCategoryDetails = (item) => {
    setDialogData(item);
    setOpenCategoryDetails(true);
  };

  const handleCloseCategoryDetails = () => {
    setDialogData({});
    setOpenCategoryDetails(false);
  };

  const addCategoryItem = (categoryName, products) => {
    setCategoryList([
      ...categoryList,
      {
        id: categoryList.length + 1,
        category: categoryName,
        products,
      },
    ]);
  };

  const updateCategoryItem = (id, products) => {
    setCategoryList(
      categoryList.map((category) =>
        category.id === id ? { ...category, products } : category
      )
    );
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            {categoryList.length ? (
              categoryList.map((item) => (
                <Fragment key={item.id}>
                  <ListItem
                    onClick={() => handleOpenCategoryDetails(item)}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item.category}`}
                        sx={{
                          color: "#000",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))
            ) : (
              <span style={{ color: "red" }}>No Categories Found!</span>
            )}
          </List>
        </nav>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15%",
          }}
        >
          <Button
            onClick={handleOpenNewCategoryModal}
            variant="contained"
            sx={styles.addButton}
          >
            Add New Product Category
          </Button>
        </Box>
      </Box>
      <AddCategory
        open={openNewCategory}
        handleClose={handleCloseNewCategoryModal}
        addItem={addCategoryItem}
      />
      <CategoryDetails
        open={openCategoryDetails}
        handleClose={handleCloseCategoryDetails}
        itemData={dialogData}
        upDateItem={updateCategoryItem}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}
