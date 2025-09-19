import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap-icons/font/bootstrap-icons.css";

import { $ as jQuery } from "react-jquery-plugin";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

import App from "./App.jsx";

const root = ReactDOM.createRoot(jQuery("#root")[0]);

root.render(<HashRouter>
    <App />
</HashRouter>);
