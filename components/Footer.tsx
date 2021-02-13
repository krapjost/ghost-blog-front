import React from 'react';
import {
  Container,
  Divider,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Icon,
  Text,
  Tag,
  useColorMode,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FiGithub, FiGitlab, FiBookOpen } from 'react-icons/fi';
import { DiGhostSmall } from 'react-icons/di';

function Footer({ color }) {
  return (
    <Flex
      boxShadow={`0 0 0 1px ${color}`}
      mt="5"
      padding="10"
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex pb="5" w="100%" justifyContent="space-around">
        <Box>krap's posts</Box>
        <List>
          <ListItem>
            <a href="https://github.com/krapjost" target="_blank" role="link">
              <ListIcon mr="2" ml="2" as={FiGithub} />
              github{' '}
            </a>
          </ListItem>
          <ListItem>
            <a
              href="https://gitlab.com/gidoong_park"
              target="_blank"
              role="link"
            >
              <ListIcon mr="2" ml="2" as={FiGitlab} />
              gitlab
            </a>
          </ListItem>
        </List>
      </Flex>
      <Box>
        <Text fontSize="md">
          powered by{' '}
          <a href="https://ghost.org/" target="_blank" role="link">
            ghost <Icon as={DiGhostSmall} />
          </a>
        </Text>
        <Text fontSize="md">all rights reserved</Text>
      </Box>
    </Flex>
  );
}

export default Footer;
