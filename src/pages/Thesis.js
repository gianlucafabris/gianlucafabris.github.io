import * as bootstrap from 'react-bootstrap';

import { Debug } from '../components/Utils/Debug.js';
import ExperienceFallback from '../components/Utils/ExperienceFallback.js';
// import Background3D from '../components/Background/Background3D.js';
import Background2D from '../components/Background/Background2D.js';
import BackgroundImage from '../components/Background/BackgroundImage.js';
import Background2DConfig from '../components/Config/particles2D.js';
import Background3DConfig from '../components/Config/particles3D.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Thesis({particlesContainer="particles"}){
    return <>
        <Debug />
        <ExperienceFallback E3D={Background2D} E2D={Background2D} EI={BackgroundImage} particlesContainer={particlesContainer} background3DConfig={Background3DConfig} background2DConfig={Background2DConfig} />
        <bootstrap.Container>
            <Header />
            <section className="main">
                <bootstrap.Row>
                    <bootstrap.Col md={12}>
                        <h1>Decreasing the Reality Gap of a Vehicle Simulation Digital Sibling Using the Addition of a Road Slope Study</h1>
                    </bootstrap.Col>
                </bootstrap.Row>
                <bootstrap.Row>
                    <bootstrap.Col md={12} className={"blur"}>
                        <h2>About this thesis</h2>
                        <p>This thesis focuses on reducing the reality gap in vehicle simulation platforms by integrating a comprehensive study of road slopes. Simulation platforms are critical tools for developing and testing driver-assistance systems (ADAS) and autonomous vehicles, offering a safe, cost-effective alternative to real-world tests. However, achieving high levels of realism, especially in road and vehicle dynamics, remains a significant challenge.</p>
                        <p>By incorporating detailed road slope data, this work aims to bridge the gap between simulated and real-world driving conditions. The enhanced realism enables more accurate testing of ADAS and autonomous driving technologies. This thesis delves into how custom soft-body physics engines and adaptable road models contribute to more reliable and immersive simulations, making it ideal for both academic and industry applications.</p>
                    </bootstrap.Col>
                </bootstrap.Row>
                <bootstrap.Row>
                    <bootstrap.Col md={12} className={"blur"}>
                        <h2>Introduction</h2>
                        <p>As the complexity of modern driver training systems, ADAS, and autonomous driving technologies continues to grow, the demand for hyper-realistic simulation platforms becomes more pronounced. These platforms are indispensable for safely testing complex driving scenarios without exposing vehicles or drivers to real-world risks. However, one of the significant hurdles is accurately modeling real-world conditions such as road geometry, traffic patterns, and environmental factors like slopes.</p>
                        <p>This research leverages platforms like BeamNG.tech and Hexagon’s Virtual Test Drive (VTD) to improve the accuracy of road simulations. A major innovation of this thesis is the integration of OpenStreetMap (OSM) road data with a specific focus on road slopes, a critical factor in vehicle dynamics. This addition allows for a more realistic replication of how vehicles interact with varying terrain, which is essential for ADAS testing and the development of autonomous agents.</p>
                        <p>By focusing on the customization of simulation inputs, this research enhances the ability of simulation platforms to more closely mirror real-world driving environments. The study compares the performance of standard road data imports against customized imports, ultimately demonstrating how improved realism can lead to better development and testing outcomes.</p>
                    </bootstrap.Col>
                </bootstrap.Row>
                <bootstrap.Row>
                    <bootstrap.Col md={12} className={"blur"}>
                        <h2>Resources</h2>
                        <p><a href="https://drive.google.com/file/d/1siuiS3j4CdlGHEfWTbJEy1xZIaBR9Jmx/view?usp=sharing" target="_blank">thesis</a></p>
                        <p><a href="https://drive.google.com/file/d/1s8N1R6J0_7z_KvksOUQiiY8xEXRoogEy/view?usp=sharing" target="_blank">presentation</a></p>
                        <p><a href="https://github.com/gianlucafabris/BeamNGpy---Road-test" target="_blank">Github - BeamNGpy - Road test</a></p>
                        <p><a href="https://github.com/gianlucafabris/Import-OSM-custom" target="_blank">Github - Import OSM custom</a></p>
                        <p><a href="https://github.com/gianlucafabris/Import-OSM-custom---analysis-BeamNG-and-Hexagon" target="_blank">Github - Import OSM custom - analysis BeamNG and Hexagon</a></p>
                    </bootstrap.Col>
                </bootstrap.Row>
            </section>
            <Footer />
        </bootstrap.Container>
        <link href="/src/style.css" rel="stylesheet"/>
    </>;
};