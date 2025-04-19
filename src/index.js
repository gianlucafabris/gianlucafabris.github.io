import { $ as jQuery } from 'react-jquery-plugin';

import * as bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
import Printables from './pages/Printables.js';
import Thesis from './pages/Thesis.js';

const root = ReactDOM.createRoot(jQuery("#root")[0]);

root.render(
    <HashRouter>
        <Routes>
            <Route index element={<Home particlesContainer="particles-js" typedContainer="typed" />} /> {/* /#/ */}
            <Route path="/home" element={<Home particlesContainer="particles-js" typedContainer="typed" />} /> {/* /#/home */}
            <Route path="/index" element={<Home particlesContainer="particles-js" typedContainer="typed" />} /> {/* /#/index */}
            <Route path="/printables" element={<Printables particlesContainer="particles-js" />} /> {/* /#/printables */}
            {/* other pages */}
            <Route path="/thesis" element={<Thesis particlesContainer="particles-js" />} /> {/* /#/thesis */}
            <Route path="*" element={<Home particlesContainer="particles-js" typedContainer="typed" />} /> {/* /#/no page */}
        </Routes>
    </HashRouter>
);
