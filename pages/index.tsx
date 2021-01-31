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

import { FiEdit3, FiBookOpen } from 'react-icons/fi';
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
};

class primary_ {
  name: string;
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
  const brown = {
    50: '#f9f2e7',
    100: '#e4d9cd',
    200: '#cec2b0',
    300: '#b9a792',
    400: '#a68b75',
    500: '#8c6e5a',
    600: '#6d5346',
    700: '#4f3931',
    800: '#30201b',
    900: '#150200',
  };
  const green = {
    50: '#f9f4e7',
    100: '#e4dacd',
    200: '#cec2b0',
    300: '#b9ad92',
    400: '#a69875',
    500: '#8c825a',
    600: '#6d6846',
    700: '#4f4d31',
    800: '#2f301b',
    900: '#151500',
  };
  const bg = useColorModeValue('#b9a792', '#30201b');
  const tagBg = useColorModeValue('#a69875', '#4f4d31');
  const darkerBg = useColorModeValue('#e4d9cd', '#150200');
  const divider = useColorModeValue('#b9a792', '#30201b');
  const textColor = useColorModeValue('#30201b', '#e4d9cd');
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <Container padding="5" maxW="100%" bg={bg} centerContent>
      {/* <Avatar
        size="2xl"
        name={posts[0].primary_author.name}
        src="https://bit.ly/sage-adebayo"
      />
      <Box mb="10">{posts[0].primary_author.name}</Box> */}
      <List
        display="flex"
        maxW="100%"
        flexDirection="column"
        justifyContent="space-around"
      >
        {posts.map(
          (post): JSX.Element => (
            <ListItem
              w="100%"
              maxW="800px"
              mb="5"
              padding="5"
              borderRadius="md"
              boxShadow="md"
              bg={darkerBg}
              key={post.slug}
            >
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>
                  <Flex justifyContent="space-between" alignItems="center">
                    <motion.div
                      style={{
                        margin: '1.5rem',
                      }}
                      // animate={{ rotateY: 360 }}
                      // transition={{
                      //   duration: 3,
                      //   repeat: 1,
                      //   type: 'tween',
                      //   ease: 'backInOut',
                      //   repeatType: 'loop',
                      // }}
                    >
                      <Box
                        borderRadius="md"
                        overflow="hidden"
                        position="relative"
                        boxShadow={`-0.5em -0.5em 0 0.1em ${bg}`}
                        // border={`2px solid ${bg}`}
                        w="3.5em"
                        h="3.5em"
                      >
                        <Image
                          src={
                            post.feature_image ||
                            'https://static.ghost.org/v3.0.0/images/welcome-to-ghost.png'
                          }
                          alt="feature_image"
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    </motion.div>
                    <Heading
                      size="2xl"
                      bgGradient="linear(to-r, #8c6e5a, #6d5346)"
                      bgClip="text"
                      pr="5"
                      lineHeight="1.7em"
                      h="40px"
                      w="100%"
                      isTruncated
                    >
                      {post.title}
                    </Heading>
                  </Flex>
                </a>
              </Link>
              <Divider borderColor={divider} />

              <Text color={textColor} fontSize="1em" padding="5" isTruncated>
                {post.excerpt}
              </Text>
              <Divider borderColor={divider} />

              <Text
                color={textColor}
                display="flex"
                fontSize=".8em"
                padding="5"
                alignItems="center"
                justifyContent="flex-end"
                isTruncated
              >
                <Tag mr="2" variant="solid" color={textColor} bg={tagBg}>
                  {post.primary_tag ? post.primary_tag.name : 'no tag'}
                </Tag>
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
