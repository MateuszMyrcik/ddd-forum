import React, { ReactNode } from "react";
import { Header } from "./header";
import { useLocation } from "react-router-dom";

type ContentProps = {
  children: ReactNode;
};

type LayoutProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => (
  <div className="content-container">{children}</div>
);

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  return (
    <div className="max-w-[800px] mx-auto my-0 p-4">
      <Header pathName={pathname} className="mb-8" />
      <Content>{children}</Content>
    </div>
  );
};
