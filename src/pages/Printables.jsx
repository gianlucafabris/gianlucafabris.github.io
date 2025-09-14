import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { useState, useEffect } from "react";
import ReactCompareImage from 'react-compare-image';

import PrintablesExperience from '../components/Experiences/PrintablesExperience.jsx';

function FlipReactImageCompare({ leftImage, leftImageAlt, leftImageLabel, rightImage1, rightImage1Alt, rightImage1Label, rightImage2, rightImage2Alt, rightImage2Label, interval = 5000}){
    const [flip, setFlip] = useState(true);

    useEffect(function(){
        const timer = setInterval(function(){
            setFlip(function(prev){
                return !prev;
            });
        }, interval);
        return function(){
            clearInterval(timer);
        };
    }, [interval]);

    return <ReactCompareImage leftImage={leftImage} leftImageAlt={leftImageAlt} leftImageLabel={leftImageLabel} rightImage={flip ? rightImage1 : rightImage2} rightImageAlt={flip ? rightImage1Alt : rightImage2Alt} rightImageLabel={flip ? rightImage1Label : rightImage2Label} />;
}

export default function Printables(){
    if(import.meta.env.DEV){
        console.log("Printables page");
    }

    return <>
        <Row>
            <Col md={12}>
                <h1><Link to="https://www.printables.com" target="_blank">Printables.com</Link></h1>
            </Col>
        </Row>
        <Row>
            <Col md={6} className={"blur"}>
                <p>Printables.com is a platform that offers a huge variety of 3D models and a great relationship with the 3D printing community.</p>
                <p>Printables.com is famous for its extensive database of 3D models. The variety and quality of the models available are impressive and being designed for 3D printing they are easy to print.</p>
                <p>Printables.com's points system, called Prusameters, adds an element of incentive for users. Accumulating points through interacting with the platform, creating 3D models appreciated by the community or winning contests, leads to advantages such as spools of filament and even free printers. This system not only stimulates user interaction but also rewards their active involvement.</p>
                <p>Printables.com regularly hosts contests that encourage creativity and innovation among its community of creators. These contests offer users the opportunity to test their skills, compete against other community members, and earn recognition and prizes. These events add an element of community, challenge and engagement to the platform.</p>
                <p>One of Printables.com's strengths is its commitment to supporting creators. The new system implemented to support creators is a significant step forward in this process. Through this initiative, Printables.com users can offer support to creators who produce high-quality content for the platform. This not only benefits the creators themselves but also enriches the overall offering of templates and content available to users.</p>
                <p>In summary, Printables.com stands out for its vast database of 3D models, engaging points system, inspiring contests and system to support creators. It is a valuable resource for 3D design professionals and enthusiasts, offering a dynamic, community-focused platform for access to high-quality content and creative expression.</p>
            </Col>
            <Col md={6}>
                <PrintablesExperience printablesContainer={"canvasExperience"}/>
            </Col>
        </Row>
        <Row>
            <Col md={12} className={"blur"}>
                <p>Here are some suggestions for improving some pages.</p>
                <section>
                    <p>Collections and user profile:</p>
                    <ul>
                        <li>Adding filters: using filters on the collections page to make it easier for users to quickly find models they're interested in when collections have many models, such as on the all models page on Printable.com.</li>
                        <li>Increased medals display: modify the user profile to allow up to six medals to be displayed instead of three, allowing users to showcase a wider range of their achievements.</li>
                        <li>Displaying the number of models and makes: next to the number of likes and downloads of the models, also include the total number of models uploaded and how many models have been printed (make).</li>
                    </ul>
                    <div className={"imagecompare collections"}>
                        <ReactCompareImage leftImage={"/src/img/printables/collections.png"} leftImageAlt={"collections and user original"} leftImageLabel={"original"} rightImage={"/src/img/printables/collections mod.png"} rightImageAlt={"collections and user modified"} rightImageLabel={"modified"} />
                    </div>
                </section>
                <section>
                    <p>About the user - medals section:</p>
                    <ul>
                        <li>Redesign of the medals section: to allow users to download the medal for past levels and see who achieved each level, giving users additional motivation to achieve higher goals</li>
                    </ul>
                    <div className={"imagecompare badges"}>
                        <FlipReactImageCompare leftImage={"/src/img/printables/badges.png"} leftImageAlt={"badges original"} leftImageLabel={"original"} rightImage1={"/src/img/printables/badges mod.png"} rightImage1Alt={"badges modified"} rightImage1Label={"modified"} rightImage2={"/src/img/printables/badges mod2.png"} rightImage2Alt={"badges modified"} rightImage2Label={"modified"} />
                    </div>
                </section>
                <section>
                    <p>Model:</p>
                    <ul>
                        <li>Adding monthly likes and downloads progress for Prusameters: on the model page integrate the section showing the monthly progress of likes and downloads towards the PrusaMeters milestone, in order to provide users with detailed information on the performance of their model over time.</li>
                        <li>Redesign of the print statistics section: to allow viewing of multiple files and support different printers, giving users a more complete overview of model printing times on different printer configurations.</li>
                    </ul>
                    <div className={"imagecompare model"}>
                        <ReactCompareImage leftImage={"/src/img/printables/model.png"} leftImageAlt={"model original"} leftImageLabel={"original"} rightImage={"/src/img/printables/model mod.png"} rightImageAlt={"model modified"} rightImageLabel={"modified"} />
                    </div>
                </section>
                <p>By implementing these proposals, the overall experience of users on the platform could be improved, making it easier for them to navigate, share and track their activities and successes.</p>
            </Col>
        </Row>
    </>;
};
