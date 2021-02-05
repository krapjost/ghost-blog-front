import Link from 'next/link';
import { Container, Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Header from '../../components/Header';

const { CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  html: string;
  primary_author: primary_;
};

class primary_ {
  name: string;
  profile_image: string;
}

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

const Post: React.FC<{ post: Post }> = (props) => {
  console.log('props=', props);
  const { post } = props;

  console.log('typeofthispost', typeof post);

  const router = useRouter();

  if (router.isFallback) {
    return <h1> Loading</h1>;
  }

  return (
    <>
      <Header avatar="/vercel.svg" header={post.title} />

      <Container className="post" maxW="800px" padding="1em" centerContent>
        <Heading w="100%" size="xl" isTruncated>
          {post.title}
        </Heading>
        <Box w="100%" dangerouslySetInnerHTML={{ __html: post.html }} />
        <Navigation />
      </Container>
    </>
  );
};

export default Post;
