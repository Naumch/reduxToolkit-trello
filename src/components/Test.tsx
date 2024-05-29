import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Test() {
  const [data, setData] = useState<Post[]>([]);

  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(url);
      const json = (await response.json()) as Post[];
      if (response.ok) setData(json);
    };

    getPosts();
  }, []);

  const renderedPosts = data.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  ));

  return <>{renderedPosts}</>;
}
