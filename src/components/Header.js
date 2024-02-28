import * as bootstrap from 'react-bootstrap';

export default function Header({active="home"}){
    return <>
        <header>
            <bootstrap.Row>
                <bootstrap.Col md={12} className="blur">
                        <bootstrap.Navbar bg="dark" data-bs-theme="dark" sticky="top">
                            <bootstrap.Navbar.Brand href="/#/home">gianlucafabris2001.github.io</bootstrap.Navbar.Brand>
                            <bootstrap.Nav activeKey={active} className="me-auto">
                                <bootstrap.Nav.Link href="/#/home">Home</bootstrap.Nav.Link>
                                <bootstrap.Nav.Link href="/#/printables">Printables</bootstrap.Nav.Link>
                            </bootstrap.Nav>
                        </bootstrap.Navbar>
                </bootstrap.Col>
            </bootstrap.Row>
        </header>
    </>;
};
