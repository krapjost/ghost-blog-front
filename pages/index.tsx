import Link from 'next/link';
import {
  Container,
  Divider,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  Tag,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';

import Navigation from '../components/Navigation';
import Header from '../components/Header';
import RippleButton from '../components/RippleButton';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

import { FiTag, FiEdit3, FiBookOpen } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
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
  console.log(res);

  return posts;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return { props: { posts } };
};

const Home: React.FC<{ posts: Post[] }> = (props): JSX.Element => {
  const { posts } = props;
  const tags = [];
  posts.map((post) => {
    console.log('post.map', post.tags);
    console.log('tags', tags);
    post.tags[0]
      ? post.tags.map((tag) => {
          tags.push(tag);
        })
      : null;
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumber = [];

  const postsPerPage = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const postsTotal = posts.length;

  for (let i = 1; i <= Math.ceil(postsTotal / postsPerPage); i++) {
    pageNumber.push(i);
  }

  const profile_image = posts[0].primary_author.profile_image;

  const divider = useColorModeValue('black', 'white');
  const color = useColorModeValue('black', 'white');

  return loading === true ? (
    <Loading />
  ) : (
    <Container
      maxW="800px"
      w="100%"
      padding="2"
      pt="12"
      transition="background-color 0.2s"
      centerContent
    >
      <Header avatar={profile_image} />
      <Flex
        // bg="red.500"
        pt="5"
        pb="5"
        mt="5"
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

      <List
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        {currentPosts.map(
          (post): JSX.Element => (
            <ListItem
              boxShadow={`-5px 0px 0px -1px ${divider}`}
              mb="0"
              padding="0"
              key={post.slug}
            >
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

              {/* <Divider borderColor={divider} /> */}

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
                    <Text color={color} margin="5" mb="0">
                      {post.excerpt}
                    </Text>
                  </RippleButton>
                </a>
              </Link>
              {/* <Divider borderColor={divider} /> */}

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
      <Pagination
        color={color}
        currentPage={currentPage}
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
      />
      <Navigation />
    </Container>
  );
};

export default Home;
