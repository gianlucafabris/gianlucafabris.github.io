import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Globe2, Linkedin, Github } from "react-bootstrap-icons";
import { Routes, Route, NavLink, useLocation, Link } from "react-router";
import { useMemo } from "react";
import { Helmet } from "react-helmet";

import Background2D from "./components/Background2D.jsx";
// import Background3D from "./components/Background3D.jsx";
import { useFetchJson } from "./components/utils/Json.jsx";

//pages
import { pages, navLinks } from "./Pages.js";
import Home from "./pages/Home.jsx";
import Printables from "./pages/Printables.jsx";
import Thesis from "./pages/Thesis.jsx";
import SolarSystem from "./pages/SolarSystem.jsx";
import CitiesGuesser from "./pages/CitiesGuesser.jsx";
import Credits from "./pages/Credits.jsx";
import NotFound from "./pages/NotFound.jsx";

//debug
let Debug = null;
if(import.meta.env.DEV){
    const debug = await import("./components/utils/Debug.jsx");
    Debug = debug.Debug;
}

//configs
let BackgroundConfigUrl = "/assets/configs/particles2D.json";
let BackgroundConfig_404Url = "/assets/configs/particles2D_404.json";
// let BackgroundConfigUrl = "/assets/configs/particles3D.json";
// let BackgroundConfig_404Url = "/assets/configs/particles3D_404.json";


export default function App(){
    const location = useLocation();
    const active = location.pathname;
    
    const { data: BackgroundConfig, loading: BackgroundConfigLoading, error: BackgroundConfigError } = useFetchJson(BackgroundConfigUrl);
    const { data: BackgroundConfig_404, loading: BackgroundConfig_404Loading, error: BackgroundConfig_404Error } = useFetchJson(BackgroundConfig_404Url);

    const pagesByName = pages.reduce(function(acc, page){
        acc[page.name] = page;
        return acc;
    }, {});

    const pageActiveUrl = active.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "").toLowerCase();
    const pageActive = pagesByName[pageActiveUrl === "" || pageActiveUrl === "index" ? "home" : pageActiveUrl] || { name: "404", title: "404", description: "404 Not Found", priority: "0.0", paths: [active] };

    // TODO
    // fix report PageSpeed Insights / tutte tab strumenti sviluppo
    /* js code splitting/css critico
    vite.config.js
import { pages, navLinks } from "./src/Pages.js";
const criticalPages = pages.flatMap(function(page){
    return page.paths.map(function(path){return { uri: path, template: 'index' };});
});
plugins: [
    critical({
        criticalBase: '../build/',
        criticalPages: criticalPages,
        inline: true,
        minify: true
    })
],
build: {
    cssCodeSplit: true,
    rollupOptions: {
        output: {
            manualChunks: {
                react: ['react', 'react-dom', 'react-router'],
                three: ['three', '@react-three/fiber', '@react-three/drei'],
                bootstrap: ['bootstrap', 'react-bootstrap', 'bootstrap-icons', 'react-bootstrap-icons'],
                tsparticles: ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/all'],
                dev: ['r3f-perf', 'stats-js', 'spectorjs']
            }
        }
    }
}
    */
    // implementare + chatgpt refactor citiesguesser
    // bug solarsystem witch * -> earth / earth -> *
    // usare di più bootstrap (footer/pagine/esperienze)
    // routes rest per solarsystem es. /solarsystem/:planet/:moon
    // react lazy + suspense per experiences + baackground
    
    return <>
        <Helmet>
            {/* <!-- Metadata --> */}
            <title>Gianluca Fabris - {pageActive.title}</title>
            <meta name="description" content={`Gianluca Fabris website - ${pageActive.title} page, ${pageActive.description}`} />
            {/* <!-- Open Graph --> */}
            <meta property="og:title" content={`Gianluca Fabris - ${pageActive.title}`} />
            <meta property="og:description" content={`Gianluca Fabris website - ${pageActive.title} page, ${pageActive.description}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://gianlucafabris.github.io/${pageActive.name}.html`} />
            <meta property="og:image" content="https://gianlucafabris.github.io/src/img/background.png" />
            {/* <!-- Twitter --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`Gianluca Fabris - ${pageActive.title}`} />
            <meta name="twitter:description" content={`Gianluca Fabris website - ${pageActive.title} page, ${pageActive.description}`} />
            <meta name="twitter:image" content="https://gianlucafabris.github.io/src/img/background.png" />
            {/* Cookies/Analytics via generate-static.js */}
        </Helmet>
        {import.meta.env.DEV ? <Debug /> : null}
        {BackgroundConfigLoading || BackgroundConfig_404Loading ? <div>Loading...</div> : BackgroundConfigError || BackgroundConfig_404Error ? <div>Error loading background config: {BackgroundConfigError?.message || BackgroundConfig_404Error?.message}</div> : <Background2D particlesContainer={"particles-js"} className={pageActive.name === "404" ? "p404" : ""} BackgroundConfig={pageActive.name === "404" ? BackgroundConfig_404 : BackgroundConfig} />}
        {/* {BackgroundConfigLoading || BackgroundConfig_404Loading ? <div>Loading...</div> : BackgroundConfigError || BackgroundConfig_404Error ? <div>Error loading background config: {BackgroundConfigError?.message || BackgroundConfig_404Error?.message}</div> : <Background3D particlesContainer={"particles-js"} className={pageActive.name === "404" ? "p404" : ""} BackgroundConfig={pageActive.name === "404" ? BackgroundConfig_404 : BackgroundConfig} />} */}
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
                    {pagesByName["home"].paths.map(function(path){
                        return <Route key={path} path={path} element={<Home typedContainer="typed" />} />;
                    })}
                    {pagesByName["printables"].paths.map(function(path){
                        return <Route key={path} path={path} element={<Printables />} />;
                    })}
                    {pagesByName["thesis"].paths.map(function(path){
                        return <Route key={path} path={path} element={<Thesis />} />;
                    })}
                    {pagesByName["solarsystem"].paths.map(function(path){
                        return <Route key={path} path={path} element={<SolarSystem solarSystemContainer="solarsystem" />} />;
                    })}
                    {pagesByName["citiesguesser"].paths.map(function(path){
                        return <Route key={path} path={path} element={<CitiesGuesser citiesguesserContainer="citiesguesser" />} />;
                    })}
                    {pagesByName["credits"].paths.map(function(path){
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
        {import.meta.env.DEV ? <link href="/src/debug.css" rel="stylesheet"/> : null}
    </>;
}
