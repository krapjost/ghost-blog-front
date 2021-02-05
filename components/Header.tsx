import {
  Avatar,
  Flex,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';

function Header({ avatar, header = "krapjost's Blog" }) {
  const bg = useColorModeValue('#fff', '#000');
  const shadow = useColorModeValue('#00000050', '#ffffff50');

  return (
    <Flex
      bg={bg}
      position="fixed"
      top="0"
      w="100%"
      zIndex="banner"
      alignItems="center"
      boxShadow={`0px 5px 10px -5px ${shadow}`}
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
        colorScheme="blue"
      ></Switch>
    </Flex>
  );
}

export default Header;
