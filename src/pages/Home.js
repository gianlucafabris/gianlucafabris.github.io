import * as bootstrap from 'react-bootstrap';

import { Debug } from '../components/Utils/Debug.js';
import Background from '../components/Background.js';
import BackgroundConfig from '../components/Config/particles.js';
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
        <Background particlesContainer={particlesContainer} backgroundConfig={BackgroundConfig} />
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
