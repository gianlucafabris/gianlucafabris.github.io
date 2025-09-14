import { Row, Col } from 'react-bootstrap';

import CitiesGuesserExperience from '../components/Experiences/CitiesGuesserExperience.jsx';

export default function CitiesGuesser({ citiesguesserContainer="citiesguesser" }){
    if(import.meta.env.DEV){
        console.log("CitiesGuesser page");
    }

    return <>
        <Row>
            <Col md={12}>
                <CitiesGuesserExperience citiesguesserContainer={citiesguesserContainer} />
            </Col>
        </Row>
    </>;
};