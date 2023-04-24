// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './styles/index.css';
// import App from './components/App';
// import store from './redux/store';
// import { Provider } from 'react-redux';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthContextProvider>
);