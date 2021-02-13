import { Flex, Box, List, Tag } from '@chakra-ui/react';
import React from 'react';

function TagsList({ color, tags }) {
  return (
    <Flex
      pt="5"
      pb="5"
      mb="5"
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow={`-5px 0 0 -1px ${color}`}
    >
      <Box pb="5">tags : </Box>
      <List>
        {tags.map((tag) => (
          <Tag
            position="relative"
            transition="all 200ms"
            key={tag.id}
            ml="2"
            fontSize=".6em"
            fontWeight="bold"
            variant="outline"
            color={color}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={color}
            borderRadius="0"
            boxShadow={`2px 2px 1px -1px ${color}`}
            _hover={{
              boxShadow: `2px 2px 1px 0px ${color}`,
              cursor: 'pointer',
              transform: 'scale(1.2,1.2)',
              // width: '100px',
            }}
          >
            {tag.name ? tag.name : null}
          </Tag>
        ))}
        <Tag
          ml="2"
          fontSize=".6em"
          transition="all 200ms"
          fontWeight="bold"
          variant="outline"
          color={color}
          borderWidth="1px"
          borderStyle="solid"
          borderColor={color}
          borderRadius="0"
          boxShadow={`2px 2px 1px -1px ${color}`}
          _hover={{
            boxShadow: `2px 2px 1px 0px ${color}`,
            cursor: 'pointer',
            transform: 'scale(1.2,1.2)',
          }}
        >
          null
        </Tag>
      </List>
    </Flex>
  );
}

export default TagsList;
