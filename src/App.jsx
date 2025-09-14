import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Globe2, Linkedin, Github } from 'react-bootstrap-icons';
import { Routes, Route, NavLink, useLocation, Link } from 'react-router';
import { Helmet } from 'react-helmet';

import Background2D from './components/Background2D.jsx';
// import Background3D from './components/Background3D.jsx';

//pages
import Home from './pages/Home.jsx';
import Printables from './pages/Printables.jsx';
import Thesis from './pages/Thesis.jsx';
import SolarSystem from './pages/SolarSystem.jsx';
import CitiesGuesser from './pages/CitiesGuesser.jsx';
import Credits from './pages/Credits.jsx';
import NotFound from './pages/NotFound.jsx';

//configs
import BackgroundConfig from './components/Config/particles2D.js';
import BackgroundConfig_404 from './components/Config/particles2D_404.js';
// import BackgroundConfig from './components/Config/particles3D.js';
// import BackgroundConfig from './components/Config/particles3D_404.js';

//debug
import { Debug } from './components/Utils/Debug.jsx';

const pages = [
    {name: "home", title: "home", description: "WIP"},
    {name: "printables", title: "printables", description: "a review and some possible improvements to Printable.com"},
    {name: "thesis", title: "thesis", description: "Decreasing the Reality Gap of a Vehicle Simulation Digital Sibling Using the Addition of a Road Slope Study thesis and links"},
    {name: "solarsystem", title: "solar system", description: "a representation of the solar system with planets and their orbits"},
    {name: "citiesguesser", title: "cities guesser", description: "a representation of various cities with data from OpenStreetMap and you have to guess the city based on the map"},
    {name: "credits", title: "credits", description: "credits page with links to resources used in the website"}
];

const navLinks = [
    {name: "printables", label: "Printables"}
];

const paths = {
    home: ["/", "/home", "/home.html", "/index", "/index.html"],
    printables: ["/printables", "/printables.html"],
    thesis: ["/thesis", "/thesis.html"],
    solarsystem: ["/solarsystem", "/solarsystem.html"],
    citiesguesser: ["/citiesguesser", "/citiesguesser.html"],
    credits: ["/credits", "/credits.html"]
};

