import Link from 'next/link';
import { Container, Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';

const { CONTENT_API_KEY } = process.env;

type Post = {
  title: string;
  slug: string;
  html: string;
};

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
  const bg = useColorModeValue('white', 'brown.900');
  const tagBg = useColorModeValue('#a69875', '#4f4d31');
  const darkerBg = useColorModeValue('#e4d9cd', '#150200');
  const divider = useColorModeValue('#b9a792', '#30201b');
  const textColor = useColorModeValue('#30201b', '#e4d9cd');

  console.log('props=', props);
  const { post } = props;

  console.log('typeofthispost', typeof post);

  const router = useRouter();

  if (router.isFallback) {
    return <h1> Loading</h1>;
  }

  return (
    <Container
      className="post-full-content"
      maxW="800px"
      padding="1em"
      fontSize=".8em"
      bg={bg}
      centerContent
    >
      <Heading size="xl" isTruncated>
        {post.title}
      </Heading>
      <Box w="100%" dangerouslySetInnerHTML={{ __html: post.html }} />
      <Navigation />
    </Container>
  );
};

export default Post;
