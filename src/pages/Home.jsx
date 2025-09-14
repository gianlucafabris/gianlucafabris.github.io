import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import Typing from '../components/Typing.jsx';

import TypingConfig from '../components/Config/typed_home.js';

export default function Home({ typedContainer="typed" }){
    console.log(`
     ####  #   ##   #    # #      #    #  ####    ##   ######   ##   #####  ##### 
    #    # #  #  #  ##   # #      #    # #    #  #  #  #       #  #  #    # #    #
    #      # #    # # #  # #      #    # #      #    # #####  #    # #####  #    #
    #  ### # ###### #  # # #      #    # #      ###### #      ###### #    # ##### 
    #    # # #    # #   ## #      #    # #    # #    # #      #    # #    # #   # 
     ####  # #    # #    # ######  ####   ####  #    # #      #    # #####  #    #
                                                                                  
    #  ####      ####  # ##### #    # #    # #####     #  ####                    
    # #         #    # #   #   #    # #    # #    #    # #    #                   
    #  ####     #      #   #   ###### #    # #####     # #    #                   
    #      #    #  ### #   #   #    # #    # #    #    # #    #                   
    # #    # ## #    # #   #   #    # #    # #    # ## # #    #                   
    #  ####  ##  ####  #   #   #    #  ####  #####  ## #  ####                    
    `)

    if(import.meta.env.DEV){
        console.log("Home page");
    }
    return <>
        <Row>
            <Col md={12} className="blur">
                {/* TODELETE */}
                <Typing typedContainer={typedContainer} TypingConfig={TypingConfig} />
                <style>{`
                #typed,.typed-cursor{
                    font-size: 10em;
                }
                `}</style>
            </Col>
        </Row>
        <Row>
            <Col md={12} className={"blur"}>
                <p>For now you can visit the following pages (still WIP) <Link to="/printables">Printables</Link>, <Link to="/thesis">Thesis</Link>, <Link to="/solarsystem">Solar System</Link>, <Link to="/citiesguesser">Cities Guesser</Link>, and <Link to="https://gianlucafabris.github.io/MultimaterialToSwapGCode/" target="_blank">MultimaterialToSwapGCode</Link>.</p>
            </Col>
        </Row>
    </>;
};