export default function App(){
    const location = useLocation();
    const active = location.pathname;

    const pageInfo = pages.find(function(p){
        return p.name === active.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '').toLowerCase() || ((active.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '').toLowerCase() === '' || active.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '').toLowerCase() === 'index') && p.name === 'home');
    }) || { name: "404", title: "404", description: "404 Not Found" };

    // TODO
    // usare + bootstrap (footer/pagine/esperienze)
    // routes rest per solarsystem es. /solarsystem/:planet/:moon

    return <>
        <Helmet>
            <title>Gianluca Fabris - {pageInfo.title}</title>
            <meta name="description" content={`Gianluca Fabris website - ${pageInfo.title} page, ${pageInfo.description}`} />
            {/* <!-- Open Graph --> */}
            <meta property="og:title" content={`Gianluca Fabris - ${pageInfo.title}`} />
            <meta property="og:description" content={`Gianluca Fabris website - ${pageInfo.title} page, ${pageInfo.description}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://gianlucafabris.github.io/${pageInfo.name}.html`} />
            <meta property="og:image" content="https://gianlucafabris.github.io/src/img/background.png" />
            {/* <!-- Twitter --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`Gianluca Fabris - ${pageInfo.title}`} />
            <meta name="twitter:description" content={`Gianluca Fabris website - ${pageInfo.title} page, ${pageInfo.description}`} />
            <meta name="twitter:image" content="https://gianlucafabris.github.io/src/img/background.png" />
        </Helmet>
        {import.meta.env.DEV ? <Debug /> : null}
        <Background2D particlesContainer={pageInfo.name === "404" ? "particles-js_404" : "particles-js"} BackgroundConfig={pageInfo.name === "404" ? BackgroundConfig_404 : BackgroundConfig} />
        {/* <Background3D particlesContainer={pageInfo.name === "404" ? "particles-js_404" : "particles-js"} BackgroundConfig={pageInfo.name === "404" ? BackgroundConfig_404 : BackgroundConfig} /> */}
        <Container>
            <header>
                <Row>
                    <Col md={12} className="blur">
                        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
                            {active=="/" || active=="/home" || active=="/index" ? <Navbar.Brand as={NavLink} to="/home" className="active">gianlucafabris2001.github.io</Navbar.Brand> : <Navbar.Brand as={NavLink} to="/home">gianlucafabris2001.github.io</Navbar.Brand>}
                            <Nav activeKey={active} className="me-auto">
                                {navLinks.map(function(link){
                                    return <Nav.Link as={NavLink} to={`/${link.name}`} key={link.name}>{link.label}</Nav.Link>;
                                })}
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </header>
            <main>
                <Routes>
                    <Route index element={<Home typedContainer="typed" />} />
                    {paths.home.map(function(path){
                        return <Route key={path} path={path} element={<Home typedContainer="typed" />} />;
                    })}
                    {paths.printables.map(function(path){
                        return <Route key={path} path={path} element={<Printables />} />;
                    })}
                    {paths.thesis.map(function(path){
                        return <Route key={path} path={path} element={<Thesis />} />;
                    })}
                    {paths.solarsystem.map(function(path){
                        return <Route key={path} path={path} element={<SolarSystem solarSystemContainer="solarsystem" />} />;
                    })}
                    {paths.citiesguesser.map(function(path){
                        return <Route key={path} path={path} element={<CitiesGuesser citiesguesserContainer="citiesguesser" />} />;
                    })}
                    {paths.credits.map(function(path){
                        return <Route key={path} path={path} element={<Credits />} />;
                    })}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <footer>
                <Row>
                    <Col md={12} className="blur">
                        <div className="footer flex">
                            <div>Copyright © 2023 Gianluca Fabris | Powered by Github & <Link to="/home">Gianluca Fabris</Link></div>
                            <div>
                                <Link to="/credits">Credits</Link>
                                <span> | </span>
                                <Link to="https://www.iubenda.com/privacy-policy/86179529" className="iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe " title="Privacy Policy " target="_blank">Privacy Policy</Link>
                                <span> | </span>
                                <Link to="https://www.iubenda.com/privacy-policy/86179529/cookie-policy" className="iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe " title="Cookie Policy " target="_blank">Cookie Policy</Link>
                            </div>
                            <div className="social">
                                <Link to="/home" aria-label="website"><Globe2 /></Link>
                                <Link to="https://www.linkedin.com/in/gianluca-fabris-2001/" target="_blank" aria-label="linkedin"><Linkedin /></Link>
                                <Link to="https://github.com/gianlucafabris" target="_blank" aria-label="github"><Github /></Link>
                                <Link to="https://www.printables.com/@gianlucafabris2001" target="_blank" aria-label="printables"><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" viewBox="0 0 41.000000 41.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,41.000000) scale(0.100000,-0.100000)" fill="var(--primary_color)" stroke="none"><path d="M136 365 l-59 -33 29 -17 c16 -10 41 -26 56 -36 15 -11 32 -19 38 -19 6 0 10 -31 10 -80 0 -90 -3 -89 82 -35 l47 30 1 76 0 76 -54 26 c-30 15 -58 32 -61 37 -9 15 -24 11 -89 -25z"/><path d="M70 84 c0 -64 0 -65 23 -52 59 35 87 53 87 59 0 3 -17 14 -37 24 -78 39 -73 41 -73 -31z"/></g></svg></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </footer>
        </Container>
        <link href="/src/style.css" rel="stylesheet"/>
        {import.meta.env.DEV ? <link href="/src/debug.css" rel="stylesheet"/> : null}
    </>;
}
