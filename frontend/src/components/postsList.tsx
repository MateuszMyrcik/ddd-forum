import React from "react";

import { Link } from "react-router-dom";
import arrow from "../assets/arrow.svg";
import { formatDistanceToNow } from "date-fns";
import { Post, Vote } from "../types";
import clsx from "clsx";

export const computeVoteCount = (votes: Vote[]) => {
  let count = 0;
  votes.forEach((v) => (v.voteType === "Upvote" ? count++ : count--));
  return count;
};

type Props = {
  posts: Post[];
};

export const PostsList = ({ posts }: Props) => {
  const detailsItemClasses = "px-2 border-r-[1px] border-r-black";

  return (
    <div>
      {posts.map((post) => (
        <div className="flex " key={post.id}>
          <div className="mr-4 flex flex-col items-center">
            <div>
              <img src={arrow} />
            </div>
            <div>{computeVoteCount(post.votes)}</div>
            <div>
              <img src={arrow} className="rotate-180" />
            </div>
          </div>
          <div className="post-item-content">
            <div className="px-2 font-bold text-xl">{post.title}</div>
            <div className="flex items-center ">
              <div className={detailsItemClasses}>
                {formatDistanceToNow(post.dateCreated)}
              </div>

              <Link
                to={`/member/${post.memberPostedBy.username}`}
                className={detailsItemClasses}>
                by {post.memberPostedBy.username}
              </Link>
              <div className={clsx(detailsItemClasses, "border-r-0")}>
                {post.comments.length}{" "}
                {post.comments.length !== 1 ? `comments` : "comment"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
