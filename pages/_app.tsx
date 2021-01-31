import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/index';
import '../theme/post.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
