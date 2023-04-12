import { PRODUCT_IMAGES } from "@/constants/images";
import CloseIcon from "@/icons/closeIcon";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Fragment } from "react";
import Image from "next/image";

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
  image: {
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "5%",
    marginBottom: "2%",
  },
};

export default function ImageSelector(props) {
  const { open, handleClose, onSelectImage } = props;

  const handleSelectImage = (imageSrc) => {
    onSelectImage(imageSrc);
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm" scroll="body">
      <DialogTitle sx={styles.title}>
        Select Image
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
      <Box sx={styles.displayCenter}>
        <p style={styles.image}>Sample Product Images:</p>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {PRODUCT_IMAGES?.length
                ? PRODUCT_IMAGES.map((image, index) => (
                    <Fragment key={index}>
                      <ListItem
                        disablePadding
                        onClick={() => {
                          handleSelectImage(image.src);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <Image src={image.src} width={50} height={50}/>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemButton>
                          <ListItemText
                            primary={`${image.title}`}
                            secondary={`${image.description}`}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))
                : null}
            </List>
          </nav>
        </Box>
      </Box>
    </Dialog>
  );
}
