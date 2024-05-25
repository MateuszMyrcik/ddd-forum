import React from "react";
import { Header } from "./header";

const Content = ({ children }: any) => (
  <div className="content-container">{children}</div>
);

export const Layout = ({ children }: any) => (
  <div className="max-w-[800px] mx-auto my-0 p-4">
    <Header pathName="" className="mb-8" />
    <Content>{children}</Content>
  </div>
);
