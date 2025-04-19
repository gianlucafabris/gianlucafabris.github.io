import * as bootstrap from 'react-bootstrap';

import { Debug } from '../components/Utils/Debug.js';
import ExperienceFallback from '../components/Utils/ExperienceFallback.js';
// import Background3D from '../components/Background/Background3D.js';
import Background2D from '../components/Background/Background2D.js';
import BackgroundImage from '../components/Background/BackgroundImage.js';
import Typing from '../components/Typing.js';
import TypingConfig from '../components/Config/typed.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Home({particlesContainer="particles", typedContainer="typed"}){
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
    return <>
        <Debug />
        <ExperienceFallback E3D={Background2D} E2D={Background2D} EI={BackgroundImage} particlesContainer={particlesContainer} />
        <bootstrap.Container>
            <Header active={"/#/home"} />
            <section className="main">
                <bootstrap.Row>
                    <bootstrap.Col md={12} className="blur">
                        <Typing typedContainer={typedContainer} typingConfig={TypingConfig} />
                    </bootstrap.Col>
                    {/* home */}
                </bootstrap.Row>
            </section>
            <Footer />
        </bootstrap.Container>
        <link href="/src/style.css" rel="stylesheet"/>
    </>;
};
