import * as bootstrap from 'react-bootstrap';

import Typing from '../components/Typing.js';
import TypingConfig from '../components/Config/typed.js';

export default function Home({typedContainer="typed"}){
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
                <Typing typedContainer={typedContainer} typingConfig={TypingConfig} />
            </bootstrap.Col>
        </bootstrap.Row>
        <bootstrap.Row>
            <bootstrap.Col md={12} className={"blur"}>
                <p>For now you can visit the following pages (still WIP) <a href="/#/printables">Printables</a>, <a href="/#/solarsystem">Solar System</a>, <a href="/#/thesis">Thesis</a>, and <a href="https://gianlucafabris.github.io/MultimaterialToSwapGCode/">MultimaterialToSwapGCode</a>.</p>
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};
