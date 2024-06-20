import logoDDD from "../assets/dddforumlogo.png";

import { Link } from "react-router-dom";
import { User } from "../types";
import clsx from "clsx";

type HeaderProps = {
  pathName: string;
  className?: string;
} & HeaderActionButtonProps;

type HeaderActionButtonProps = {
  user: User | null;
};

const shouldShowActionButton = (pathName: string) => {
  return pathName !== "/register";
};

const HeaderActionButton = ({ user }: HeaderActionButtonProps) => (
  <div className="">
    {user ? (
      <div>
        <div>{user.username}</div>
        <u>
          <div>logout</div>
        </u>
      </div>
    ) : (
      <Link
        to="/register"
        className="text-white bg-black min-w-[80px] text-right p-2 pl-14">
        Join
      </Link>
    )}
  </div>
);

export const Header = ({ pathName, user, className }: HeaderProps) => {
  const logo = (
    <div className="p-6">
      <img className="h-[70px]" src={logoDDD} alt="brick logo" />
    </div>
  );

  const titleAndSubmission = (
    <div>
      <h1 className="font-bold">Domain-Driven Designers</h1>
      <h3 className="font-bold">
        Where awesome domain driven designers are made
      </h3>
      <div className="mt-2">
        <Link className="underline" to={"/submit"}>
          submit
        </Link>
      </div>
    </div>
  );

  return (
    <header className={clsx(className, "flex items-center gap-8")}>
      {logo}
      {titleAndSubmission}
      {shouldShowActionButton(pathName) ? (
        <HeaderActionButton user={user} />
      ) : null}
    </header>
  );
};
