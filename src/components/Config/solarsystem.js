export default {
    ambientLight: {
        intensity: 0.1,
        color: "#ffffff"
    },
    pointLight: {
        intensity: 1.74 * 10e17 / (5 * 10e6),
        color: "#ffffff"
    },
    planets: [
        { // Sun
            name: "Sun",
            radius: 696.340,
            rotation: [0, 0, 0],
            distance: 0,
            elevation: 0,
            elevationBias: 0,
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/00_Sun/color.png"
                },
                {
                    type: "emissive",
                    url: "/src/img/solarsystem/00_Sun/emissive.png"
                }
            ],
            satellites: []
        },
        { // Mercury
            name: "Mercury",
            radius: 2.440,
            rotation: [0, 0, 0],
            distance: 58000.000,
            elevation: 9.860,
            elevationBias: -5.380,
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/01_Mercury/color.png"
                }
            ],
            satellites: []
        },
        { // Venus
            name: "Venus",
            radius: 6.052,
            rotation: [0, 0, 0],
            distance: 108200.000,
            elevation: 13.000,
            elevationBias: 0.000,
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/02_Venus/color.png"
                },
                {
                    type: "color_atmosphere",
                    url: "/src/img/solarsystem/02_Venus/color_atmosphere.png"
                }
            ],
            satellites: []
        },
        { // Earth
            name: "Earth",
            radius: 6.378,
            rotation: [0, 0, 0],
            distance: 149600.000,
            elevation: 19.783,
            elevationBias: -10.935,
            textures: [
                {
                    type: "ao",
                    url: "/src/img/solarsystem/03_Earth/ao.png"
                },
                {
                    type: "color",
                    url: "/src/img/solarsystem/03_Earth/color.png"
                },
                {
                    type: "color_night",
                    url: "/src/img/solarsystem/03_Earth/color_night.png"
                },
                {
                    type: "displacement",
                    url: "/src/img/solarsystem/03_Earth/displacement.png"
                },
                {
                    type: "normal",
                    url: "/src/img/solarsystem/03_Earth/normal.png"
                },
                {
                    type: "specular",
                    url: "/src/img/solarsystem/03_Earth/specular.png"
                },
                {
                    type: "color_atmosphere",
                    url: "/src/img/solarsystem/03_Earth/color_atmosphere.png"
                }
            ],
            satellites: [
                { // Moon
                    name: "Moon",
                    radius: 0.3844,
                    rotation: [0, 0, 0],
                    distance: 384.400,
                    elevation: 19.807,
                    elevationBias: -9.178,
                    textures: [
                        {
                            type: "ao",
                            url: "/src/img/solarsystem/03_Earth/Moon/ao.png"
                        },
                        {
                            type: "color",
                            url: "/src/img/solarsystem/03_Earth/Moon/color.png"
                        },
                        {
                            type: "displacement",
                            url: "/src/img/solarsystem/03_Earth/Moon/displacement.png"
                        },
                        {
                            type: "normal",
                            url: "/src/img/solarsystem/03_Earth/Moon/normal.png"
                        },
                        {
                            type: "specular",
                            url: "/src/img/solarsystem/03_Earth/Moon/specular.png"
                        }
                    ]
                }
            ]
        },
        { // Mars
            name: "Mars",
            radius: 3.390,
            rotation: [0, 0, 0],
            distance: 227900.000,
            elevation: 29.429,
            elevationBias: -8.200,
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/04_Mars/color.png"
                }
            ],
            satellites: [
                // Phobos
                // Deimos
            ]
        },
        // asteroid belt / Ceres
        { // Jupiter
            name: "Jupiter",
            radius: 69.911,
            rotation: [0, 0, 0],
            distance: 778500.000,
            elevation: 0,
            elevationBias: 0,
            ringsRange: [1, 1],
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/05_Jupiter/color.png"
                },
                // {
                //     type: "color_rings",
                //     url: "/src/img/solarsystem/05_Jupiter/color_rings.png"
                // }
            ],
            satellites: [
                // Io
                // Europa
                // Ganymede
                // Callisto
                // Amalthea
                // Thebe
                // Metis
                // Adrastea
                // ~80 others
            ]
        },
        { // Saturn
            name: "Saturn",
            radius: 58.232,
            rotation: [0, 0, 0],
            distance: 1434000.000,
            elevation: 0,
            elevationBias: 0,
            ringsRange: [1.1, 2.3],
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/06_Saturn/color.png"
                },
                {
                    type: "color_rings",
                    url: "/src/img/solarsystem/06_Saturn/color_rings.png"
                }
            ],
            satellites: [
                // Titan
                // Enceladus
                // Mimas
                // Tethys
                // Dione
                // Rhea
                // Iapetus
                // Hyperion
                // Phoebe
                // ~130 others
            ]
        },
        { // Uranus
            name: "Uranus",
            radius: 25.362,
            rotation: [0, 0, 0],
            distance: 2871000.000,
            elevation: 0,
            elevationBias: 0,
            ringsRange: [1, 1],
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/07_Uranus/color.png"
                },
                // {
                //     type: "color_rings",
                //     url: "/src/img/solarsystem/07_Uranus/color_rings.png"
                // }
            ],
            satellites: [
                // Titania
                // Oberon
                // Umbriel
                // Ariel
                // Miranda
                // 22 others
            ]
        },
        { // Neptune
            name: "Neptune",
            radius: 24.622,
            rotation: [0, 0, 0],
            distance: 4495000.000,
            elevation: 0,
            elevationBias: 0,
            ringsRange: [1, 1],
            textures: [
                {
                    type: "color",
                    url: "/src/img/solarsystem/08_Neptune/color.png"
                },
                // {
                //     type: "color_rings",
                //     url: "/src/img/solarsystem/08_Neptune/color_rings.png"
                // }
            ],
            satellites: [
                // Triton
                // Proteus
                // Nereid
                // Larissa
                // Galatea
                // Despina
                // Thalassa
                // Halimede
                // 7 others
            ]
        }
        // Pluto
            // Charon
            // Styx
            // Nix
            // Cerberus
            // Hydra
        // Kuiper belt objects / Makemake
        // Eris
            // Dysnomia
    ]
};
