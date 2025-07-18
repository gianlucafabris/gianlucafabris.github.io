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
                        <li><a href="https://svs.gsfc.nasa.gov/">NASA</a></li>
                        <li><a href="https://sbcode.net/">sbcode</a></li>
                        <li><a href="https://www.shadedrelief.com/natural3/index.html">shadedrelief</a></li>
                    </ul>
                </p>
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};