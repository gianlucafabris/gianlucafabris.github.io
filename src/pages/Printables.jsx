import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import ReactCompareImage from "react-compare-image";

import PrintablesExperience from "../components/experiences/PrintablesExperience.jsx";

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

    useEffect(function(){
        const img = new Image();
        img.src = "data:image/webp;base64,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";
        img.onload = function(){
            leftImage = leftImage.replace(".png", ".webp");
            rightImage1 = rightImage1.replace(".png", ".webp");
            rightImage2 = rightImage2.replace(".png", ".webp");            
        };
        img.onerror = function(){
            leftImage = leftImage.replace(".webp", ".png");
            rightImage1 = rightImage1.replace(".webp", ".png");
            rightImage2 = rightImage2.replace(".webp", ".png");
        };
    }, []);

    return <ReactCompareImage leftImage={leftImage} leftImageAlt={leftImageAlt} leftImageLabel={leftImageLabel} rightImage={flip ? rightImage1 : rightImage2} rightImageAlt={flip ? rightImage1Alt : rightImage2Alt} rightImageLabel={flip ? rightImage1Label : rightImage2Label} imgProps={{ loading: "lazy" }} />;
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
                        <ReactCompareImage leftImage={"/src/img/printables/collections.png"} leftImageAlt={"collections and user original"} leftImageLabel={"original"} rightImage={"/src/img/printables/collections_mod.png"} rightImageAlt={"collections and user modified"} rightImageLabel={"modified"} />
                    </div>
                </section>
                <section>
                    <p>About the user - medals section:</p>
                    <ul>
                        <li>Redesign of the medals section: to allow users to download the medal for past levels and see who achieved each level, giving users additional motivation to achieve higher goals</li>
                    </ul>
                    <div className={"imagecompare badges"}>
                        <FlipReactImageCompare leftImage={"/src/img/printables/badges.png"} leftImageAlt={"badges original"} leftImageLabel={"original"} rightImage1={"/src/img/printables/badges_mod.png"} rightImage1Alt={"badges modified"} rightImage1Label={"modified"} rightImage2={"/src/img/printables/badges_mod2.png"} rightImage2Alt={"badges modified"} rightImage2Label={"modified"} />
                    </div>
                </section>
                <section>
                    <p>Model:</p>
                    <ul>
                        <li>Adding monthly likes and downloads progress for Prusameters: on the model page integrate the section showing the monthly progress of likes and downloads towards the PrusaMeters milestone, in order to provide users with detailed information on the performance of their model over time.</li>
                        <li>Redesign of the print statistics section: to allow viewing of multiple files and support different printers, giving users a more complete overview of model printing times on different printer configurations.</li>
                    </ul>
                    <div className={"imagecompare model"}>
                        <ReactCompareImage leftImage={"/src/img/printables/model.png"} leftImageAlt={"model original"} leftImageLabel={"original"} rightImage={"/src/img/printables/model_mod.png"} rightImageAlt={"model modified"} rightImageLabel={"modified"} />
                    </div>
                </section>
                <p>By implementing these proposals, the overall experience of users on the platform could be improved, making it easier for them to navigate, share and track their activities and successes.</p>
            </Col>
        </Row>
    </>;
};
