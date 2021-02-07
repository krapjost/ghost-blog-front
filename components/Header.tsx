import {
  Avatar,
  Flex,
  Switch,
  Text,
  useColorModeValue,
  useColorMode,
  Circle,
  Icon,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { motion, useCycle } from 'framer-motion';

import React from 'react';

const ColorModeSwitch = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toggleButton = useColorModeValue('#151500', '#f9f4e7');

  const [isLight, setColor] = useCycle(true, false);
  const colorModeIs = {
    light: {
      x: 2,
    },
    dark: {
      x: 14,
    },
  };

  return (
    <Flex
      w="2.5em"
      h="1.5em"
      alignItems="center"
      borderRadius="9999px"
      boxShadow={`0px 0px 0px 1px ${toggleButton}`}
      cursor="pointer"
      position="relative"
      onClick={() => {
        setColor();
        toggleColorMode();
      }}
      {...props}
    >
      <motion.div initial={false} animate={isLight ? 'light' : 'dark'}>
        <motion.div variants={colorModeIs}>
          <Circle
            bg={isLight ? 'black' : 'white'}
            // margin="0.2em"
            w="1.5em"
            h="1.5em"
          >
            <Icon
              as={isLight ? FiSun : FiMoon}
              // background="#3fed30"

              // padding=".1em"
              color={isLight ? 'white' : 'black'}
            />
          </Circle>
        </motion.div>
      </motion.div>
    </Flex>
  );
};

function Header({ avatar, header = "krapjost's Blog" }) {
  const bg = useColorModeValue('#fff', '#000');
  const shadow = useColorModeValue('#000000', '#ffffff');
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      bg={bg}
      position="fixed"
      top="0"
      w="100%"
      zIndex="banner"
      alignItems="center"
      boxShadow={`0px 0px 0px 1px ${shadow}`}
      justifyContent="space-between"
    >
      <Avatar margin="2" ml="5" size="sm" name="gidoong" src={avatar} />
      <Text fontWeight="bold">{header}</Text>
      <ColorModeSwitch mr="5" />
    </Flex>
  );
}

export default Header;
