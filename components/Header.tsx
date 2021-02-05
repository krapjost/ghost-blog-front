import {
  Avatar,
  Flex,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';

function Header({ avatar, header = "krapjost's Blog" }) {
  const bg = useColorModeValue('#00000010', '#ffffff10');

  return (
    <Flex
      bg={bg}
      position="fixed"
      top="0"
      w="100%"
      zIndex="banner"
      alignItems="center"
      justifyContent="space-between"
    >
      <Avatar margin="2" size="sm" name="gidoong" src={avatar} />
      <Text fontWeight="bold">{header}</Text>
      <Switch
        outline="0"
        border="none"
        boxShadow="none"
        isFocusable={false}
        _focus={{
          boxShadow: 'none',
          outline: '0',
        }}
        margin="2"
        colorScheme="whiteAlpha"
      ></Switch>
    </Flex>
  );
}

export default Header;
