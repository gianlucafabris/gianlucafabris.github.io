import * as bootstrap from 'react-bootstrap';

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
    return <>
        <bootstrap.Row>
            <bootstrap.Col md={12} className="blur">
                {/* TODELETE */}
                <Typing typedContainer={typedContainer} TypingConfig={TypingConfig} />
                <style>{`
                #typed,.typed-cursor{
                    font-size: 10em;
                }
                `}</style>
            </bootstrap.Col>
        </bootstrap.Row>
        <bootstrap.Row>
            <bootstrap.Col md={12} className={"blur"}>
                <p>For now you can visit the following pages (still WIP) <a href="/#/printables">Printables</a>, <a href="/#/thesis">Thesis</a>, <a href="/#/solarsystem">Solar System</a>, <a href="/#/citiesguesser">Cities Guesser</a>, and <a href="https://gianlucafabris.github.io/MultimaterialToSwapGCode/" target="_blank">MultimaterialToSwapGCode</a>.</p>
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};
