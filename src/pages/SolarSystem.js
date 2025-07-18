import * as bootstrap from 'react-bootstrap';

import SolarSystemExperience from '../components/Experiences/SolarSystemExperience.js';

export default function SolarSystem({solarSystemContainer="solarsystem"}){
    return <>
        <SolarSystemExperience solarSystemContainer={solarSystemContainer} />
    </>;
};