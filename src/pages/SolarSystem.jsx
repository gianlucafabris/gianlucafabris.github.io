import { Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { useMemo } from "react";

import SolarSystemExperience from "../components/experiences/SolarSystemExperience.jsx";
import { useFetchJson } from "../components/utils/Json.jsx";

//configs
let SolarSystemConfigUrl = "/assets/configs/solarsystem.json";

export default function SolarSystem({ solarSystemContainer="solarsystem" }){
    const location = useLocation();
    
    const { data: SolarSystemConfig, loading: SolarSystemConfigLoading, error: SolarSystemConfigError } = useFetchJson(SolarSystemConfigUrl);

    const planet = useMemo(function(){
        const queryParams = new URLSearchParams(location.search);
        const planetName = queryParams.get("planet");
        const satelliteName = queryParams.get("satellite");

        if(!SolarSystemConfig || SolarSystemConfigLoading || SolarSystemConfigError){
            return { selectedPlanet: null, selectedSatellite: null };
        }
        
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
    }, [location.search, SolarSystemConfig, SolarSystemConfigLoading, SolarSystemConfigError]);
    
    if(import.meta.env.DEV){
        console.log("SolarSystem page");
    }
    
    return <>
        <Row>
            <Col md={12} className="blur flex">
                {/* TODO modale+hover */}
                {SolarSystemConfigLoading ? <div>Loading...</div> : SolarSystemConfigError ? <div>Error loading solar system config: {SolarSystemConfigError.message}</div> : SolarSystemConfig.planets.map(function(p, i){
                    return <div key={p.name}>
                        {p.satellites?.length > 0 ? <details>
                            <summary><Link to={`/solarsystem?planet=${p.name.toLowerCase()}`}>{p.name}</Link></summary>
                            <ul>
                                {p.satellites.map(function(s){
                                    return <li key={s.name}><Link to={`/solarsystem?planet=${p.name.toLowerCase()}&satellite=${s.name.toLowerCase()}`}>{s.name}</Link></li>;
                                })}
                            </ul>
                        </details> : <Link to={`/solarsystem?planet=${p.name.toLowerCase()}`}>{p.name}</Link>}
                    </div>
                })}
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                {SolarSystemConfigLoading ? <div>Loading...</div> : SolarSystemConfigError ? <div>Error loading solar system config: {SolarSystemConfigError.message}</div> : <SolarSystemExperience solarSystemContainer={solarSystemContainer} planet={planet} />}
            </Col>
        </Row>
    </>;
};