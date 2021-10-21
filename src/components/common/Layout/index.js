import React from "react";
import Header from "../Header";

const Layout = ({ children, isChat }) => {
    return (
        <>
            <Header isChat={isChat} />
            {children}
        </>
    );
};

export default Layout;
