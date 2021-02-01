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

  const bg = useColorModeValue('#e4dacd', '#30201b');
  const contentBg = useColorModeValue('#fff', '#150200');
  const tagBg = useColorModeValue('#f9f2e7', '#4f4d31');
  const divider = useColorModeValue('#b9a792', '#30201b');
  const textColor = useColorModeValue('#30201b', '#e4d9cd');
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <Container padding="5" maxW="800px" bg={bg} centerContent>
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
              padding="2"
              borderRadius="md"
              boxShadow="md"
              bg={contentBg}
              key={post.slug}
            >
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>
                  <Flex justifyContent="space-between" alignItems="center">
                    <motion.div
                      style={{
                        margin: '1.5rem',
                      }}
                    >
                      <Box
                        borderRadius="md"
                        overflow="hidden"
                        position="relative"
                        boxShadow={`-0.5em -0.5em 0 0.1em ${bg}`}
                        w="2em"
                        h="2em"
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
                      size="lg"
                      bgGradient="linear(to-r, #8c6e5a, #6d5346)"
                      bgClip="text"
                      pr="1"
                      lineHeight="1.7em"
                      w="100%"
                      isTruncated
                    >
                      {post.title}
                    </Heading>
                  </Flex>
                </a>
              </Link>
              <Divider borderColor={divider} />

              <Text color={textColor} fontSize=".5em" padding="2" isTruncated>
                {post.excerpt}
              </Text>
              <Divider borderColor={divider} />

              <Text
                color={textColor}
                display="flex"
                fontSize=".5em"
                padding="1"
                alignItems="center"
                justifyContent="flex-end"
                isTruncated
              >
                <Tag
                  mr="2"
                  fontSize=".5em"
                  fontWeight="bold"
                  variant="solid"
                  color={textColor}
                  bg={tagBg}
                >
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
