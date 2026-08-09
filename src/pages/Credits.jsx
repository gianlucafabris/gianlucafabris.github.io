import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

export default function Credits(){
    if(import.meta.env.DEV){
        console.log("Credits page");
    }
    
    return <>
        <Row>
            <Col md={12}>
                <h1>Credits</h1>
            </Col>
        </Row>
        <Row>
            <Col md={12} className={"blur"}>
                <h2><Link to="/solarsystem">Solar System</Link></h2>
                <p>
                    <ul>
                        <li><Link to="https://sbcode.net/topoearth/" target="_blank">sbcode</Link></li>
                        <li><Link to="https://www.shadedrelief.com/natural3/index.html" target="_blank">shadedrelief</Link></li>
                        <li><Link to="https://www.solarsystemscope.com/" target="_blank">solarsystemscope</Link></li>
                    </ul>
                </p>
            </Col>
        </Row>
    </>;
};