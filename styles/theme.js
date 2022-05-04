import { createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette: {
      primary: {
        light: "#41b6e6",
        main: "#0066cc",
      },
      secondary: {
        light: "#fed141",
        main: "#eaaa00",
        dark: "#FFdd00",
      },
      tertiary: {
        main: "#fff",
      }
    },
  });

export default theme;