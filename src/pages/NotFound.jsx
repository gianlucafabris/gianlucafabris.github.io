import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

export default function NotFound(){
    if(import.meta.env.DEV){
        console.log("404 page");
    }
    
    return <>
        <Row>
            <Col md={12} className="blur">
                <p>Oops! The page you are looking for does not exist. <Link to="/home">Go back to Home</Link></p>
            </Col>
        </Row>
    </>;
};
