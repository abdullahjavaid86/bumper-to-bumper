import { createContext, useState } from "react";

import { IMAGE_SELECTION } from "@/constants/images";
import { useRouter } from "next/router";

export const ImageSelectionContext = createContext(null);

export const ImageSelectionContextProvider = ({ children }) => {
  const [item, setSelectedItem] = useState({});
  const [imagesList, setImagesList] = useState(IMAGE_SELECTION);
  const { push } = useRouter();

  /**
   *
   * @param {string} query
   */
  const onSearch = (query) => {
    setImagesList(
      IMAGE_SELECTION.filter((item) =>
        item.title.toLowerCase().includes(query.toLocaleLowerCase())
      )
    );
  };

  /**
   *
   * @param {typeof IMAGE_SELECTION[0]} item
   */
  const onItemSelect = (item, redirectToEditor) => {
    setSelectedItem(item);
    if (redirectToEditor) {
      push("/editor");
    }
  };

  return (
    <ImageSelectionContext.Provider
      value={{
        selected: item,
        setSelected: onItemSelect,
        onSearch,
        images: imagesList,
      }}
    >
      {children}
    </ImageSelectionContext.Provider>
  );
};
