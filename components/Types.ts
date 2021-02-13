 type PostType = {
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    reading_time: string;
    feature_image: string;
    primary_author: primary_;
    primary_tag: primary_;
    tags: [tags_];
    html: string;
  };

  class tags_ {
    id: string;
    name: string;
  }
  
  class primary_ {
    name: string;
    profile_image: string;
  }
  
  
  export default PostType;