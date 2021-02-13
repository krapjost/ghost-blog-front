import { Container, useColorMode } from '@chakra-ui/react';
import { getColor } from '../lib/colors';

import Navigation from '../components/Navigation';
import About from '../components/About';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import TagsList from '../components/TagsList';
import PostsList from '../components/PostsList';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import PostType from '../components/Types';

import { useEffect, useState } from 'react';
import { Router } from 'next/router';

const { CONTENT_API_KEY } = process.env;

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

const Home: React.FC<{ posts: PostType[] }> = (props): JSX.Element => {
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
  const { colorMode, toggleColorMode } = useColorMode();
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

  return loading === true ? (
    <Loading />
  ) : (
    <>
      <About color={getColor()} />

      <Container
        maxW="800px"
        w="100%"
        padding="2"
        transition="background-color 0.2s"
        centerContent
      >
        <Header
          avatar={profile_image}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
        <TagsList color={getColor()} tags={tags} />
        <PostsList color={getColor()} currentPosts={currentPosts} />

        <Pagination
          color={getColor()}
          currentPage={currentPage}
          pageNumber={pageNumber}
          setCurrentPage={setCurrentPage}
        />
        <Navigation />
      </Container>
      <Footer color={getColor()} />
    </>
  );
};

export default Home;
