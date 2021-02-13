import { Flex, Box, List, Tag } from '@chakra-ui/react';
import React from 'react';

function filterByTagName(e, setFilteredPosts, posts) {
  const target = e.target.innerText;
  // posts에서 target 태그와 겹치는 post만 필터링해서 filteredPosts에 넣는다.
  const filteredPosts = [];

  console.log('posts?', posts);
  if (target === 'All') {
    setFilteredPosts(posts);
  } else {
    posts.map((post) => {
      post.tags[0]
        ? post.tags.map((tag) => {
            console.log('tag.name?', tag.name);
            tag.name === target ? filteredPosts.push(post) : null;
          })
        : target === 'null'
        ? filteredPosts.push(post)
        : null;
    });
    setFilteredPosts(filteredPosts);
  }

  console.log('targetIs', target);
}
function TagsList({ color, tags, setFilteredPosts, posts }) {
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
          onClick={(e) => filterByTagName(e, setFilteredPosts, posts)}
        >
          All
        </Tag>
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
            onClick={(e) => filterByTagName(e, setFilteredPosts, posts)}
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
          onClick={(e) => filterByTagName(e, setFilteredPosts, posts)}
        >
          null
        </Tag>
      </List>
    </Flex>
  );
}

export default TagsList;
