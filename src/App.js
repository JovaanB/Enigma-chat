import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

import Join from "./components/Join";
import Chat from "./components/Chat";
import Video from "./components/Video";

const App = () => (
    <Fragment>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Router>
            <Route exact path="/" component={Join} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/video" component={Video} />
        </Router>
    </Fragment>
);

export default App;
