// src/index.js:

    // Imports React and ReactDOM: From the node_modules directory. When you install React using npm (Node Package Manager), the core React libraries are stored in node_modules.
    // Mounts the App component: Using ReactDOM.render(), it takes the main App component and renders it inside the root div in index.html. This is where the React-driven UI starts replacing traditional HTML.
    
// React: It's the core React library that allows you to define components and understand the component's lifecycle and state.
import React from 'react';
// ReactDOM: It's the glue between React and the DOM (Document Object Model). It allows React components to be rendered to a web page. ReactDOM bridges the gap between React components and the actual DOM
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// This creates a root where the React components will render. It's pointing to the div with an id of "root" from the index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));
// This line instructs React to render the <App /> component inside the root div from index.html.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
