import * as bootstrap from 'react-bootstrap';

export default function NotFound(){
    return <>
        <bootstrap.Row>
            <bootstrap.Col md={12} className="blur">
                <p>Oops! The page you are looking for does not exist. <a href="/#/home">Go back to Home</a></p>
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};
