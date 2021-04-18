// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react"
import ReactDOM from "react-dom";
import { Router, Redirect } from "@reach/router"
import { Bucket } from './Bucket';
import { Theme } from "./Theme";

const App = () => (
  <Router>
      <Theme path="/">
        <Bucket path="bucket/*" />
        <Redirect from="/" to="bucket" noThrow />
        <Redirect from="*" to="/" default />
      </Theme>
    </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
})
