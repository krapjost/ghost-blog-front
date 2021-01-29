import Link from 'next/link';
import {
  Container,
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  ListIcon,
  Icon,
  IconButton,
  Wrap,
  WrapItem,
  Center,
  Avatar,
  Text,
  Tag,
  Button,
  useColorMode,
  useColorModeValue,
  Flex,
  position,
} from '@chakra-ui/react';
import {
  motion,
  useCycle,
  AnimateSharedLayout,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { FiEdit3, FiBookOpen, FiCircle, FiMoon, FiSun } from 'react-icons/fi';
const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  reading_time: string;
  feature_image: string;
  primary_author: object;
  primary_tag: object;
};

async function getPosts() {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&include=tags,authors`,
  ).then((res) => res.json());

  const posts = res.posts;
  console.log(posts[0].primary_author);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return { props: { posts } };
};

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => (
  <Button
    outline="none"
    border="none"
    boxShadow="0px 0px 0px 2px black"
    cursor="pointer"
    position="fixed"
    top="85vh"
    width="4em"
    height="4em"
    borderRadius="50%"
    background="white"
    onClick={toggle}
    _active={{
      boxShadow: '0px 0px 10px 2px black',
    }}
    _focus={{
      boxShadow: '0px 0px 2px 2px black',
    }}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </Button>
);

const navItem = {
  open: {
    scale: 1,
    y: 0,
    transition: {
      delay: 0,
      type: 'tween',
    },
  },
  closed: {
    scale: 0,
    y: 20,
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const dragBackground = {
  open: {
    scale: 1,
    opacity: 1,
  },
  closed: {
    scale: 0,
    opacity: 0,
  },
};

function RotateOnDragComponent() {
  const x = useMotionValue(0);
  const input = [-200, 0, 200];
  const output = [-90, 0, 90];
  const rotate = useTransform(x, input, output);

  const { colorMode, toggleColorMode } = useColorMode();

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={{
          rotate,
          position: 'fixed',
          top: '85vh',
          width: '4em',
          height: '4em',

          borderRadius: '500px',

          backgroundColor: '#ede090',
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{
            left: -200,
            right: 200,
          }}
          variants={dragBackground}
          style={{
            x,
            position: 'relative',
            top: '-5000px',
            left: '-5000px ',
            width: '10000px',
            height: '10000px',
            backgroundColor: '#00000060',
            zIndex: 10,
          }}
        />
        <motion.div
          variants={navItem}
          style={{
            position: 'absolute',
            top: '-80px',
            left: '0px',
            width: '4em',
            height: '4em',
            borderRadius: '50%',
            backgroundColor: '#cd30de',
            zIndex: 11,
          }}
        />
        <motion.div
          variants={navItem}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '80px',
            width: '4em',
            height: '4em',
            borderRadius: '50%',
            backgroundColor: '#cd30de',
            zIndex: 11,
          }}
        >
          <Icon
            w="4em"
            h="4em"
            padding="1em"
            onClick={() => toggleColorMode()}
            as={colorMode === 'light' ? FiSun : FiMoon}
          />
        </motion.div>
        <motion.div
          variants={navItem}
          style={{
            position: 'absolute',
            top: '-40px',
            left: '80px',
            width: '4em',
            height: '4em',
            borderRadius: '50%',
            backgroundColor: '#cd30de',
            zIndex: 11,
          }}
        />
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </>
  );
}

const Home: React.FC<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;
  const bg = useColorModeValue('#ffffff50', '#00000050');
  const bgHover = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('gray.900', 'gray.100');
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <Container padding="10" maxW="100%" bg={bg} centerContent>
      <Avatar
        size="2xl"
        name={posts[0].primary_author.name}
        src="https://bit.ly/sage-adebayo"
      />
      <Box mb="10">{posts[0].primary_author.name}</Box>
      <List
        display="flex"
        maxW="100%"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {posts.map(
          (post): JSX.Element => (
            <ListItem
              w="100%"
              maxW="600px"
              mb="10"
              borderRadius="md"
              boxShadow="md"
              key={post.slug}
            >
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Heading
                      size="xl"
                      bgGradient="linear(to-r, gray.600, blue.600)"
                      _hover={{
                        bgGradient: 'linear(to-r, purple.500, orange.500)',
                      }}
                      bgClip="text"
                      ml="10"
                      w="60%"
                      isTruncated
                    >
                      {post.title}
                    </Heading>
                    <motion.div
                      style={{
                        width: '80px',
                        marginRight: '2.5rem',
                      }}
                      animate={{ rotateY: 360 }}
                      transition={{
                        duration: 3,
                        repeat: 1,
                        type: 'tween',
                        ease: 'backInOut',
                        repeatType: 'loop',
                      }}
                    >
                      <Box
                        borderRadius="full"
                        overflow="hidden"
                        position="relative"
                        w="80px"
                        h="80px"
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
                  </Flex>
                </a>
              </Link>
              <Text noOfLines={2} fontSize="md" padding="5" isTruncated>
                {post.excerpt}
              </Text>
              <Divider />

              <Text fontSize="sm" padding="5" align="right" isTruncated>
                <Tag variant="outline" colorScheme="blue">
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
      <Box
        pos="fixed"
        // bg="#00000090"
        // w="5em"
        // h="5em"
        // overflow="hidden"
        top="85vh"
      ></Box>

      <RotateOnDragComponent />
    </Container>
  );
};

export default Home;
