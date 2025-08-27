import * as bootstrap from 'react-bootstrap';

export default function Credits(){
    return <>
        <bootstrap.Row>
            <bootstrap.Col md={12}>
                <h1>Credits</h1>
            </bootstrap.Col>
        </bootstrap.Row>
        <bootstrap.Row>
            <bootstrap.Col md={12} className={"blur"}>
                <h2><a href="/#/solarsystem">Solar System</a></h2>
                <p>
                    <ul>
                        <li><a href="https://sbcode.net/topoearth/" target="_blank">sbcode</a></li>
                        <li><a href="https://www.shadedrelief.com/natural3/index.html" target="_blank">shadedrelief</a></li>
                        <li><a href="https://www.solarsystemscope.com/" target="_blank">solarsystemscope</a></li>
                    </ul>
                </p>
                <h2><a href="/#/citiesguesser">Cities</a></h2>
                <p>
                    <ul>
                        <li><a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a></li>
                        <li><a href="https://www.opentopodata.org/" target="_blank">Open Topo Data</a></li>
                    </ul>
                </p>
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};