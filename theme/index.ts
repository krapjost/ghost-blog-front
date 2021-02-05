import { extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools"

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
   brown : {
    50: '#f9f2e7',
    100: '#e4d9cd',
    200: '#cec2b0',
    300: '#b9a792',
    400: '#a68b75',
    500: '#8c6e5a',
    600: '#6d5346',
    700: '#4f3931',
    800: '#30201b',
    900: '#150200',
  },
   green : {
    50: '#f9f4e7',
    100: '#e4dacd',
    200: '#cec2b0',
    300: '#b9ad92',
    400: '#a69875',
    500: '#8c825a',
    600: '#6d6846',
    700: '#4f4d31',
    800: '#2f301b',
    900: '#151500',
  },
}

const fonts = {
  body: "Nanum Gothic Coding, monospace",
  heading: 'Noto Sans KR, sans-serif',
  mono: "Nanum Gothic Coding, monospace"
};


const styles = {
  global: (props)=>({

      body: {
        fontFamily: "body",
        color: mode("black", "whiteAlpha.900")(props),
        bg: mode("white", "black")(props),
        transition: "background-color 0.2s",
        lineHeight: "base"
      },
      "*::placeholder": {
        color: mode("green.400", "whiteAlpha.400")(props)
      },
      "*, *::before, &::after": {
        borderColor: mode("green.200", "whiteAlpha.300")(props),
        wordWrap: "break-word"
      }
      
    }  
  )}


// 3. extend the theme
const theme = extendTheme({ config, fonts, colors, styles });

export default theme;
