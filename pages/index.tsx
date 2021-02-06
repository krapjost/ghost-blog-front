import Link from 'next/link';
import {
  Container,
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Tag,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';
import Image from 'next/image';

import Navigation from '../components/Navigation';
import Header from '../components/Header';
import RippleButton from '../components/RippleButton';

import { FiTag, FiEdit3, FiBookOpen } from 'react-icons/fi';
import { useEffect } from 'react';
const { CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  reading_time: string;
  feature_image: string;
  primary_author: primary_;
  primary_tag: primary_;
  tags: [tags_];
};
class tags_ {
  id: string;
  name: string;
}
class primary_ {
  name: string;
  profile_image: string;
}

async function getPosts() {
  const res = await fetch(
    `https://krapjost.xyz/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&include=tags,authors`,
  ).then((res) => res.json());

  const posts = res.posts;
  console.log(posts);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return { props: { posts } };
};

const Home: React.FC<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;
  const profile_image = posts[0].primary_author.profile_image;

  const tagBg = useColorModeValue('brown.100', 'brown.800');
  const divider = useColorModeValue('black', 'white');
  const color = useColorModeValue('brown.900', 'brown.100');

  return (
    <Container
      maxW="800px"
      w="100%"
      padding="2"
      pt="12"
      transition="background-color 0.2s"
      centerContent
    >
      <Header avatar={profile_image} />
      <List
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        {posts.map(
          (post): JSX.Element => (
            <ListItem
              boxShadow={`0 0 0 1px ${divider} inset`}
              mb="0"
              padding="0"
              key={post.slug}
            >
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>
                  <RippleButton>
                    <Heading
                      pl="10"
                      size="lg"
                      // color="inherit"
                      textDecoration="underline"
                      _active={{ color: 'blue.500' }}
                      lineHeight="1.7em"
                      isTruncated
                    >
                      {post.title}
                    </Heading>
                    <Text color={color} margin="5" mb="0">
                      {post.excerpt}
                    </Text>
                  </RippleButton>
                </a>
              </Link>
              <Divider borderColor={divider} />

              <Flex margin="2" alignItems="center">
                <ListIcon ml="3" as={FiTag} />
                {post.tags[0]
                  ? post.tags.map((tag) => (
                      <Tag
                        ml="5"
                        fontSize=".6em"
                        fontWeight="bold"
                        variant="outline"
                        color={color}
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor={color}
                        boxShadow="none"
                        _hover={{
                          cursor: 'pointer',
                          backgroundColor: tagBg,
                        }}
                      >
                        {tag.name}
                      </Tag>
                    ))
                  : null}
              </Flex>

              <Divider borderColor={divider} />

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

      <Navigation />
    </Container>
  );
};

export default Home;
