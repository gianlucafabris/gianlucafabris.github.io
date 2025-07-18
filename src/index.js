import { $ as jQuery } from 'react-jquery-plugin';

import * as bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';

import { Debug } from './components/Utils/Debug.js';
// import Background3D from './components/Experiences/Background3D.js';
import Background2D from './components/Experiences/Background2D.js';

import Home from './pages/Home.js';
import Printables from './pages/Printables.js';
import SolarSystem from './pages/SolarSystem.js';
import Credits from './pages/Credits.js';
import Thesis from './pages/Thesis.js';

function App() {
    const location = useLocation();
    const active = location.pathname;

    return <>
        <Debug />
        <Background2D particlesContainer={"particles-js"} />
        {/* <Background3D particlesContainer={"particles-js"} /> */}
        <bootstrap.Container>
            <header>
                <bootstrap.Row>
                    <bootstrap.Col md={12} className="blur">
                            <bootstrap.Navbar bg="dark" data-bs-theme="dark" sticky="top">
                                {active=="/" || active=="/home" || active=="/index" ? <bootstrap.Navbar.Brand as={NavLink} to="/home" className="active">gianlucafabris2001.github.io</bootstrap.Navbar.Brand> : <bootstrap.Navbar.Brand as={NavLink} to="/home">gianlucafabris2001.github.io</bootstrap.Navbar.Brand>}
                                <bootstrap.Nav activeKey={active} className="me-auto">
                                    <bootstrap.Nav.Link as={NavLink} to="/printables">Printables</bootstrap.Nav.Link>
                                </bootstrap.Nav>
                            </bootstrap.Navbar>
                    </bootstrap.Col>
                </bootstrap.Row>
            </header>
            <section className="main">
                <Routes>
                    <Route index element={<Home typedContainer="typed" />} /> {/* /#/ */}
                    <Route path="/home" element={<Home typedContainer="typed" />} /> {/* /#/home */}
                    <Route path="/index" element={<Home typedContainer="typed" />} /> {/* /#/index */}
                    {/*  */}
                    <Route path="/printables" element={<Printables />} /> {/* /#/printables */}
                    <Route path="/thesis" element={<Thesis />} /> {/* /#/thesis */}
                    <Route path="/solarsystem" element={<SolarSystem solarSystemContainer='solarsystem' />} /> {/* /#/solarsystem */}
                    <Route path="/credits" element={<Credits />} /> {/* /#/credits */}
                    {/*  */}
                    <Route path="*" element={<Home typedContainer="typed" />} /> {/* /#/no page */}
                </Routes>
            </section>
            <footer>
                <bootstrap.Row>
                    <bootstrap.Col md={12} className="blur">
                        <div className="footer flex">
                            <div>Copyright © 2024 Gianluca Fabris | Powered by Github & <a href="/#/home">Gianluca Fabris</a></div>
                            <div><a href="/#/credits">Credits</a></div>
                            <div className="social">
                                <a href="/#/home" aria-label="website"><i className="bi bi-globe2"></i></a>
                                <a href="https://www.linkedin.com/in/gianluca-fabris-2001/" aria-label="linkedin"><i className="bi bi-linkedin"></i></a>
                                <a href="https://github.com/gianlucafabris" aria-label="github"><i className="bi bi-github"></i></a>
                                <a href="https://www.printables.com/@gianlucafabris2001" aria-label="printables">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 41.000000 41.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,41.000000) scale(0.100000,-0.100000)" fill="var(--primary_color)" stroke="none"><path d="M136 365 l-59 -33 29 -17 c16 -10 41 -26 56 -36 15 -11 32 -19 38 -19 6 0 10 -31 10 -80 0 -90 -3 -89 82 -35 l47 30 1 76 0 76 -54 26 c-30 15 -58 32 -61 37 -9 15 -24 11 -89 -25z"/><path d="M70 84 c0 -64 0 -65 23 -52 59 35 87 53 87 59 0 3 -17 14 -37 24 -78 39 -73 41 -73 -31z"/></g></svg>
                                </a>
                            </div>
                        </div>
                    </bootstrap.Col>
                </bootstrap.Row>
            </footer>
        </bootstrap.Container>
        <link href="/src/style.css" rel="stylesheet"/>
    </>;
}

const root = ReactDOM.createRoot(jQuery("#root")[0]);

root.render(<HashRouter>
    <App />
</HashRouter>);
