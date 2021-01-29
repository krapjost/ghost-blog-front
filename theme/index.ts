// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';
// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  body: "Nanum Gothic Coding, monospace",
  heading: 'Noto Sans KR, sans-serif',
  mono: "Nanum Gothic Coding, monospace"
};



// 3. extend the theme
const theme = extendTheme({ config, fonts });

export default theme;
