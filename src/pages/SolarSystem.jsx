import * as bootstrap from 'react-bootstrap';

import { useMemo } from 'react';
import { useLocation } from 'react-router';

import SolarSystemExperience from '../components/Experiences/SolarSystemExperience.jsx';

import SolarSystemConfig from '../components/Config/solarsystem.js';

export default function SolarSystem({ solarSystemContainer="solarsystem" }){
    const location = useLocation();
    
    const planet = useMemo(function(){
        const queryParams = new URLSearchParams(location.search);
        const planetName = queryParams.get("planet");
        const satelliteName = queryParams.get("satellite");

        if(!planetName){
            return { selectedPlanet: SolarSystemConfig.planets[3], selectedSatellite: null }; // fallback -> Earth
        }
        
        let selectedPlanet = SolarSystemConfig.planets.find(function(p){
            return p.name.toLowerCase() === planetName.toLowerCase();
        });
        if(selectedPlanet == null){ // fallback -> Earth
           selectedPlanet = SolarSystemConfig.planets[3];
        }

        let selectedSatellite = null;
        if(satelliteName && selectedPlanet.satellites){
            selectedSatellite = selectedPlanet.satellites.find(function(s) {
                return s.name.toLowerCase() === satelliteName.toLowerCase();
            });
        }

        return { selectedPlanet: selectedPlanet, selectedSatellite: selectedSatellite };
    }, [location.search]);

    return <>
        <bootstrap.Row>
            <bootstrap.Col md={12} className="blur flex">
                {/* TODO modale+hover */}
                {SolarSystemConfig.planets.map(function(p, i){
                    return <div key={p.name}>
                        {p.satellites?.length > 0 ? <details>
                            <summary><a href={`/#/solarsystem?planet=${p.name.toLowerCase()}`}>{p.name}</a></summary>
                            <ul>
                                {p.satellites.map(function(s){
                                    return <li key={s.name}><a href={`/#/solarsystem?planet=${p.name.toLowerCase()}&satellite=${s.name.toLowerCase()}`}>{s.name}</a></li>;
                                })}
                            </ul>
                        </details> : <a href={`/#/solarsystem?planet=${p.name.toLowerCase()}`}>{p.name}</a>}
                    </div>
                })}
            </bootstrap.Col>
        </bootstrap.Row>
        <bootstrap.Row>
            <bootstrap.Col md={12}>
                <SolarSystemExperience solarSystemContainer={solarSystemContainer} planet={planet} />
            </bootstrap.Col>
        </bootstrap.Row>
    </>;
};