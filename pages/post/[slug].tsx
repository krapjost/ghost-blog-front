import Link from 'next/link';

import { useRouter } from 'next/router';

const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  html: string;
};

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`,
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
    <div>
      <Link href="/">
        <a>홈으로</a>
      </Link>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export default Post;
