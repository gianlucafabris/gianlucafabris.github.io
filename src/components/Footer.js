import * as bootstrap from 'react-bootstrap';

export default function Footer(){
    return <>
        <footer>
            <bootstrap.Row>
                <bootstrap.Col md={12} className="blur">
                    <div className="footer flex">
                        <div>Copyright © 2024 Gianluca Fabris | Powered by Github & <a href="/#/home">Gianluca Fabris</a></div>
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
    </>;
};
