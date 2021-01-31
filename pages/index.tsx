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
import { ProfilerOnRenderCallback, useEffect, useRef, useState } from 'react';

import {
  FiEdit3,
  FiBookOpen,
  FiSearch,
  FiArchive,
  FiMoon,
  FiSun,
} from 'react-icons/fi';
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
    stroke={props.color}
    strokeLinecap="round"
    {...props}
  />
);

const navItem = {
  open: {
    scale: 1,
    y: 0,
    transition: {
      delay: 0,
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
  closed: {
    scale: 0,
    y: 90,
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 500,
      damping: 40,
    },
  },
};

function RotateOnDragComponent() {
  const controllerY = useMotionValue(0);
  const inputY = [-30, 0];
  const outputY = [-80, 0];
  const menuY = useTransform(controllerY, inputY, outputY);
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('#f9f4e7', '#151500');
  const bg = useColorModeValue('#2f301bbf', '#f9f4e7bf');
  const bgHover = useColorModeValue('#30201bef', '#f9f4e7');
  const [rectY, setRectY] = useState(0);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      {/* NAVIGATION_CONTAINER */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={{
          position: 'fixed',
          top: '85vh',
          right: '5vw',
        }}
      >
        {/* NAVIGATION_ */}
        <Button
          outline="none"
          borderRadius="0"
          _active={{ boxShadow: 'none' }}
          _focus={{
            outline: 'none',
            boxShadow: 'none',
          }}
          _hover={{ backgroundColor: bgHover }}
          cursor="pointer"
          padding="2"
          w="50px"
          h="50px"
          bg={bg}
          onClick={() => toggleOpen()}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <Path
              color={color}
              variants={{
                closed: { d: 'M 38 2 L 38 38' },
                open: { d: 'M 30 10 L 10 30' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 2 L 2 38' },
                open: { d: 'M 20 20 L 20 20' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 38 L 38 38' },
                open: { d: 'M 20 20 L 20 20' },
              }}
            />
            <Path
              color={color}
              variants={{
                closed: { d: 'M 2 2 L 38 2' },
                open: { d: 'M 10 10 L 30 30' },
              }}
            />
          </svg>

          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-12em',
            }}
          >
            <Icon
              color={color}
              bg={bg}
              _hover={{ backgroundColor: bgHover }}
              w="3em"
              h="3em"
              padding=".8em"
              as={FiSearch}
            />
          </motion.div>
          <motion.div
            variants={navItem}
            style={{
              // y: menuY,
              position: 'absolute',
              top: '-8em',
            }}
          >
            <Icon
              color={color}
              bg={bg}
              _hover={{ backgroundColor: bgHover }}
              w="3em"
              h="3em"
              padding=".8em"
              onClick={() => toggleColorMode()}
              as={colorMode === 'light' ? FiMoon : FiSun}
            />
          </motion.div>
          <motion.div
            variants={navItem}
            style={{
              position: 'absolute',
              top: '-4em',
            }}
          >
            <Icon
              color={color}
              bg={bg}
              _hover={{ backgroundColor: bgHover }}
              w="3em"
              h="3em"
              padding=".8em"
              as={FiArchive}
            />
          </motion.div>
        </Button>
      </motion.div>
    </>
  );
}

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
                        width: '60px',
                        margin: '1.5rem',
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
                        borderRadius="md"
                        overflow="hidden"
                        position="relative"
                        w="60px"
                        h="60px"
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
                      size="xl"
                      bgGradient="linear(to-r, #8c6e5a, #6d5346)"
                      bgClip="text"
                      pr="5"
                      w="100%"
                      isTruncated
                    >
                      {post.title}
                    </Heading>
                  </Flex>
                </a>
              </Link>
              <Divider borderColor={divider} />

              <Text
                color={textColor}
                fontWeight="bold"
                fontSize="md"
                padding="5"
                isTruncated
              >
                {post.excerpt}
              </Text>
              <Divider borderColor={divider} />

              <Text
                color={textColor}
                fontSize="sm"
                padding="5"
                align="right"
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

      <RotateOnDragComponent />
    </Container>
  );
};

export default Home;
