import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { folder } from 'leva';

import { addParticlesPanel, addDebug } from './Utils/Debug';

export default function Background({particlesContainer, backgroundConfig}){
    let config = addDebug("particles", {
        autoplay: {
            value: backgroundConfig.autoplay
        },
        background: folder({
            background_color: folder({
                background_color_value: folder({
                    background_color_value_0: {
                        value: backgroundConfig.background.color.value[0],
                        label: "0"
                    }
                }, {label: "value", collapsed: false}) //TODO array
            }, {label: "value", collapsed: true}),
            background_image: {
                value: backgroundConfig.background.image,
                label: "image"
            },
            background_opacity: {
                value: backgroundConfig.background.opacity,
                label: "opacity",
                min: 0,
                max: 1,
                step: 0.01
            },
            background_position: {
                value: backgroundConfig.background.position,
                label: "position"
            },
            background_repeat: {
                value: backgroundConfig.background.repeat,
                label: "repeat"
            },
            background_size: {
                value: backgroundConfig.background.size,
                label: "size"
            }
        }, {collapsed: true}),
        backgroundMask: folder({
            backgroundMask_composite: {
                value: backgroundConfig.backgroundMask.composite,
                label: "composite",
                options: ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-edge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]
            },
            backgroundMask_cover: folder({
                backgroundMask_cover_color: folder({
                    backgroundMask_cover_color_value: folder({
                        backgroundMask_cover_color_value_0: {
                            value: backgroundConfig.backgroundMask.cover.color.value[0],
                            label: "0"
                        }
                    }, {label: "value", collapsed: false})
                }, {label: "color", collapsed: false}),
                backgroundMask_cover_opacity: {
                    value: backgroundConfig.backgroundMask.cover.opacity,
                    label: "opacity",
                    min: 0,
                    max: 1,
                    step: 0.01
                }
            }, {label: "cover", collapsed: true}),
            backgroundMask_enable: {
                value: backgroundConfig.backgroundMask.enable,
                label: "enable"
            }
        }, {collapsed: true}),
        delay: {
            value: [backgroundConfig.delay.min, backgroundConfig.delay.max],
            label: "delay",
            min: 0,
            max: 10,
            step: 0.1
        },
        detectRetina: {
            value: backgroundConfig.detectRetina
        },
        duration: {
            value: [backgroundConfig.duration.min, backgroundConfig.duration.max],
            label: "duration",
            min: 0,
            max: 100,
            step: 0.1
        },
        fpsLimit: {
            value: backgroundConfig.fpsLimit,
            min: 0,
            max: 360,
            step: 1
        },
        fullScreen: folder({
            fullScreen_enable: {
                value: backgroundConfig.fullScreen.enable,
                label: "enable"
            },
            fullScreen_zIndex: {
                value: backgroundConfig.fullScreen.zIndex,
                label: "zIndex",
                min: 0,
                max: 1000,
                step: 1
            }
        }, {collapsed: true}),
        interactivity: folder({
            interactivity_detectsOn: {
                value: backgroundConfig.interactivity.detectsOn,
                label: "detectsOn",
                options: ["canvas", "parent", "window"]
            },
            interactivity_events: folder({
                interactivity_events_onClick: folder({
                    interactivity_events_onClick_enable: {
                        value: backgroundConfig.interactivity.events.onClick.enable,
                        label: "enable"
                    },
                    interactivity_events_onClick_mode: folder({
                        interactivity_events_onClick_mode_0: {
                            value: backgroundConfig.interactivity.events.onClick.mode[0],
                            label: "0",
                            options: ["attract", "bubble", "push", "remove", "repulse", "pause", "trail"]
                        }
                    }, {label: "mode", collapsed: false}) //TODO array
                }, {label: "onClick", collapsed: false}),
                interactivity_events_onDiv: folder({
                    interactivity_events_onDiv_enable: {
                        value: backgroundConfig.interactivity.events.onDiv.enable,
                        label: "enable"
                    },
                    interactivity_events_onDiv_mode: folder({
                        interactivity_events_onDiv_mode_0: {
                            value: backgroundConfig.interactivity.events.onDiv.mode[0],
                            label: "0",
                            options: ["bounce", "bubble", "repulse"]
                        }
                    }, {label: "mode", collapsed: false}), //TODO array
                    interactivity_events_onDiv_selectors: folder({
                        interactivity_events_onDiv_selectors_0: {
                            value: backgroundConfig.interactivity.events.onDiv.selectors[0],
                            label: "0"
                        }
                    }, {label: "selectors", collapsed: false}), //TODO array
                    interactivity_events_onDiv_type: {
                        value: backgroundConfig.interactivity.events.onDiv.type,
                        label: "type",
                        options: ["circle", "rectangle"]
                    }
                }, {label: "onDiv", collapsed: false}),
                interactivity_events_onHover: folder({
                    interactivity_events_onHover_enable: {
                        value: backgroundConfig.interactivity.events.onHover.enable,
                        label: "enable"
                    },
                    interactivity_events_onHover_mode: folder({
                        interactivity_events_onHover_mode_0: {
                            value: backgroundConfig.interactivity.events.onHover.mode[0],
                            label: "0",
                            options: ["attract", "bounce", "bubble", "connect", "grab", "light", "repulse", "slow", "trail"]
                        },
                        interactivity_events_onHover_mode_1: {
                            value: backgroundConfig.interactivity.events.onHover.mode[1],
                            label: "1",
                            options: ["attract", "bounce", "bubble", "connect", "grab", "light", "repulse", "slow", "trail"]
                        }
                    }, {label: "mode", collapsed: false}),
                    interactivity_events_onHover_parallax: folder({
                        interactivity_events_onHover_parallax_enable: {
                            value: backgroundConfig.interactivity.events.onHover.parallax.enable,
                            label: "enable"
                        },interactivity_events_onHover_parallax_force: {
                            value: backgroundConfig.interactivity.events.onHover.parallax.force,
                            label: "force",
                            min: 0,
                            max: 100,
                            step: 1
                        },interactivity_events_onHover_parallax_smooth: {
                            value: backgroundConfig.interactivity.events.onHover.parallax.smooth,
                            label: "smooth",
                            min: 0,
                            max: 100,
                            step: 1
                        },
                    }, {label: "parallax", collapsed: false})
                }, {label: "onHover", collapsed: false}),
                interactivity_events_resize: folder({
                    interactivity_events_resize_delay: {
                        value: backgroundConfig.interactivity.events.resize.delay,
                        label: "delay",
                        min: 0,
                        max: 10,
                        step: 0.1
                    },
                    interactivity_events_resize_enable: {
                        value: backgroundConfig.interactivity.events.resize.enable,
                        label: "enable"
                    }
                }, {label: "resize", collapsed: false}),
            }, {label: "events", collapsed: true}),
            interactivity_modes: folder({
                interactivity_modes_attract: folder({
                    interactivity_modes_attract_distance: {
                        value: backgroundConfig.interactivity.modes.attract.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    interactivity_modes_attract_duration: {
                        value: backgroundConfig.interactivity.modes.attract.duration,
                        label: "duration",
                        min: 0,
                        max: 10,
                        step: 0.5
                    },
                    interactivity_modes_attract_easing: {
                        value: backgroundConfig.interactivity.modes.attract.easing,
                        label: "easing",
                        options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                    },
                    interactivity_modes_attract_factor: {
                        value: backgroundConfig.interactivity.modes.attract.factor,
                        label: "factor",
                        min: 0,
                        max: 10,
                        step: 1
                    },
                    interactivity_modes_attract_maxSpeed: {
                        value: backgroundConfig.interactivity.modes.attract.maxSpeed,
                        label: "maxSpeed",
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    interactivity_modes_attract_speed: {
                        value: backgroundConfig.interactivity.modes.attract.speed,
                        label: "speed",
                        min: 0,
                        max: 100,
                        step: 1
                    }
                }, {label: "attract", collapsed: false}),
                interactivity_modes_bounce: folder({
                    interactivity_modes_bounce_distance: {
                        value: backgroundConfig.interactivity.modes.bounce.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    }
                }, {label: "bounce", collapsed: false}),
                interactivity_modes_bubble: folder({
                    interactivity_modes_bubble_distance: {
                        value: backgroundConfig.interactivity.modes.bubble.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    interactivity_modes_bubble_duration: {
                        value: backgroundConfig.interactivity.modes.bubble.duration,
                        label: "duration",
                        min: 0,
                        max: 10,
                        step: 0.1
                    },
                    interactivity_modes_bubble_mix: {
                        value: backgroundConfig.interactivity.modes.bubble.mix,
                        label: "mix"
                    },
                    interactivity_modes_bubble_opacity: {
                        value: backgroundConfig.interactivity.modes.bubble.opacity,
                        label: "opacity",
                        min: 0,
                        max: 1,
                        step: 0.01
                    },
                    interactivity_modes_bubble_color: folder({
                        interactivity_modes_bubble_color_value: folder({
                            interactivity_modes_bubble_color_value_0: {
                                value: backgroundConfig.interactivity.modes.bubble.color.value[0],
                                label: "0"
                            }
                        }, {label: "value", collapsed: false}) //TODO array
                    }, {label: "color", collapsed: false}),
                    interactivity_modes_bubble_size: {
                        value: backgroundConfig.interactivity.modes.bubble.size,
                        label: "size",
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    interactivity_modes_bubble_divs: folder({
                        interactivity_modes_bubble_divs_distance: {
                            value: backgroundConfig.interactivity.modes.bubble.divs.distance,
                            label: "distance",
                            min: 0,
                            max: Math.max(window.innerWidth, window.innerHeight),
                            step: 1
                        },
                        interactivity_modes_bubble_divs_duration: {
                            value: backgroundConfig.interactivity.modes.bubble.divs.duration,
                            label: "duration",
                            min: 0,
                            max: 10,
                            step: 0.1
                        },
                        interactivity_modes_bubble_divs_mix: {
                            value: backgroundConfig.interactivity.modes.bubble.divs.mix,
                            label: "mix"
                        },
                        interactivity_modes_bubble_divs_selectors: folder({
                            interactivity_modes_bubble_divs_selectors_0: {
                                value: backgroundConfig.interactivity.modes.bubble.divs.selectors[0],
                                label: "0"
                            }
                        }, {label: "selectors", collapsed: false}) //TODO array
                    }, {label: "divs", collapsed: false})
                }, {label: "bubble", collapsed: false}),
                interactivity_modes_connect: folder({
                    interactivity_modes_connect_distance: {
                        value: backgroundConfig.interactivity.modes.connect.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    interactivity_modes_connect_links: folder({
                        interactivity_modes_connect_links_opacity: {
                            value: backgroundConfig.interactivity.modes.connect.links.opacity,
                            label: "opacity",
                            min: 0,
                            max: 1,
                            step: 0.01
                        }
                    }, {label: "links", collapsed: false}),
                    interactivity_modes_connect_radius: {
                        value: backgroundConfig.interactivity.modes.connect.radius,
                        label: "radius",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    }
                }, {label: "connect", collapsed: false}),
                interactivity_modes_grab: folder({
                    interactivity_modes_grab_distance: {
                        value: backgroundConfig.interactivity.modes.grab.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    interactivity_modes_grab_links: folder({
                        interactivity_modes_grab_links_blink: {
                            value: backgroundConfig.interactivity.modes.grab.links.blink,
                            label: "blink",
                            min: 0,
                            max: 1,
                            step: 0.01
                        },
                        interactivity_modes_grab_links_consent: {
                            value: backgroundConfig.interactivity.modes.grab.links.consent,
                            label: "consent",
                            min: 0,
                            max: 1,
                            step: 0.01
                        },
                        interactivity_modes_grab_links_opacity: {
                            value: backgroundConfig.interactivity.modes.grab.links.opacity,
                            label: "opacity",
                            min: 0,
                            max: 1,
                            step: 0.01
                        }
                    }, {label: "links", collapsed: false})
                }, {label: "grab", collapsed: false}),
                interactivity_modes_light: folder({
                    interactivity_modes_light_area: folder({
                        interactivity_modes_light_area_gradient: folder({
                            interactivity_modes_light_area_gradient_start: folder({
                                interactivity_modes_light_area_gradient_start_value: folder({
                                    interactivity_modes_light_area_gradient_start_value_0: {
                                        value: backgroundConfig.interactivity.modes.light.area.gradient.start.value[0],
                                        label: "0"
                                    }
                                }, {label: "value", collapsed: false}) //TODO array
                            }, {label: "start", collapsed: false}),
                            interactivity_modes_light_area_gradient_stop: folder({
                                interactivity_modes_light_area_gradient_stop_value: folder({
                                    interactivity_modes_light_area_gradient_stop_value_0: {
                                        value: backgroundConfig.interactivity.modes.light.area.gradient.stop.value[0],
                                        label: "0"
                                    }
                                }, {label: "value", collapsed: false}) //TODO array
                            }, {label: "stop", collapsed: false}),
                        }, {label: "gradient", collapsed: false}),
                        interactivity_modes_light_area_radius: {
                            value: backgroundConfig.interactivity.modes.light.area.radius,
                            label: "radius",
                            min: 0,
                            max: 1000,
                            step: 1
                        }
                    }, {label: "area", collapsed: false}),
                    interactivity_modes_light_shadow: folder({
                        interactivity_modes_light_shadow_color: folder({
                            interactivity_modes_light_shadow_color_value: folder({
                                interactivity_modes_light_shadow_color_value_0: {
                                    value: backgroundConfig.interactivity.modes.light.shadow.color.value[0],
                                    label: "0"
                                }
                            }, {label: "value", collapsed: false}) //TODO array
                        }, {label: "color", collapsed: false}),
                        interactivity_modes_light_shadow_length: {
                            value: backgroundConfig.interactivity.modes.light.shadow.length,
                            label: "length",
                            min: 0,
                            max: 10000,
                            step: 1
                        }
                    }, {label: "shadow", collapsed: false})
                }, {label: "light", collapsed: false}),
                interactivity_modes_push: folder({
                    interactivity_modes_push_default: {
                        value: backgroundConfig.interactivity.modes.push.default,
                        label: "default"
                    },
                    interactivity_modes_push_groups: folder({
                        interactivity_modes_push_groups_0: {
                            value: backgroundConfig.interactivity.modes.push.groups[0],
                            label: "0",
                            min: 0,
                            max: 50,
                            step: 1
                        }
                    }, {label: "groups", collapsed: false}), //TODO array
                    interactivity_modes_push_quantity: {
                        value: backgroundConfig.interactivity.modes.push.quantity,
                        label: "quantity",
                        min: 0,
                        max: 50,
                        step: 1
                    }
                }, {label: "push", collapsed: false}),
                interactivity_modes_remove: folder({
                    interactivity_modes_remove_quantity: {
                        value: backgroundConfig.interactivity.modes.remove.quantity,
                        label: "quantity",
                        min: 0,
                        max: 50,
                        step: 1
                    }
                }, {label: "remove", collapsed: false}),
                interactivity_modes_repulse: folder({
                    interactivity_modes_repulse_distance: {
                        value: backgroundConfig.interactivity.modes.repulse.distance,
                        label: "distance",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    interactivity_modes_repulse_duration: {
                        value: backgroundConfig.interactivity.modes.repulse.duration,
                        label: "duration",
                        min: 0,
                        max: 10,
                        step: 0.1
                    },
                    interactivity_modes_repulse_factor: {
                        value: backgroundConfig.interactivity.modes.repulse.factor,
                        label: "factor",
                        min: 0,
                        max: 10,
                        step: 1
                    },
                    interactivity_modes_repulse_speed: {
                        value: backgroundConfig.interactivity.modes.repulse.speed,
                        label: "speed",
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    interactivity_modes_repulse_maxSpeed: {
                        value: backgroundConfig.interactivity.modes.repulse.maxSpeed,
                        label: "maxSpeed",
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    interactivity_modes_repulse_easing: {
                        value: backgroundConfig.interactivity.modes.repulse.easing,
                        label: "easing",
                        options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                    },
                    interactivity_modes_repulse_divs: folder({
                        interactivity_modes_repulse_divs_distance: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.distance,
                            label: "distance",
                            min: 0,
                            max: Math.max(window.innerWidth, window.innerHeight),
                            step: 1
                        },
                        interactivity_modes_repulse_divs_duration: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.duration,
                            label: "duration",
                            min: 0,
                            max: 10,
                            step: 0.1
                        },
                        interactivity_modes_repulse_divs_factor: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.factor,
                            label: "factor",
                            min: 0,
                            max: 10,
                            step: 1
                        },
                        interactivity_modes_repulse_divs_speed: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.speed,
                            label: "speed",
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        interactivity_modes_repulse_divs_maxSpeed: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.maxSpeed,
                            label: "maxSpeed",
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        interactivity_modes_repulse_divs_easing: {
                            value: backgroundConfig.interactivity.modes.repulse.divs.easing,
                            label: "easing",
                            options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]
                        },
                        interactivity_modes_repulse_divs_selectors: folder({
                            interactivity_modes_repulse_divs_selectors_0: {
                                value: backgroundConfig.interactivity.modes.repulse.divs.selectors[0],
                                label: "0"
                            }
                        }, {label: "selectors", collapsed: false}) //TODO array
                    }, {label: "divs", collapsed: false})
                }, {label: "repulse", collapsed: false}),
                interactivity_modes_pause: {
                    value: backgroundConfig.interactivity.modes.pause,
                    label: "pause"
                },
                interactivity_modes_slow: folder({
                    interactivity_modes_slow_factor: {
                        value: backgroundConfig.interactivity.modes.slow.factor,
                        label: "factor",
                        min: 0,
                        max: 10,
                        step: 1
                    },
                    interactivity_modes_slow_radius: {
                        value: backgroundConfig.interactivity.modes.slow.radius,
                        label: "radius",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    }
                }, {label: "slow", collapsed: false}),
                interactivity_modes_trail: folder({
                    interactivity_modes_trail_delay: {
                        value: backgroundConfig.interactivity.modes.trail.delay,
                        label: "delay",
                        min: 0,
                        max: 10,
                        step: 0.1
                    },
                    interactivity_modes_trail_pauseOnStop: {
                        value: backgroundConfig.interactivity.modes.trail.pauseOnStop,
                        label: "pauseOnStop"
                    },
                    interactivity_modes_trail_quantity: {
                        value: backgroundConfig.interactivity.modes.trail.quantity,
                        label: "quantity",
                        min: 0,
                        max: 50,
                        step: 1
                    }
                }, {label: "trail", collapsed: false})
            }, {label: "modes", collapsed: true}),
        }, {collapsed: true}),
        manualParticles: folder({
            manualParticles_0: folder({
                manualParticles_0_options_show: {
                    value: true,
                    label: "Show options"
                },
                manualParticles_0_options: {
                    value: backgroundConfig.manualParticles[0].options,
                    label: "options",
                    render: function(get){return get('particles.manualParticles.manualParticles_0.manualParticles_0_options_show');}
                }, //particles
                manualParticles_0_position_show: {
                    value: true,
                    label: "Show position"
                },
                manualParticles_0_position: {
                    value: backgroundConfig.manualParticles[0].position,
                    label: "position",
                    min: 0,
                    max: Math.max(window.innerWidth, window.innerHeight),
                    step: 1,
                    render: function(get){return get('particles.manualParticles.manualParticles_0.manualParticles_0_position_show');}
                }
            }, {label: "0", collapsed: true})
        }, {collapsed: true}), //TODO array
        particles: folder({
            particles_bounce: folder({
                particles_bounce_horizontal: folder({
                    particles_bounce_horizontal_value: {
                        value: [backgroundConfig.particles.bounce.horizontal.value.min, backgroundConfig.particles.bounce.horizontal.value.max],
                        label: "value",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "horizontal", collapsed: false}),particles_bounce_vertical: folder({
                    particles_bounce_vertical_value: {
                        value: [backgroundConfig.particles.bounce.vertical.value.min, backgroundConfig.particles.bounce.vertical.value.max],
                        label: "value",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "vertical", collapsed: false})
            }, {label: "bounce", collapsed: true}),
            particles_collisions: folder({
                particles_collisions_absorb: folder({
                    particles_collisions_absorb_speed: {
                        value: backgroundConfig.particles.collisions.absorb.speed,
                        label: "speed",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "absorb", collapsed: false}),
                particles_collisions_bounce: {
                    value: backgroundConfig.particles.collisions.bounce,
                    label: "bounce"
                }, //bounce
                particles_collisions_bounce: {
                    value: backgroundConfig.particles.collisions.bounce,
                    label: "bounce"
                },
                particles_collisions_enable: {
                    value: backgroundConfig.particles.collisions.enable,
                    label: "enable"
                },
                particles_collisions_mode: {
                    value: backgroundConfig.particles.collisions.mode,
                    label: "mode",
                    options: ["absorb", "bounce", "destroy"]
                },
                particles_collisions_overlap: folder({
                    particles_collisions_overlap_enable: {
                        value: backgroundConfig.particles.collisions.overlap.enable,
                        label: "enable"
                    },
                    particles_collisions_overlap_retries: {
                        value: backgroundConfig.particles.collisions.overlap.retries,
                        label: "retries",
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                }, {label: "overlap", collapsed: false}),
            }, {label: "collisions", collapsed: true}),
            particles_color: folder({
                particles_color_value: folder({
                    particles_color_value_0: {
                        value: backgroundConfig.particles.color.value[0],
                        label: "0"
                    }
                }, {label: "value", collapsed: false}) //TODO array
            }, {label: "color", collapsed: true}),
            particles_groups: {
                value: backgroundConfig.particles.groups,
                label: "groups"
            }, //particles
            particles_interactivity_show:{
                value: true,
                label: "Show interactivity"
            },
            particles_interactivity:{
                value: backgroundConfig.particles.interactivity,
                label: "interactivity",
                render: function(get){return get('particles.particles.articles_interactivity_show');}
            }, //interactivity
            particles_links: folder({
                particles_links_blink: {
                    value: backgroundConfig.particles.links.blink,
                    label: "blink"
                },
                particles_links_color: folder({
                    particles_links_color_value: folder({
                        particles_links_color_value_0: {
                            value: backgroundConfig.particles.links.color.value[0],
                            label: "0"
                        }
                    }, {label: "value", collapsed: false}) //TODO array
                }, {label: "color", collapsed: false}),
                particles_links_consent: {
                    value: backgroundConfig.particles.links.consent,
                    label: "consent"
                },
                particles_links_distance: {
                    value: backgroundConfig.particles.links.distance,
                    label: "distance",
                    min: 0,
                    max: 1000,
                    step: 1
                },
                particles_links_enable: {
                    value: backgroundConfig.particles.links.enable,
                    label: "enable"
                },
                particles_links_frequency: {
                    value: backgroundConfig.particles.links.frequency,
                    label: "frequency",
                    min: 0,
                    max: 1,
                    step: 0.01
                },
                particles_links_opacity: {
                    value: backgroundConfig.particles.links.opacity,
                    label: "opacity",
                    min: 0,
                    max: 1,
                    step: 0.01
                },
                particles_links_shadow: folder({
                    particles_links_shadow_blur: {
                        value: backgroundConfig.particles.links.shadow.blur,
                        label: "blur",
                        min: 0,
                        max: 50,
                        step: 1
                    },
                    particles_links_shadow_color: folder({
                        particles_links_shadow_color_value: folder({
                            particles_links_shadow_color_value_0: {
                                value: backgroundConfig.particles.links.shadow.color.value[0],
                                label: "0"
                            }
                        }, {label: "value", collapsed: false}) //TODO array
                    }, {label: "color", collapsed: false}),
                    particles_links_shadow_enable: {
                        value: backgroundConfig.particles.links.shadow.enable,
                        label: "enable"
                    },
                }, {label: "shadow", collapsed: false}),
                particles_links_triangles: folder({
                    particles_links_triangles_enable: {
                        value: backgroundConfig.particles.links.triangles.enable,
                        label: "enable"
                    },
                    particles_links_triangles_frequency: {
                        value: backgroundConfig.particles.links.triangles.frequency,
                        label: "frequency",
                        min: 0,
                        max: 1,
                        step: 0.01
                    },
                    particles_links_triangles_opacity: {
                        value: backgroundConfig.particles.links.triangles.opacity,
                        label: "opacity",
                        min: 0,
                        max: 1,
                        step: 0.01
                    },
                }, {label: "triangles", collapsed: false}),
                particles_links_width: {
                    value: backgroundConfig.particles.links.width,
                    label: "width",
                    min: 0,
                    max: 1000,
                    step: 1
                },
                particles_links_warp: {
                    value: backgroundConfig.particles.links.warp,
                    label: "warp"
                }
            }, {label: "links", collapsed: true}),
            particles_move: folder({
                particles_move_angle: folder({
                    particles_move_angle_offset: {
                        value: [backgroundConfig.particles.move.angle.offset.min, backgroundConfig.particles.move.angle.offset.max],
                        label: "offset",
                        min: -Math.max(window.innerWidth, window.innerHeight),
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    particles_move_angle_value: {
                        value: [backgroundConfig.particles.move.angle.value.min, backgroundConfig.particles.move.angle.value.max],
                        label: "value",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "angle", collapsed: false}),
                particles_move_attract: folder({
                    particles_move_attract_distance: {
                        value: [backgroundConfig.particles.move.attract.distance.min, backgroundConfig.particles.move.attract.distance.max],
                        label: "distance",
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    particles_move_attract_enable: {
                        value: backgroundConfig.particles.move.attract.enable,
                        label: "enable"
                    },
                    particles_move_attract_rotate: {
                        value: backgroundConfig.particles.move.attract.rotate,
                        label: "rotate",
                        min: 0,
                        max: 10000,
                        step: 1
                    }
                }, {label: "attract", collapsed: false}),
                particles_move_center: folder({
                    particles_move_center_mode: {
                        value: backgroundConfig.particles.move.center.mode,
                        label: "mode",
                        options: ["precise", "percent"]
                    },
                    particles_move_center_radius: {
                        value: backgroundConfig.particles.move.center.radius,
                        label: "radius",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "center", collapsed: false}),
                particles_move_decay: {
                    value: [backgroundConfig.particles.move.decay.min, backgroundConfig.particles.move.decay.max],
                    label: "decay",
                    min: 0,
                    max: 1000,
                    step: 1
                },
                particles_move_direction: {
                    value: backgroundConfig.particles.move.direction,
                    label: "direction",
                    options: ["bottom", "bottom-left", "bottom-right", "left", "none", "right", "top", "top-left", "top-right", "outside", "inside"]
                },
                particles_move_distance: folder({
                    particles_move_distance_horizontal: {
                        value: backgroundConfig.particles.move.distance.horizontal,
                        label: "horizontal",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    },
                    particles_move_distance_vertical: {
                        value: backgroundConfig.particles.move.distance.vertical,
                        label: "vertical",
                        min: 0,
                        max: Math.max(window.innerWidth, window.innerHeight),
                        step: 1
                    }
                }, {label: "distance", collapsed: false}),
                particles_move_drift: {
                    value: [backgroundConfig.particles.move.drift.min, backgroundConfig.particles.move.drift.max],
                    label: "drift",
                    min: 0,
                    max: 10,
                    step: 0.01
                },
                particles_move_enable: {
                    value: backgroundConfig.particles.move.enable,
                    label: "enable"
                },
                particles_move_gravity: folder({
                    particles_move_gravity_acceleration: {
                        value: [backgroundConfig.particles.move.gravity.acceleration.min, backgroundConfig.particles.move.gravity.acceleration.max],
                        label: "acceleration",
                        min: 0,
                        max: 1000,
                        step: 1
                    },
                    particles_move_gravity_enable: {
                        value: backgroundConfig.particles.move.gravity.enable,
                        label: "enable"
                    },
                    particles_move_gravity_inverse: {
                        value: backgroundConfig.particles.move.gravity.inverse,
                        label: "inverse"
                    },
                    particles_move_gravity_maxSpeed: {
                        value: [backgroundConfig.particles.move.gravity.maxSpeed.min, backgroundConfig.particles.move.gravity.maxSpeed.max],
                        label: "maxSpeed",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "gravity", collapsed: false}),
                particles_move_outModes: folder({
                    particles_move_outModes_bottom_show: {
                        value: true,
                        label: "Show bottom"
                    },
                    particles_move_outModes_bottom: {
                        value: backgroundConfig.particles.move.outModes.bottom,
                        label: "bottom",
                        options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"],
                        render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_bottom_show');}
                    },
                    particles_move_outModes_default: {
                        value: backgroundConfig.particles.move.outModes.default,
                        label: "default",
                        options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]
                    },
                    particles_move_outModes_left_show: {
                        value: true,
                        label: "Show left"
                    },
                    particles_move_outModes_left: {
                        value: backgroundConfig.particles.move.outModes.left,
                        label: "left",
                        options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"],
                        render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_left_show');}
                    },
                    particles_move_outModes_right_show: {
                        value: true,
                        label: "Show right"
                    },
                    particles_move_outModes_right: {
                        value: backgroundConfig.particles.move.outModes.right,
                        label: "right",
                        options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"],
                        render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_right_show');}
                    },
                    particles_move_outModes_top_show: {
                        value: true,
                        label: "Show top"
                    },
                    particles_move_outModes_top: {
                        value: backgroundConfig.particles.move.outModes.top,
                        label: "top",
                        options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"],
                        render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_top_show');}
                    }
                }, {label: "outModes", collapsed: false}),
                particles_move_path: folder({
                    particles_move_path_clamp: {
                        value: backgroundConfig.particles.move.path.clamp,
                        label: "clamp"
                    },
                    particles_move_path_delay: folder({
                        particles_move_path_delay_value: {
                            value: [backgroundConfig.particles.move.path.delay.value.min, backgroundConfig.particles.move.path.delay.value.max],
                            label: "value",
                            min: 0,
                            max: 10,
                            step: 0.1
                        }
                    }, {label: "delay", collapsed: false}),
                    particles_move_path_enable: {
                        value: backgroundConfig.particles.move.path.enable,
                        label: "enable"
                    },
                    particles_move_path_generator_show: {
                        value: true,
                        label: "Show generator"
                    },
                    particles_move_path_generator: {
                        value: backgroundConfig.particles.move.path.generator,
                        label: "generator",
                        render: function(get){return get('particles.particles.particles_move.particles_move_path.particles_move_path_generator_show');}
                    },
                    particles_move_path_options: {
                        value: backgroundConfig.particles.move.path.options,
                        label: "options"
                    }
                }, {label: "path", collapsed: false}),
                particles_move_random: {
                    value: backgroundConfig.particles.move.random,
                    label: "random"
                },
                particles_move_size: {
                    value: backgroundConfig.particles.move.size,
                    label: "size",
                    min: 0,
                    max: 1000,
                    step: 1
                },
                particles_move_speed: {
                    value: [backgroundConfig.particles.move.speed.min, backgroundConfig.particles.move.speed.max],
                        label: "speed",
                        min: 0,
                        max: 100,
                        step: 1
                },
                particles_move_spin: folder({
                    particles_move_spin_acceleration: {
                        value: [backgroundConfig.particles.move.spin.acceleration.min, backgroundConfig.particles.move.spin.acceleration.max],
                        label: "acceleration",
                        min: 0,
                        max: 10,
                        step: 0.01
                    },
                    particles_move_spin_enable: {
                        value: backgroundConfig.particles.move.spin.enable,
                        label: "enable"
                    },
                    particles_move_spin_position_show: {
                        value: true,
                        label: "Show position"
                    },
                    particles_move_spin_position: {
                        value: backgroundConfig.particles.move.spin.position,
                        label: "position",
                        min: 0,
                        max: 100,
                        step: 1,
                        render: function(get){return get('particles.particles.particles_move.particles_move_spin.particles_move_spin_position_show');}
                    }
                }, {label: "spin", collapsed: false}),
                particles_move_straight: {
                    value: backgroundConfig.particles.move.straight,
                    label: "straight"
                },
                particles_move_trail: folder({
                    particles_move_trail_enable: {
                        value: backgroundConfig.particles.move.trail.enable,
                        label: "enable"
                    },
                    particles_move_trail_fill: folder({
                        particles_move_trail_fill_color_show: {
                            value: true,
                            label: "Show color"
                        },
                        particles_move_trail_fill_color: folder({
                            particles_move_trail_fill_color_value: folder({
                                particles_move_trail_fill_color_value_0: {
                                    value: backgroundConfig.particles.move.trail.fill.color.value[0],
                                    label: "0"
                                }
                            }, {label: "value", collapsed: false}) //TODO array
                        }, {label: "color", render: function(get){return get('particles.particles.particles_move.particles_move_trail.particles_move_trail_fill.particles_move_trail_fill_color_show');}, collapsed: false}),
                        particles_move_trail_fill_image_show: {
                            value: true,
                            label: "Show image"
                        },
                        particles_move_trail_fill_image: {
                            value: backgroundConfig.particles.move.trail.fill.image,
                            label: "image",
                            render: function(get){return get('particles.particles.particles_move.particles_move_trail.particles_move_trail_fill.particles_move_trail_fill_image_show');}
                        }
                    }, {label: "fill", collapsed: false}),
                    particles_move_trail_length: {
                        value: backgroundConfig.particles.move.trail.length,
                        label: "length",
                        min: 0,
                        max: 1000,
                        step: 1
                    }
                }, {label: "trail", collapsed: false}),
                particles_move_vibrate: {
                    value: backgroundConfig.particles.move.vibrate,
                    label: "vibrate"
                },
                particles_move_warp: {
                    value: backgroundConfig.particles.move.warp,
                    label: "warp"
                }
            }, {label: "move", collapsed: true}),
            particles_number: folder({
                particles_number_density: folder({
                    particles_number_density_enable: {
                        value: backgroundConfig.particles.number.density.enable,
                        label: "enable"
                    },
                    particles_number_density_height: {
                        value: backgroundConfig.particles.number.density.height,
                        label: "height",
                        min: 0,
                        max: 10000,
                        step: 1
                    },
                    particles_number_density_width: {
                        value: backgroundConfig.particles.number.density.width,
                        label: "width",
                        min: 0,
                        max: 10000,
                        step: 1
                    }
                }, {label: "density", collapsed: false}),
                particles_number_limit: {
                    value: backgroundConfig.particles.number.limit,
                    label: "limit",
                    min: 0,
                    max: 10000,
                    step: 1
                },
                particles_number_value: {
                    value: backgroundConfig.particles.number.value,
                    label: "value",
                    min: 0,
                    max: 10000,
                    step: 1
                }
            }, {label: "number", collapsed: true}),
            particles_opacity: folder({
                particles_opacity_value: {
                    value: backgroundConfig.particles.opacity.value,
                    label: "value",
                    min: 0,
                    max: 1,
                    step: 0.01
                },
                particles_opacity_random: {
                    value: backgroundConfig.particles.opacity.random,
                    label: "random"
                },
                particles_opacity_animation: folder({
                    particles_opacity_animation_destroy: {
                        value: backgroundConfig.particles.opacity.animation.destroy,
                        label: "destroy",
                        options: ["none", "max", "min"]
                    },
                    particles_opacity_animation_startValue: {
                        value: backgroundConfig.particles.opacity.animation.startValue,
                        label: "startValue",
                        options: ["max", "min", "random"]
                    }
                }, {label: "animation", collapsed: false})
            }, {label: "opacity", collapsed: true}),
            particles_reduceDuplicates: {
                value: backgroundConfig.particles.reduceDuplicates,
                label: "reduceDuplicates"
            },
            particles_shadow: folder({
                particles_shadow_blur: {
                    value: backgroundConfig.particles.shadow.blur,
                    label: "blur",
                    min: 0,
                    max: 50,
                    step: 1
                },
                particles_shadow_color: folder({
                    particles_shadow_color_value: folder({
                        particles_shadow_color_value_0: {
                            value: backgroundConfig.particles.shadow.color.value[0],
                            label: "0"
                        }
                    }, {label: "value", collapsed: false}) //TODO array
                }, {label: "color", collapsed: false}),
                particles_shadow_enable: {
                    value: backgroundConfig.particles.shadow.enable,
                    label: "enable"
                },
                particles_shadow_offset: {
                    value: backgroundConfig.particles.shadow.offset,
                    label: "offset",
                    min: -Math.max(window.innerWidth, window.innerHeight),
                    max: Math.max(window.innerWidth, window.innerHeight),
                    step: 1
                }
            }, {label: "shadow", collapsed: true}),
            particles_shape: folder({
                particles_shape_options: folder({
                    particles_shape_options_0: folder({
                        particles_shape_options_0_close_show: {
                            value: true,
                            label: "Show close"
                        },
                        particles_shape_options_0_close: {
                            value: backgroundConfig.particles.shape.options[0].close,
                            label: "close",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_close_show');}
                        },
                        particles_shape_options_0_fill_show: {
                            value: true,
                            label: "Show fill"
                        },
                        particles_shape_options_0_fill: {
                            value: backgroundConfig.particles.shape.options[0].fill,
                            label: "fill",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_fill_show');}
                        },
                        particles_shape_options_0_particles_show: {
                            value: true,
                            label: "Show particles"
                        },
                        particles_shape_options_0_particles: {
                            value: backgroundConfig.particles.shape.options[0].particles,
                            label: "particles",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_particles_show');}
                        }, //particles
                        particles_shape_options_0_font_show: {
                            value: true,
                            label: "Show font",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}
                        },
                        particles_shape_options_0_font: {
                            value: backgroundConfig.particles.shape.options[0].font,
                            label: "font",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_font_show');}
                        },
                        particles_shape_options_0_style_show: {
                            value: true,
                            label: "Show style",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}
                        },
                        particles_shape_options_0_style: {
                            value: backgroundConfig.particles.shape.options[0].style,
                            label: "style",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_style_show');}
                        },
                        particles_shape_options_0_value_show: {
                            value: true,
                            label: "Show value",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}
                        },
                        particles_shape_options_0_value: folder({
                            particles_shape_options_0_value_0: {
                                value: backgroundConfig.particles.shape.options[0].value[0],
                                label: "0"
                            }
                        }, {label: "value",
                        render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_value_show');}, collapsed: false}), //TODO array
                        particles_shape_options_0_weight_show: {
                            value: true,
                            label: "Show weight",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}
                        },
                        particles_shape_options_0_weight: {
                            value: backgroundConfig.particles.shape.options[0].weight,
                            label: "weight",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_weight_show');}
                        },
                        particles_shape_options_0_height_show: {
                            value: true,
                            label: "Show height",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}
                        },
                        particles_shape_options_0_height: {
                            value: backgroundConfig.particles.shape.options[0].height,
                            label: "height",
                            min: 0,
                            max: Math.max(window.innerWidth, window.innerHeight),
                            step: 1,
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_height_show');}
                        },
                        particles_shape_options_0_replaceColor_show: {
                            value: true,
                            label: "Show replaceColor",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}
                        },
                        particles_shape_options_0_replaceColor: {
                            value: backgroundConfig.particles.shape.options[0].replaceColor,
                            label: "replaceColor",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_replaceColor_show');}
                        },
                        particles_shape_options_0_src_show: {
                            value: true,
                            label: "Show src",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}
                        },
                        particles_shape_options_0_src: {
                            value: backgroundConfig.particles.shape.options[0].src,
                            label: "src",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_src_show');}
                        },
                        particles_shape_options_0_width_show: {
                            value: true,
                            label: "Show width",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}
                        },
                        particles_shape_options_0_width: {
                            value: backgroundConfig.particles.shape.options[0].width,
                            label: "width",
                            min: 0,
                            max: Math.max(window.innerWidth, window.innerHeight),
                            step: 1,
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_width_show');}
                        },
                        particles_shape_options_0_inset_show: {
                            value: true,
                            label: "Show inset",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star";}
                        },
                        particles_shape_options_0_inset: {
                            value: backgroundConfig.particles.shape.options[0].inset,
                            label: "inset",
                            min: 0,
                            max: 1000,
                            step: 1,
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_inset_show');}
                        },
                        particles_shape_options_0_sides_show: {
                            value: true,
                            label: "Show sides",
                            render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "polygon" || get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star";}
                        },
                        particles_shape_options_0_sides: {
                            value: backgroundConfig.particles.shape.options[0].sides,
                            label: "sides",
                            min: 0,
                            max: 1000,
                            step: 1,
                            render: function(get){return (get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "polygon" || get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star") && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_0.particles_shape_options_0_sides_show');}
                        }
                    }, {label: "0", collapsed: false})
                }, {label: "options", collapsed: false}), //TODO array
                particles_shape_type: folder({
                    particles_shape_type_0: {
                        value: backgroundConfig.particles.shape.type[0],
                        label: "0",
                        options: ["character", "image", "polygon", "star", "circle", "square", "triangle"]
                    }
                }, {label: "type", collapsed: false}) //TODO array
            }, {label: "shape", collapsed: true}),
            particles_size: folder({
                particles_size_value: {
                    value: [backgroundConfig.particles.size.value.min, backgroundConfig.particles.size.value.max],
                    label: "value",
                    min: 0,
                    max: 1000,
                    step: 1
                },
                particles_size_animation: folder({
                    particles_size_animation_destroy: {
                        value: backgroundConfig.particles.size.animation.destroy,
                        label: "destroy",
                        options: ["none", "max", "min"]
                    },
                    particles_size_animation_startValue: {
                        value: backgroundConfig.particles.size.animation.startValue,
                        label: "startValue",
                        options: ["max", "min", "random"]
                    }
                }, {label: "animation", collapsed: false})
            }, {label: "size", collapsed: true}),
            particles_stroke: folder({
                particles_stroke_0: folder({
                    particles_stroke_0_color: folder({
                        particles_stroke_0_color_value: folder({
                            particles_stroke_0_color_value_0: {
                                value: backgroundConfig.particles.stroke[0].color.value[0],
                                label: "0"
                            }
                        }, {label: "value", collapsed: false}) //TODO array
                    }, {label: "color", collapsed: false}),
                    particles_stroke_0_opacity_show: {
                        value: true,
                        label: "Show opacity"
                    },
                    particles_stroke_0_opacity: {
                        value: [backgroundConfig.particles.stroke[0].opacity.min, backgroundConfig.particles.stroke[0].opacity.max],
                        label: "opacity",
                        min: 0,
                        max: 1,
                        step: 0.01,
                        render: function(get){return get('particles.particles.particles_stroke.particles_stroke_0.particles_stroke_0_opacity_show');}
                    },
                    particles_stroke_0_width_show: {
                        value: true,
                        label: "Show width"
                    },
                    particles_stroke_0_width: {
                        value: [backgroundConfig.particles.stroke[0].width.min, backgroundConfig.particles.stroke[0].width.max],
                        label: "width",
                        min: 0,
                        max: 1000,
                        step: 1,
                        render: function(get){return get('particles.particles.particles_stroke.particles_stroke_0.particles_stroke_0_width_show');}
                    }
                }, {label: "0", collapsed: false}) //TODO array
            }, {label: "stroke", collapsed: true}),
            particles_zIndex: folder({
                particles_zIndex_value: {
                    value: backgroundConfig.particles.zIndex.value,
                    label: "value",
                    min: 0,
                    max: 10,
                    step: 1
                },
                particles_zIndex_opacityRate: {
                    value: backgroundConfig.particles.zIndex.opacityRate,
                    label: "opacityRate",
                    min: 0,
                    max: 10,
                    step: 1
                },
                particles_zIndex_sizeRate: {
                    value: backgroundConfig.particles.zIndex.sizeRate,
                    label: "sizeRate",
                    min: 0,
                    max: 10,
                    step: 1
                },
                particles_zIndex_velocityRate: {
                    value: backgroundConfig.particles.zIndex.velocityRate,
                    label: "velocityRate",
                    min: 0,
                    max: 10,
                    step: 1
                },
            }, {label: "zIndex", collapsed: true}),
        }, {collapsed: true}),
        pauseOnBlur: {
            value: backgroundConfig.pauseOnBlur
        },
        pauseOnOutSideViewport: {
            value: backgroundConfig.pauseOnOutSideViewport
        },
        preset_show: {
            value: true,
            label: "Show preset"
        },
        preset: folder({
            preset_0: {
                value: backgroundConfig.preset[0],
                label: "0",
                options: ["", "basic", "confetti", "fireworks", "stars", "snow", "bubbles", "firefly", "links", "fire", "seaAnemone", "fountain", "bigCircles", "blossomFallV1", "FlyingBat"],
                render: function(get){return get('particles.preset_show');}
            }
        }, {collapsed: true}), //TODO array
        responsive: folder({
            responsive_0: folder({
                responsive_0_maxWidth: {
                    value: backgroundConfig.responsive[0].maxWidth,
                    label: "maxWidth",
                    min: 0,
                    max: 10000,
                    step: 1
                },
                responsive_0_mode: {
                    value: backgroundConfig.responsive[0].mode,
                    label: "mode",
                    options: ["screen", "canvas"]
                },
                responsive_0_options: {
                    value: backgroundConfig.responsive[0].options,
                    label: "options"
                } //options
            }, {label: "0", collapsed: true})
        }, {collapsed: true}), //TODO array
        smooth: {
            value: backgroundConfig.smooth
        },
        style: {
            value: backgroundConfig.style
        },
        themes: folder({
            themes_0: folder({
                themes_0_default: folder({
                    themes_0_default_auto: {
                        value: backgroundConfig.themes[0].default.auto,
                        label: "auto"
                    },
                    themes_0_default_mode: {
                        value: backgroundConfig.themes[0].default.mode,
                        label: "mode",
                        options: ["any", "dark", "light"]
                    },
                    themes_0_default_value: {
                        value: backgroundConfig.themes[0].default.value,
                        label: "value"
                    },
                }, {label: "default", collapsed: false}),
                themes_0_name: {
                    value: backgroundConfig.themes[0].name,
                    label: "name"
                },
                themes_0_options_show: {
                    value: true,
                    label: "Show options"
                },
                themes_0_options: {
                    value: backgroundConfig.themes[0].options,
                    label: "options",
                    render: function(get){return get('particles.themes.themes_0.themes_0_options_show');}
                } //options
            }, {label: "0", collapsed: true})
        }, {collapsed: true}), //TODO array
        zLayers: {
            value: backgroundConfig.zLayers,
            min: 0,
            max: 100,
            step: 1
        }
    });
    if(config == null){
        config = {...backgroundConfig};
    }else{
        //output fix
        config.background = {};
        config.background.color = {};
        config.background.color.value = [];
        config.background.color.value[0] = config.background_color_value_0; // TODO array
        delete config.background_color_value_0;
        config.background.image = config.background_image;
        delete config.background_image;
        config.background.opacity = config.background_opacity;
        delete config.background_opacity;
        config.background.position = config.background_position;
        delete config.background_position;
        config.background.repeat = config.background_repeat;
        delete config.background_repeat;
        config.background.size = config.background_size;
        delete config.background_size;
        config.backgroundMask = {};
        config.backgroundMask.composite = config.backgroundMask_composite;
        delete config.backgroundMask_composite;
        config.backgroundMask.cover = {};
        config.backgroundMask.cover.color = {};
        config.backgroundMask.cover.color.value = [];
        config.backgroundMask.cover.color.value[0] = config.backgroundMask_cover_color_value_0; // TODO array
        delete config.backgroundMask_cover_color_value_0;
        config.backgroundMask.cover.opacity = config.backgroundMask_cover_opacity;
        delete config.backgroundMask_cover_opacity;
        config.backgroundMask.enable = config.backgroundMask_enable;
        delete config.backgroundMask_enable;
        config.delay = {
            min: config.delay[0],
            max: config.delay[1]
        }
        config.duration = {
            min: config.duration[0],
            max: config.duration[1]
        };
        config.fullScreen = {};
        config.fullScreen.enable = config.fullScreen_enable;
        delete config.fullScreen_enable;
        config.fullScreen.zIndex = config.fullScreen_zIndex;
        delete config.fullScreen_zIndex;
        config.interactivity = {};
        config.interactivity.detectsOn = config.interactivity_detectsOn;
        delete config.interactivity_detectsOn;
        config.interactivity.events = {};
        config.interactivity.events.onClick = {};
        config.interactivity.events.onClick.enable = config.interactivity_events_onClick_enable;
        delete config.interactivity_events_onClick_enable;
        config.interactivity.events.onClick.mode = [];
        config.interactivity.events.onClick.mode[0] = config.interactivity_events_onClick_mode_0; //TODO array
        delete config.interactivity_events_onClick_mode_0;
        config.interactivity.events.onDiv = {};
        config.interactivity.events.onDiv.enable = config.interactivity_events_onDiv_enable;
        delete config.interactivity_events_onDiv_enable;
        config.interactivity.events.onDiv.mode = [];
        config.interactivity.events.onDiv.mode[0] = config.interactivity_events_onDiv_mode_0; //TODO array
        delete config.interactivity_events_onDiv_mode_0;
        config.interactivity.events.onDiv.selectors = [];
        config.interactivity.events.onDiv.selectors[0] = config.interactivity_events_onDiv_selectors_0; //TODO array
        delete config.interactivity_events_onDiv_selectors_0;
        config.interactivity.events.onDiv.type = config.interactivity_events_onDiv_type;
        delete config.interactivity_events_onDiv_type;
        config.interactivity.events.onHover = {};
        config.interactivity.events.onHover.enable = config.interactivity_events_onHover_enable;
        delete config.interactivity_events_onHover_enable;
        config.interactivity.events.onHover.mode = [];
        config.interactivity.events.onHover.mode[0] = config.interactivity_events_onHover_mode_0; //TODO array
        delete config.interactivity_events_onHover_mode_0;
        config.interactivity.events.onHover.mode[1] = config.interactivity_events_onHover_mode_1; //TODO array
        delete config.interactivity_events_onHover_mode_1;
        config.interactivity.events.onHover.parallax = {};
        config.interactivity.events.onHover.parallax.enable = config.interactivity_events_onHover_parallax_enable;
        delete config.interactivity_events_onHover_parallax_enable;
        config.interactivity.events.onHover.parallax.force = config.interactivity_events_onHover_parallax_force;
        delete config.interactivity_events_onHover_parallax_force;
        config.interactivity.events.onHover.parallax.smooth = config.interactivity_events_onHover_parallax_smooth;
        delete config.interactivity_events_onHover_parallax_smooth;
        config.interactivity.events.resize = {};
        config.interactivity.events.resize.delay = config.interactivity_events_resize_delay;
        delete config.interactivity_events_resize_delay;
        config.interactivity.events.resize.enable = config.interactivity_events_resize_enable;
        delete config.interactivity_events_resize_enable;
        config.interactivity.modes = {};
        config.interactivity.modes.attract = {};
        config.interactivity.modes.attract.distance = config.interactivity_modes_attract_distance;
        delete config.interactivity_modes_attract_distance;
        config.interactivity.modes.attract.duration = config.interactivity_modes_attract_duration;
        delete config.interactivity_modes_attract_duration;
        config.interactivity.modes.attract.easing = config.interactivity_modes_attract_easing;
        delete config.interactivity_modes_attract_easing;
        config.interactivity.modes.attract.factor = config.interactivity_modes_attract_factor;
        delete config.interactivity_modes_attract_factor;
        config.interactivity.modes.attract.maxSpeed = config.interactivity_modes_attract_maxSpeed;
        delete config.interactivity_modes_attract_maxSpeed;
        config.interactivity.modes.attract.speed = config.interactivity_modes_attract_speed;
        delete config.interactivity_modes_attract_speed;
        config.interactivity.modes.bounce = {};
        config.interactivity.modes.bounce.distance = config.interactivity_modes_bounce_distance;
        delete config.interactivity_modes_bounce_distance;
        config.interactivity.modes.bubble = {};
        config.interactivity.modes.bubble.distance = config.interactivity_modes_bubble_distance;
        delete config.interactivity_modes_bubble_distance;
        config.interactivity.modes.bubble.duration = config.interactivity_modes_bubble_duration;
        delete config.interactivity_modes_bubble_duration;
        config.interactivity.modes.bubble.mix = config.interactivity_modes_bubble_mix;
        delete config.interactivity_modes_bubble_mix;
        config.interactivity.modes.bubble.opacity = config.interactivity_modes_bubble_opacity;
        delete config.interactivity_modes_bubble_opacity;
        config.interactivity.modes.bubble.color = {};
        config.interactivity.modes.bubble.color.value = [];
        config.interactivity.modes.bubble.color.value[0] = config.interactivity_modes_bubble_color_value_0; //TODO array
        delete config.interactivity_modes_bubble_color_value_0;
        config.interactivity.modes.bubble.size = config.interactivity_modes_bubble_size;
        delete config.interactivity_modes_bubble_size;
        config.interactivity.modes.bubble.divs = {};
        config.interactivity.modes.bubble.divs.distance = config.interactivity_modes_bubble_divs_distance;
        delete config.interactivity_modes_bubble_divs_distance;
        config.interactivity.modes.bubble.divs.duration = config.interactivity_modes_bubble_divs_duration;
        delete config.interactivity_modes_bubble_divs_duration;
        config.interactivity.modes.bubble.divs.mix = config.interactivity_modes_bubble_divs_mix;
        delete config.interactivity_modes_bubble_divs_mix;
        config.interactivity.modes.bubble.divs.selectors = [];
        config.interactivity.modes.bubble.divs.selectors[0] = config.interactivity_modes_bubble_divs_selectors_0;
        delete config.interactivity_modes_bubble_divs_selectors_0;
        config.interactivity.modes.connect = {};
        config.interactivity.modes.connect.distance = config.interactivity_modes_connect_distance;
        delete config.interactivity_modes_connect_distance;
        config.interactivity.modes.connect.links = {};
        config.interactivity.modes.connect.links.opacity = config.interactivity_modes_connect_links_opacity;
        delete config.interactivity_modes_connect_links_opacity;
        config.interactivity.modes.connect.radius = config.interactivity_modes_connect_radius;
        delete config.interactivity_modes_connect_radius;
        config.interactivity.modes.grab = {};
        config.interactivity.modes.grab.distance = config.interactivity_modes_grab_distance;
        delete config.interactivity_modes_grab_distance;
        config.interactivity.modes.grab.links = {};
        config.interactivity.modes.grab.links.blink = config.interactivity_modes_grab_links_blink;
        delete config.interactivity_modes_grab_links_blink;
        config.interactivity.modes.grab.links.consent = config.interactivity_modes_grab_links_consent;
        delete config.interactivity_modes_grab_links_consent;
        config.interactivity.modes.grab.links.opacity = config.interactivity_modes_grab_links_opacity;
        delete config.interactivity_modes_grab_links_opacity;
        config.interactivity.modes.light = {};
        config.interactivity.modes.light.area = {};
        config.interactivity.modes.light.area.gradient = {};
        config.interactivity.modes.light.area.gradient.start = {};
        config.interactivity.modes.light.area.gradient.start.value = [];
        config.interactivity.modes.light.area.gradient.start.value[0] = config.interactivity_modes_light_area_gradient_start_value_0; //TODO array
        delete config.interactivity_modes_light_area_gradient_start_value_0;
        config.interactivity.modes.light.area.gradient.stop = {};
        config.interactivity.modes.light.area.gradient.stop.value = [];
        config.interactivity.modes.light.area.gradient.stop.value[0] = config.interactivity_modes_light_area_gradient_stop_value_0; //TODO array
        delete config.interactivity_modes_light_area_gradient_stop_value_0;
        config.interactivity.modes.light.area.radius = config.interactivity_modes_light_area_radius;
        delete config.interactivity_modes_light_area_radius;
        config.interactivity.modes.light.shadow = {};
        config.interactivity.modes.light.shadow.color = {};
        config.interactivity.modes.light.shadow.color.value = [];
        config.interactivity.modes.light.shadow.color.value[0] = config.interactivity_modes_light_shadow_color_value_0; //TODO array
        delete config.interactivity_modes_light_shadow_color_value_0;
        config.interactivity.modes.light.shadow.length = config.interactivity_modes_light_shadow_length;
        delete config.interactivity_modes_light_shadow_length;
        config.interactivity.modes.push = {};
        config.interactivity.modes.push.default = config.interactivity_modes_push_default;
        delete config.interactivity_modes_push_default;
        config.interactivity.modes.push.groups = [];
        config.interactivity.modes.push.groups[0] = config.interactivity_modes_push_groups_0; //TODO array
        delete config.interactivity_modes_push_groups_0;
        config.interactivity.modes.push.quantity = config.interactivity_modes_push_quantity;
        delete config.interactivity_modes_push_quantity;
        config.interactivity.modes.remove = {};
        config.interactivity.modes.remove.quantity = config.interactivity_modes_remove_quantity;
        delete config.interactivity_modes_remove_quantity;
        config.interactivity.modes.repulse = {};
        config.interactivity.modes.repulse.distance = config.interactivity_modes_repulse_distance;
        delete config.interactivity_modes_repulse_distance;
        config.interactivity.modes.repulse.duration = config.interactivity_modes_repulse_duration;
        delete config.interactivity_modes_repulse_duration;
        config.interactivity.modes.repulse.factor = config.interactivity_modes_repulse_factor;
        delete config.interactivity_modes_repulse_factor;
        config.interactivity.modes.repulse.speed = config.interactivity_modes_repulse_speed;
        delete config.interactivity_modes_repulse_speed;
        config.interactivity.modes.repulse.maxSpeed = config.interactivity_modes_repulse_maxSpeed;
        delete config.interactivity_modes_repulse_maxSpeed;
        config.interactivity.modes.repulse.easing = config.interactivity_modes_repulse_easing;
        delete config.interactivity_modes_repulse_easing;
        config.interactivity.modes.repulse.divs = {};
        config.interactivity.modes.repulse.divs.distance = config.interactivity_modes_repulse_divs_distance;
        delete config.interactivity_modes_repulse_divs_distance;
        config.interactivity.modes.repulse.divs.duration = config.interactivity_modes_repulse_divs_duration;
        delete config.interactivity_modes_repulse_divs_duration;
        config.interactivity.modes.repulse.divs.factor = config.interactivity_modes_repulse_divs_factor;
        delete config.interactivity_modes_repulse_divs_factor;
        config.interactivity.modes.repulse.divs.speed = config.interactivity_modes_repulse_divs_speed;
        delete config.interactivity_modes_repulse_divs_speed;
        config.interactivity.modes.repulse.divs.maxSpeed = config.interactivity_modes_repulse_divs_maxSpeed;
        delete config.interactivity_modes_repulse_divs_maxSpeed;
        config.interactivity.modes.repulse.divs.easing = config.interactivity_modes_repulse_divs_easing;
        delete config.interactivity_modes_repulse_divs_easing;
        config.interactivity.modes.repulse.divs.selectors = [];
        config.interactivity.modes.repulse.divs.selectors[0] = config.interactivity_modes_repulse_divs_selectors_0;
        delete config.interactivity_modes_repulse_divs_selectors_0; //TODO array
        config.interactivity.modes.pause = backgroundConfig.interactivity.modes.pause;
        delete config.interactivity_modes_pause;
        config.interactivity.modes.slow = {};
        config.interactivity.modes.slow.factor = config.interactivity_modes_slow_factor;
        delete config.interactivity_modes_slow_factor;
        config.interactivity.modes.slow.radius = config.interactivity_modes_slow_radius;
        delete config.interactivity_modes_slow_radius;
        config.interactivity.modes.trail = {};
        config.interactivity.modes.trail.delay = config.interactivity_modes_trail_delay;
        delete config.interactivity_modes_trail_delay;
        config.interactivity.modes.trail.pauseOnStop = config.interactivity_modes_trail_pauseOnStop;
        delete config.interactivity_modes_trail_pauseOnStop;
        config.interactivity.modes.trail.quantity = config.interactivity_modes_trail_quantity;
        delete config.interactivity_modes_trail_quantity;
        config.manualParticles = [];
        config.manualParticles[0] = {}; //TODO array
        if(config.manualParticles_0_options_show){
            // config.manualParticles[0].options = config.manualParticles_0_options; //TODO array
            config.manualParticles[0].options = backgroundConfig.manualParticles[0].options; //TODO array //particles
        }else{
            config.manualParticles[0].options = {}; //TODO array
            delete config.manualParticles[0].options;
        }
        delete config.manualParticles_0_options_show
        delete config.manualParticles_0_options;
        if(config.manualParticles_0_position_show){
            config.manualParticles[0].position = config.manualParticles_0_position; //TODO array
        }else{
            config.manualParticles[0].position = {}; //TODO array
            delete config.manualParticles[0].position;
        }
        delete config.manualParticles_0_position_show
        delete config.manualParticles_0_position;
        config.particles = {};
        config.particles.bounce = {};
        config.particles.bounce.horizontal = {};
        config.particles.bounce.horizontal.value = {
            min: config.particles_bounce_horizontal_value[0],
            max: config.particles_bounce_horizontal_value[1]
        };
        delete config.particles_bounce_horizontal_value;
        config.particles.bounce.vertical = {
            min: config.particles_bounce_vertical_value[0],
            max: config.particles_bounce_vertical_value[1]
        };
        delete config.particles_bounce_vertical_value;
        config.particles.collisions = {};
        config.particles.collisions.absorb = {};
        config.particles.collisions.absorb.speed = config.particles_collisions_absorb_speed;
        delete config.particles_collisions_absorb_speed;
        // config.particles.collisions.bounce = config.particles_collisions_bounce;
        config.particles.collisions.bounce = backgroundConfig.particles.collisions.bounce; //bounce
        delete config.particles_collisions_bounce;
        config.particles.collisions.enable = config.particles_collisions_enable;
        delete config.particles_collisions_enable;
        config.particles.collisions.mode = config.particles_collisions_mode;
        delete config.particles_collisions_mode;
        config.particles.collisions.overlap = {};
        config.particles.collisions.overlap.enable = config.particles_collisions_overlap_enable;
        delete config.particles_collisions_overlap_enable;
        config.particles.collisions.overlap.retries = config.particles_collisions_overlap_retries;
        delete config.particles_collisions_overlap_retries;
        config.particles.color = {};
        config.particles.color.value = [];
        config.particles.color.value[0] = config.particles_color_value_0; //TODO array
        delete config.particles_color_value_0;        
        // config.particles.groups = config.particles_groups;
        config.particles.groups = backgroundConfig.particles.groups; //particles
        if(config.particles_interactivity_show){
            // config.particles.interactivity = config.particles_interactivity;
            config.particles.interactivity = backgroundConfig.particles.interactivity; //interactivity
        }else{
            config.particles.interactivity = {}; //TODO array
            delete config.particles.interactivity;
        }
        delete config.particles_interactivity_show;
        delete config.particles_interactivity;

        config.particles.links = {};
        config.particles.links.blink = config.particles_links_blink;
        delete config.particles_links_blink;
        config.particles.links.color = {};
        config.particles.links.color.value = [];
        config.particles.links.color.value[0] = config.particles_links_color_value_0; //TODO array
        delete config.particles_links_color_value_0;
        config.particles.links.consent = config.particles_links_consent;
        delete config.particles_links_consent;
        config.particles.links.distance = config.particles_links_distance;
        delete config.particles_links_distance;
        config.particles.links.enable = config.particles_links_enable;
        delete config.particles_links_enable;
        config.particles.links.frequency = config.particles_links_frequency;
        delete config.particles_links_frequency;
        config.particles.links.opacity = config.particles_links_opacity;
        delete config.particles_links_opacity;
        config.particles.links.shadow = {};
        config.particles.links.shadow.blur = config.particles_links_shadow_blur;
        delete config.particles_links_shadow_blur;
        config.particles.links.shadow.color = {};
        config.particles.links.shadow.color.value = [];
        config.particles.links.shadow.color.value[0] = config.particles_links_shadow_color_value_0; //TODO array
        delete config.particles_links_shadow_color_value_0;
        config.particles.links.shadow.enable = config.particles_links_shadow_enable;
        delete config.particles_links_shadow_enable;
        config.particles.links.triangles = {};
        config.particles.links.triangles.enable = config.particles_links_triangles_enable;
        delete config.particles_links_triangles_enable;
        config.particles.links.triangles.frequency = config.particles_links_triangles_frequency;
        delete config.particles_links_triangles_frequency;
        config.particles.links.triangles.opacity = config.particles_links_triangles_opacity;
        delete config.particles_links_triangles_opacity;
        config.particles.links.width = config.particles_links_width;
        delete config.particles_links_width;
        config.particles.links.warp = config.particles_links_warp;
        delete config.particles_links_warp;
        config.particles.move = {};
        config.particles.move.angle = {};
        config.particles.move.angle.offset = {
            min: config.particles_move_angle_offset[0],
            max: config.particles_move_angle_offset[1]
        };
        delete config.particles_move_angle_offset;
        config.particles.move.angle.value = {
            min: config.particles_move_angle_value[0],
            max: config.particles_move_angle_value[1]
        };
        delete config.particles_move_angle_value;
        config.particles.move.attract = {};
        config.particles.move.attract.distance = {
            min: config.particles_move_attract_distance[0],
            max: config.particles_move_attract_distance[1]
        };
        delete config.particles_move_attract_distance;
        config.particles.move.attract.enable = config.particles_move_attract_enable;
        delete config.particles_move_attract_enable;
        config.particles.move.attract.rotate = config.particles_move_attract_rotate;
        delete config.particles_move_attract_rotate;
        config.particles.move.center = {};
        config.particles.move.center.mode = config.particles_move_center_mode;
        delete config.particles_move_center_mode;
        config.particles.move.center.radius = config.particles_move_center_radius;
        delete config.particles_move_center_radius;
        config.particles.move.decay = {
            min: config.particles_move_decay[0],
            max: config.particles_move_decay[1]
        };
        delete config.particles_move_decay;
        config.particles.move.direction = config.particles_move_direction;
        delete config.particles_move_direction;
        config.particles.move.distance = {};
        config.particles.move.distance.horizontal = config.particles_move_distance_horizontal;
        delete config.particles_move_distance_horizontal;
        config.particles.move.distance.vertical = config.particles_move_distance_vertical;
        delete config.particles_move_distance_vertical;
        config.particles.move.drift = {
            min: config.particles_move_drift[0],
            max: config.particles_move_drift[1]
        };
        delete config.particles_move_drift;
        config.particles.move.enable = config.particles_move_enable;
        delete config.particles_move_enable;
        config.particles.move.gravity = {};
        config.particles.move.gravity.acceleration = {
            min: config.particles_move_gravity_acceleration[0],
            max: config.particles_move_gravity_acceleration[1]
        };
        delete config.particles_move_gravity_acceleration;
        config.particles.move.gravity.enable = config.particles_move_gravity_enable;
        delete config.particles_move_gravity_enable;
        config.particles.move.gravity.inverse = config.particles_move_gravity_inverse;
        delete config.particles_move_gravity_inverse;
        config.particles.move.gravity.maxSpeed = {
            min: config.particles_move_gravity_maxSpeed[0],
            max: config.particles_move_gravity_maxSpeed[1]
        };
        delete config.particles_move_gravity_maxSpeed;
        config.particles.move.outModes = {};
        if(config.particles_move_outModes_bottom_show){
            config.particles.move.outModes.bottom = config.particles_move_outModes_bottom;
        }else{
            config.particles.move.outModes.bottom = {};
            delete config.particles.move.outModes.bottom
        }
        delete config.particles_move_outModes_bottom_show;
        delete config.particles_move_outModes_bottom;
        config.particles.move.outModes.default = config.particles_move_outModes_default;
        delete config.particles_move_outModes_default;
        if(config.particles_move_outModes_left_show){
            config.particles.move.outModes.left = config.particles_move_outModes_left;
        }else{
            config.particles.move.outModes.left = {};
            delete config.particles.move.outModes.left
        }
        delete config.particles_move_outModes_left_show;
        delete config.particles_move_outModes_left;
        if(config.particles_move_outModes_right_show){
            config.particles.move.outModes.right = config.particles_move_outModes_right;
        }else{
            config.particles.move.outModes.right = {};
            delete config.particles.move.outModes.right
        }
        delete config.particles_move_outModes_right_show;
        delete config.particles_move_outModes_right;
        if(config.particles_move_outModes_top_show){
            config.particles.move.outModes.top = config.particles_move_outModes_top;
        }else{
            config.particles.move.outModes.top = {};
            delete config.particles.move.outModes.top
        }
        delete config.particles_move_outModes_top_show;
        delete config.particles_move_outModes_top;
        config.particles.move.path = {};
        config.particles.move.path.clamp = config.particles_move_path_clamp;
        delete config.particles_move_path_clamp;
        config.particles.move.path.delay = {};
        config.particles.move.path.delay.value = {
            min: config.particles_move_path_delay_value[0],
            max: config.particles_move_path_delay_value[1]
        };
        delete config.particles_move_path_delay_value;
        config.particles.move.path.enable = config.particles_move_path_enable;
        delete config.particles_move_path_enable;
        if(config.particles_move_path_generator_show){
            config.particles.move.path.generator = config.particles_move_path_generator;
        }else{
            config.particles.move.path.generator = {};
            delete config.particles.move.path.generator
        }
        delete config.particles_move_path_generator_show;
        delete config.particles_move_path_generator;
        config.particles.move.path.options = config.particles_move_path_options;
        delete config.particles_move_path_options;
        config.particles.move.random = config.particles_move_random;
        delete config.particles_move_random;
        config.particles.move.size = config.particles_move_size;
        delete config.particles_move_size;
        config.particles.move.speed = {
            min: config.particles_move_speed[0],
            max: config.particles_move_speed[1]
        };
        delete config.particles_move_speed;
        config.particles.move.spin = {};
        config.particles.move.spin.acceleration = {
            min: config.particles_move_spin_acceleration[0],
            max: config.particles_move_spin_acceleration[1]
        };
        delete config.particles_move_spin_acceleration;
        config.particles.move.spin.enable = config.particles_move_spin_enable;
        delete config.particles_move_spin_enable;
        if(config.particles_move_spin_position_show){
            config.particles.move.spin.position = config.particles_move_spin_position;
        }else{
            config.particles.move.spin.position = {};
            delete config.particles.move.spin.position
        }
        delete config.particles_move_spin_position_show;
        delete config.particles_move_spin_position;
        config.particles.move.straight = config.particles_move_straight;
        delete config.particles_move_straight;
        config.particles.move.trail = {};
        config.particles.move.trail.enable = config.particles_move_trail_enable;
        delete config.particles_move_trail_enable;
        config.particles.move.trail.fill = {};
        config.particles.move.trail.fill.color = {};
        if(config.particles_move_trail_fill_color_show){
            config.particles.move.trail.fill.color.value = [];
            config.particles.move.trail.fill.color.value[0] = config.particles_move_trail_fill_color_value_0; //TODO array
        }else{
            config.particles.move.trail.fill.color = {};
            delete config.particles.move.trail.fill.color
        }
        delete config.particles_move_trail_fill_color_show;
        delete config.particles_move_trail_fill_color_value_0;
        if(config.particles_move_trail_fill_image_show){
            config.particles.move.trail.fill.image = config.particles_move_trail_fill_image;
        }else{
            config.particles.move.trail.fill.image = {};
            delete config.particles.move.trail.fill.image
        }
        delete config.particles_move_trail_fill_image_show;
        delete config.particles_move_trail_fill_image;
        config.particles.move.trail.length = config.particles_move_trail_length;
        delete config.particles_move_trail_length;
        config.particles.move.vibrate = config.particles_move_vibrate;
        delete config.particles_move_vibrate;
        config.particles.move.warp = config.particles_move_warp;
        delete config.particles_move_warp;
        config.particles.number = {};
        config.particles.number.density = {};
        config.particles.number.density.enable = config.particles_number_density_enable;
        delete config.particles_number_density_enable;
        config.particles.number.density.height = config.particles_number_density_height;
        delete config.particles_number_density_height;
        config.particles.number.density.width = config.particles_number_density_width;
        delete config.particles_number_density_width;
        config.particles.number.limit = config.particles_number_limit;
        delete config.particles_number_limit;
        config.particles.number.value = config.particles_number_value;
        delete config.particles_number_value;
        config.particles.opacity = {};
        config.particles.opacity.value = config.particles_opacity_value;
        delete config.particles_opacity_value;
        config.particles.opacity.random = config.particles_opacity_random;
        delete config.particles_opacity_random;
        config.particles.opacity.animation = {};
        config.particles.opacity.animation.destroy = config.particles_opacity_animation_destroy;
        delete config.particles_opacity_animation_destroy;
        config.particles.opacity.animation.startValue = config.particles_opacity_animation_startValue;
        delete config.particles_opacity_animation_startValue;
        config.particles.reduceDuplicates = config.particles_reduceDuplicates;
        delete config.particles_reduceDuplicates;
        config.particles.shadow = {};
        config.particles.shadow.blur = config.particles_shadow_blur;
        delete config.particles_shadow_blur;
        config.particles.shadow.color = {};
        config.particles.shadow.color.value = [];
        config.particles.shadow.color.value[0] = config.particles_shadow_color_value_0; //TODO array
        delete config.particles_shadow_color_value_0;
        config.particles.shadow.enable = config.particles_shadow_enable;
        delete config.particles_shadow_enable;
        config.particles.shadow.offset = config.particles_shadow_offset;
        delete config.particles_shadow_offset;
        config.particles.shape = {};
        config.particles.shape.options = [];
        config.particles.shape.options[0] = {}; //TODO array
        if(config.particles_shape_options_0_close_show){
            config.particles.shape.options[0].close = config.particles_shape_options_0_close;
        }else{
            config.particles.shape.options[0].close = {};
            delete config.particles.shape.options[0].close;
        }
        delete config.particles_shape_options_0_close_show;
        delete config.particles_shape_options_0_close;
        if(config.particles_shape_options_0_fill_show){
            config.particles.shape.options[0].fill = config.particles_shape_options_0_fill;
        }else{
            config.particles.shape.options[0].fill = {};
            delete config.particles.shape.options[0].fill;
        }
        delete config.particles_shape_options_0_fill_show;
        delete config.particles_shape_options_0_fill;
        if(config.particles_shape_options_0_particles_show){
            // config.particles.shape.options[0].particles = config.particles_shape_options_0_particles;
            config.particles.shape.options[0].particles = backgroundConfig.particles.shape.options[0].particles; //paricles
        }else{
            config.particles.shape.options[0].particles = {};
            delete config.particles.shape.options[0].particles;
        }
        delete config.particles_shape_options_0_particles_show;
        delete config.particles_shape_options_0_particles;
        if(config.particles_shape_type_0 == "character" && config.particles_shape_options_0_font_show){
            config.particles.shape.options[0].font = config.particles_shape_options_0_font;
        }else{
            config.particles.shape.options[0].font = {};
            delete config.particles.shape.options[0].font;
        }
        delete config.particles_shape_options_0_font_show;
        delete config.particles_shape_options_0_font;
        if(config.particles_shape_type_0 == "character" && config.particles_shape_options_0_style_show){
            config.particles.shape.options[0].style = config.particles_shape_options_0_style;
        }else{
            config.particles.shape.options[0].style = {};
            delete config.particles.shape.options[0].style;
        }
        delete config.particles_shape_options_0_style_show;
        delete config.particles_shape_options_0_style;
        config.particles.shape.options[0].value = []
        if(config.particles_shape_type_0 == "character" && config.particles_shape_options_0_value_show){
            config.particles.shape.options[0].value[0] = config.particles_shape_options_0_value_0;
        }else{
            config.particles.shape.options[0].value = [];
            delete config.particles.shape.options[0].value;
        }
        delete config.particles_shape_options_0_value_show;
        delete config.particles_shape_options_0_value_0;
        if(config.particles_shape_type_0 == "character" && config.particles_shape_options_0_weight_show){
            config.particles.shape.options[0].weight = config.particles_shape_options_0_weight;
        }else{
            config.particles.shape.options[0].weight = {};
            delete config.particles.shape.options[0].weight;
        }
        delete config.particles_shape_options_0_weight_show;
        delete config.particles_shape_options_0_weight;
        if(config.particles_shape_type_0 == "image" && config.particles_shape_options_0_height_show){
            config.particles.shape.options[0].height = config.particles_shape_options_0_height;
        }else{
            config.particles.shape.options[0].height = {};
            delete config.particles.shape.options[0].height;
        }
        delete config.particles_shape_options_0_height_show;
        delete config.particles_shape_options_0_height;
        if(config.particles_shape_type_0 == "image" && config.particles_shape_options_0_replaceColor_show){
            config.particles.shape.options[0].replaceColor = config.particles_shape_options_0_replaceColor;
        }else{
            config.particles.shape.options[0].replaceColor = {};
            delete config.particles.shape.options[0].replaceColor;
        }
        delete config.particles_shape_options_0_replaceColor_show;
        delete config.particles_shape_options_0_replaceColor;
        if(config.particles_shape_type_0 == "image" && config.particles_shape_options_0_src_show){
            config.particles.shape.options[0].src = config.particles_shape_options_0_src;
        }else{
            config.particles.shape.options[0].src = {};
            delete config.particles.shape.options[0].src;
        }
        delete config.particles_shape_options_0_src_show;
        delete config.particles_shape_options_0_src;
        if(config.particles_shape_type_0 == "image" && config.particles_shape_options_0_width_show){
            config.particles.shape.options[0].width = config.particles_shape_options_0_width;
        }else{
            config.particles.shape.options[0].width = {};
            delete config.particles.shape.options[0].width;
        }
        delete config.particles_shape_options_0_width_show;
        delete config.particles_shape_options_0_width;
        if(config.particles_shape_type_0 == "star" && config.particles_shape_options_0_inset_show){
            config.particles.shape.options[0].inset = config.particles_shape_options_0_inset;
        }else{
            config.particles.shape.options[0].inset = {};
            delete config.particles.shape.options[0].inset;
        }
        delete config.particles_shape_options_0_inset_show;
        delete config.particles_shape_options_0_inset;
        if((config.particles_shape_type_0 == "polygon" || config.particles_shape_type_0 == "star") && config.particles_shape_options_0_sides_show){
            config.particles.shape.options[0].sides = config.particles_shape_options_0_sides;
        }else{
            config.particles.shape.options[0].sides = {};
            delete config.particles.shape.options[0].sides;
        }
        delete config.particles_shape_options_0_sides_show;
        delete config.particles_shape_options_0_sides;
        config.particles.shape.type = [];
        config.particles.shape.type[0] = config.particles_shape_type_0; //TODO array
        delete config.particles_shape_type_0;
        config.particles.size = {};
        config.particles.size.value = {
            min: config.particles_size_value[0],
            max: config.particles_size_value[1]
        };
        delete config.particles_size_value;
        config.particles.size.animation = {};
        config.particles.size.animation.destroy = config.particles_size_animation_destroy;
        delete config.particles_size_animation_destroy;
        config.particles.size.animation.startValue = config.particles_size_animation_startValue;
        delete config.particles_size_animation_startValue;
        config.particles.stroke = [];
        config.particles.stroke[0] = {}; //TODO array
        config.particles.stroke[0].color = {};
        config.particles.stroke[0].color.value = [];
        config.particles.stroke[0].color.value[0] = config.particles_stroke_0_color_value_0; //TODO array
        delete config.particles_stroke_0_color_value_0;
        if(config.particles_stroke_0_opacity_show){
            config.particles.stroke[0].opacity = {
                min: config.particles_stroke_0_opacity[0],
                max: config.particles_stroke_0_opacity[1]
            }
        }else{
            config.particles.stroke[0].opacity = {};
            delete config.particles.stroke[0].opacity;
        }
        delete config.particles_stroke_0_opacity_show;
        delete config.particles_stroke_0_opacity;
        if(config.particles_stroke_0_width_show){
            config.particles.stroke[0].width = {
                min: config.particles_stroke_0_width[0],
                max: config.particles_stroke_0_width[1]
            }
        }else{
            config.particles.stroke[0].width = {};
            delete config.particles.stroke[0].width;
        }
        delete config.particles_stroke_0_width_show;
        delete config.particles_stroke_0_width;
        config.particles.zIndex = {};
        config.particles.zIndex.value = config.particles_zIndex_value;
        delete config.particles_zIndex_value;
        config.particles.zIndex.opacityRate = config.particles_zIndex_opacityRate;
        delete config.particles_zIndex_opacityRate;
        config.particles.zIndex.sizeRate = config.particles_zIndex_sizeRate;
        delete config.particles_zIndex_sizeRate;
        config.particles.zIndex.velocityRate = config.particles_zIndex_velocityRate;
        delete config.particles_zIndex_velocityRate;
        config.preset = [];
        if(config.preset_show){
            config.preset[0] = config.preset_0; //TODO array
        }else{
            config.preset[0] = ""; //TODO array
            delete config.preset[0];
        }
        delete config.preset_show;
        delete config.preset_0;
        config.responsive = [];
        config.responsive[0] = {}; //TODO array
        config.responsive[0].maxWidth = config.responsive_0_maxWidth; //TODO array
        delete config.responsive_0_maxWidth;
        config.responsive[0].mode = config.responsive_0_mode; //TODO array
        delete config.responsive_0_mode;
        // config.responsive[0].options = config.responsive_0_options; //TODO array
        config.responsive[0].options = backgroundConfig.responsive[0].options; //TODO array //options
        delete config.responsive_0_options;
        config.themes = [];
        config.themes[0] = {}; //TODO array
        config.themes[0].default = {};
        config.themes[0].default.auto = config.themes_0_default_auto; //TODO array
        delete config.themes_0_default_auto;
        config.themes[0].default.mode = config.themes_0_default_mode; //TODO array
        delete config.themes_0_default_mode;
        config.themes[0].default.value = config.themes_0_default_value; //TODO array
        delete config.themes_0_default_value;
        config.themes[0].name = config.themes_0_name; //TODO array
        delete config.themes_0_name;
        if(config.themes_0_options_show){
            // config.themes[0].options = config.themes_0_options; //TODO array
            config.themes[0].options = backgroundConfig.themes[0].options; //TODO array //options
        }else{
            config.themes[0].options = {}; //TODO array
            delete config.themes[0].options;
        }
        delete config.themes_0_options_show;
        delete config.themes_0_options;
        //folder labels fix
        setTimeout(function(){
            jQuery('.leva-c-dosbYs').each(function(){
                $(this).children().last().text($(this).children().last().text().split("_").pop());
            });
        }, 1000);
    }
    const particlesInit = useCallback(async function(engine){
        await loadFull(engine);
    }, []);
    const particlesLoaded = useCallback(async function(container){
        await addParticlesPanel(container.particles.array);
    }, []);
    return <>
        <Particles id={particlesContainer} init={particlesInit} loaded={particlesLoaded} options={config} />
    </>;
};
