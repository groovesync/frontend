import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#f5f7ff",
    100: "#e4e9ff",
    200: "#c3cbff",
    300: "#a2adff",
    400: "#EAE8FF", // Lilac
    500: "#153243", // Blue
    600: "#4b58b0",
    700: "#343f80",
    800: "#1d2750",
    900: "#060f20",
  },
};

const fonts = {
  heading: `'IBM Plex Sans', sans-serif`,
  body: `'IBM Plex Sans', sans-serif`,
};

const theme = extendTheme({
  colors,
  fonts,
});

export default theme;
