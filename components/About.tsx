import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function About({ color, avatar }) {
  return (
    <Flex
      w="100%"
      mt="5em"
      pb="10"
      mb="5"
      alignItems="center"
      justifyContent="space-around"
      borderBottom={`1px solid ${color}`}
    >
      <Avatar margin="2" size="xl" name="gidoong" src={avatar} />

      <Flex flexDirection="column">
        const krapjost = {'{'}
        <Text ml="8"> name: "gidoong",</Text>
        <Text ml="8"> hobby: "gardening",</Text>
        <Text ml="8"> canCode: true,</Text>
        <Text ml="8"> canSwim: false</Text>
        {'}'}
      </Flex>
    </Flex>
  );
}

export default About;
