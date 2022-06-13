import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
    children?: ReactNode;
};

const Layout = ({ children }: Props) => (
    <div id="layout">
        <Header />
        {children}
    </div>
);

export default Layout;
