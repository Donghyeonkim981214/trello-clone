import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    transition: all 0.5s ease-in;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));