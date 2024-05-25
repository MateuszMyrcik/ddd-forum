import clsx from "clsx";
import { SortPostsBy } from "../types";

type Props = {
  className?: string;
  onSortClick: (sortBy: SortPostsBy) => void;
};

export const PostsViewSwitcher = ({ onSortClick, className }: Props) => {
  const classes = clsx(className, "text-2xl font-bold flex");

  const handleSortByPopular = () => onSortClick("POPULAR");
  const handleSortByNew = () => onSortClick("NEW");

  return (
    <div className={classes}>
      <input
        type="radio"
        onClick={handleSortByPopular}
        name="sort"
        value="popular"
        id="popular"
        className="hidden peer/popular"
      />
      <label
        htmlFor="popular"
        className="peer-checked/popular:opacity-100 opacity-30 border-r-2 border-r-black pr-4 mr-4">
        Popular
      </label>

      <input
        type="radio"
        value="new"
        onClick={handleSortByNew}
        name="sort"
        id="new"
        className="hidden peer/new"
      />
      <label htmlFor="new" className="peer-checked/new:opacity-100 opacity-30">
        New
      </label>
    </div>
  );
};
