import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Home from "./container/Home";
import Posts from "./container/Posts";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/posts/:id" component={Posts} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
