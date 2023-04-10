import "@/styles/globals.css";
import "@/styles/style.css";

import { ImageSelectionContextProvider } from "@/contexts/image-selection-context";

export default function App({ Component, pageProps }) {
  return (
    <ImageSelectionContextProvider>
      <Component {...pageProps} />
    </ImageSelectionContextProvider>
  );
}
