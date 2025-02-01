import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import "@fontsource/ibm-plex-sans";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";

// Garantir que os estilos do slick-carousel sejam carregados apenas no cliente
if (typeof window !== "undefined") {
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
