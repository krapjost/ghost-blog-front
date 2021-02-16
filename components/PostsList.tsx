import {
  List,
  ListItem,
  ListIcon,
  Flex,
  Tag,
  Text,
  Heading,
} from '@chakra-ui/react';
import { FiTag, FiEdit3, FiBookOpen } from 'react-icons/fi';

import RippleButton from './RippleButton';

import Link from 'next/link';
import React from 'react';

function PostsList({ color, currentPosts }) {
  return (
    <List
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      {currentPosts.map(
        (post): JSX.Element => (
          <ListItem mb="5" key={post.slug}>
            <Flex margin="2" alignItems="center">
              <ListIcon ml="3" as={FiTag} />
              {post.tags[0] ? (
                post.tags.map((tag) => (
                  <Tag
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
                      transform: 'translateY(-1px)',
                    }}
                  >
                    {tag.name}
                  </Tag>
                ))
              ) : (
                <Tag
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
                    transform: 'translateY(-1px)',
                  }}
                >
                  null
                </Tag>
              )}
            </Flex>

            {/* <Divider borderColor={color} /> */}

            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
              <a>
                <RippleButton>
                  <Heading
                    pl="10"
                    size="lg"
                    textDecoration="underline"
                    lineHeight="1.7em"
                    isTruncated
                  >
                    {post.title}
                  </Heading>
                  <Text noOfLines={3} color={color} margin="5" mb="0">
                    {post.excerpt}
                  </Text>
                </RippleButton>
              </a>
            </Link>
            {/* <Divider borderColor={color} /> */}

            <Text
              color={color}
              display="flex"
              fontSize=".8em"
              padding="1"
              pr="3"
              alignItems="center"
              justifyContent="flex-end"
              isTruncated
            >
              <ListIcon mr="2" ml="2" as={FiBookOpen} />
              {post.reading_time} 분
              <ListIcon mr="2" ml="2" as={FiEdit3} />
              {new Date(post.published_at).toLocaleString()}
            </Text>
          </ListItem>
        ),
      )}
    </List>
  );
}

export default PostsList;
