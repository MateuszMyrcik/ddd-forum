import { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList, computeVoteCount } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { mockPosts } from "../mocks";
import { Post, SortPostsBy } from "../types";
import { compareDesc } from "date-fns";

const sortByPopular = (posts: Post[]) => {
  return posts.sort(
    (a, b) => computeVoteCount(b.votes) - computeVoteCount(a.votes)
  );
};

const sortByNewest = (posts: Post[]) => {
  return posts.sort((a, b) => compareDesc(a.dateCreated, b.dateCreated));
};

export const MainPage = () => {
  const [sortPostsBy, setSetSortPostsBy] = useState<SortPostsBy | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    if (sortPostsBy === "NEW") {
      const sortedPosts = sortByNewest(posts);
      setPosts([...sortedPosts]);
    } else if (sortPostsBy === "POPULAR") {
      const sortedPosts = sortByPopular(posts);
      setPosts([...sortedPosts]);
    }
  }, [sortPostsBy]);

  return (
    <Layout>
      <PostsViewSwitcher onSortClick={setSetSortPostsBy} className="mb-4" />
      <PostsList posts={posts} />
    </Layout>
  );
};
