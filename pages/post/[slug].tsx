import { Container, Box, Heading, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';
import { getColor } from '../../lib/colors';

import PostType from '../../components/Types';

const { CONTENT_API_KEY } = process.env;

async function getPost(slug: string) {
  const res = await fetch(
    `https://krapjost.xyz/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`,
  ).then((res) => res.json());

  const posts = res.posts;
  console.log('getPost = ', posts);

  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ post: PostType }> = (props) => {
  const { post } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <>
      <Header
        avatar="/vercel.svg"
        header={post.title}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />

      <Container className="post" maxW="800px" padding="1em" centerContent>
        <Heading w="100%" size="xl" isTruncated>
          {post.title}
        </Heading>
        <Box w="100%" dangerouslySetInnerHTML={{ __html: post.html }} />
        <Navigation />
      </Container>
      <Footer color={getColor()} />
    </>
  );
};

export default Post;
