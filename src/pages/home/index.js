import React, { useContext } from "react";

import { ImageSelectionContext } from "@/contexts/image-selection-context";

export default function Home() {
  const { images, onSearch, setSelected } = useContext(ImageSelectionContext);

  const onImageSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="home">
      <h1>Select Image</h1>
      <input
        type="text"
        placeholder="Search for trucks"
        onChange={onImageSearch}
      />
      <div className="flex-container">
        {images.map((item) => (
          <div
            key={item.title}
            className="cardSelection"
            onClick={() => setSelected(item, true)}
          >
            <img src={item.image} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
