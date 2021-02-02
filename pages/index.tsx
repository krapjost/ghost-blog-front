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

import { FiTag, FiEdit3, FiBookOpen } from 'react-icons/fi';
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
}

async function getPosts() {
  const res = await fetch(
    `https://krapjost.xyz/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&include=tags,authors`,
  ).then((res) => res.json());

  const posts = res.posts;
  console.log(posts[0].tags[0]);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return { props: { posts } };
};

const Home: React.FC<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;

  const bg = useColorModeValue('white', 'brown.900');
  const tagBg = useColorModeValue('brown.100', 'brown.800');
  const divider = useColorModeValue('#b9a792', '#30201b');
  const color = useColorModeValue('brown.900', 'brown.100');

  return (
    <Container
      maxW="800px"
      padding="0"
      bg={bg}
      transition="background-color 0.2s"
      centerContent
    >
      {/* <Text w="90%" fontSize="md">
        {JSON.stringify(posts[0].tags, null, 2)}
      </Text> */}
      {/* <Avatar
        size="2xl"
        name={posts[0].primary_author.name}
        src="https://bit.ly/sage-adebayo"
      />
      <Box mb="10">{posts[0].primary_author.name}</Box> */}
      <List display="flex" flexDirection="column" justifyContent="space-around">
        {posts.map(
          (post): JSX.Element => (
            <ListItem
              // boxShadow="lg"
              borderBottom={`1px solid ${divider}`}
              mb="0"
              padding="0"
              // bg={bg}
              key={post.slug}
            >
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>
                  <Heading
                    mt="5"
                    size="xl"
                    color="brown.600"
                    textAlign="center"
                    _hover={{ color: color }}
                    _active={{ color: 'blue.500' }}
                    lineHeight="1.7em"
                    isTruncated
                  >
                    {post.title}
                  </Heading>
                </a>
              </Link>

              <Text color={color} fontSize=".7em" margin="5">
                {post.excerpt}
              </Text>

              <Flex margin="5" fontSize=".9em" alignItems="center">
                <ListIcon as={FiTag} />
                {post.tags[0]
                  ? post.tags.map((tag) => (
                      <Tag
                        ml="3"
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
                fontSize=".5em"
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
