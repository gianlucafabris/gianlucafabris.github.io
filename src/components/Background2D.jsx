import { useState, useEffect, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { folder } from 'leva';

import { useParticlesPanel, useLevaDebug } from './Utils/Debug.jsx';

export default function Background2D({particlesContainer, BackgroundConfig}){
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(function(){
        const handleResize = function(){
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return function(){
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    useEffect(function(){
        initParticlesEngine(async function(engine){
            await loadAll(engine);
        });
    }, []);

    let config = useLevaDebug("particles", {
        autoplay: {value: BackgroundConfig.autoplay},
        background: folder({
            background_color: folder({
                background_color_value: folder({
                    ...BackgroundConfig.background.color.value.reduce(function(acc, val, i){
                        acc[`background_color_value_${i}`] = {value: val, label: `${i}`};
                        return acc;
                    }, {})
                }, {label: "value", collapsed: false})
            }, {label: "value", collapsed: true}),
            background_image: {value: BackgroundConfig.background.image, label: "image"},
            background_opacity: {value: BackgroundConfig.background.opacity, label: "opacity", min: 0, max: 1, step: 0.01},
            background_position: {value: BackgroundConfig.background.position, label: "position"},
            background_repeat: {value: BackgroundConfig.background.repeat, label: "repeat"},
            background_size: {value: BackgroundConfig.background.size, label: "size"}
        }, {collapsed: true}),
        backgroundMask: folder({
            backgroundMask_composite: {value: BackgroundConfig.backgroundMask.composite, label: "composite", options: ["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-edge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]},
            backgroundMask_cover: folder({
                backgroundMask_cover_color: folder({
                    backgroundMask_cover_color_value: folder({
                        ...BackgroundConfig.backgroundMask.cover.color.value.reduce(function(acc, val, i){
                            acc[`backgroundMask_cover_color_value_${i}`] = {value: val, label: `${i}`};
                            return acc;
                        }, {})
                    }, {label: "value", collapsed: false})
                }, {label: "color", collapsed: false}),
                backgroundMask_cover_opacity: {value: BackgroundConfig.backgroundMask.cover.opacity, label: "opacity", min: 0, max: 1, step: 0.01}
            }, {label: "cover", collapsed: true}),
            backgroundMask_enable: {value: BackgroundConfig.backgroundMask.enable, label: "enable"}
        }, {collapsed: true}),
        delay: {value: [BackgroundConfig.delay.min, BackgroundConfig.delay.max], label: "delay", min: 0, max: 10, step: 0.1},
        detectRetina: {value: BackgroundConfig.detectRetina},
        duration: {value: [BackgroundConfig.duration.min, BackgroundConfig.duration.max], label: "duration", min: 0, max: 100, step: 0.1},
        fpsLimit: {value: BackgroundConfig.fpsLimit, min: 0, max: 360, step: 1},
        fullScreen: folder({
            fullScreen_enable: {value: BackgroundConfig.fullScreen.enable, label: "enable"},
            fullScreen_zIndex: {value: BackgroundConfig.fullScreen.zIndex, label: "zIndex", min: 0, max: 1000, step: 1}
        }, {collapsed: true}),
        interactivity: folder({
            interactivity_detectsOn: {value: BackgroundConfig.interactivity.detectsOn, label: "detectsOn", options: ["canvas", "parent", "window"]},
            interactivity_events: folder({
                interactivity_events_onClick: folder({
                    interactivity_events_onClick_enable: {value: BackgroundConfig.interactivity.events.onClick.enable, label: "enable"},
                    interactivity_events_onClick_mode: folder({
                        ...BackgroundConfig.interactivity.events.onClick.mode.reduce(function(acc, mod, i){
                            acc[`interactivity_events_onClick_mode_${i}`] = {value: mod, label: `${i}`, options: ["attract", "bubble", "push", "remove", "repulse", "pause", "trail"]};
                            return acc;
                        }, {})
                    }, {label: "mode", collapsed: false})
                }, {label: "onClick", collapsed: false}),
                interactivity_events_onDiv: folder({
                    interactivity_events_onDiv_enable: {value: BackgroundConfig.interactivity.events.onDiv.enable, label: "enable"},
                    interactivity_events_onDiv_mode: folder({
                        ...BackgroundConfig.interactivity.events.onDiv.mode.reduce(function(acc, mod, i){
                            acc[`interactivity_events_onDiv_mode_${i}`] = {value: mod, label: `${i}`, options: ["bounce", "bubble", "repulse"]};
                            return acc;
                        }, {})
                    }, {label: "mode", collapsed: false}),
                    interactivity_events_onDiv_selectors: folder({
                        ...BackgroundConfig.interactivity.events.onDiv.selectors.reduce(function(acc, sel, i){
                            acc[`interactivity_events_onDiv_selectors_${i}`] = {value: sel, label: `${i}`};
                            return acc;
                        }, {})
                    }, {label: "selectors", collapsed: false}),
                    interactivity_events_onDiv_type: {value: BackgroundConfig.interactivity.events.onDiv.type, label: "type", options: ["circle", "rectangle"]}
                }, {label: "onDiv", collapsed: false}),
                interactivity_events_onHover: folder({
                    interactivity_events_onHover_enable: {value: BackgroundConfig.interactivity.events.onHover.enable, label: "enable"},
                    interactivity_events_onHover_mode: folder({
                        ...BackgroundConfig.interactivity.events.onHover.mode.reduce(function(acc, mod, i){
                            acc[`interactivity_events_onHover_mode_${i}`] = {value: mod, label: `${i}`, options: ["attract", "bounce", "bubble", "connect", "grab", "light", "repulse", "slow", "trail"]};
                            return acc;
                        }, {})
                    }, {label: "mode", collapsed: false}),
                    interactivity_events_onHover_parallax: folder({
                        interactivity_events_onHover_parallax_enable: {value: BackgroundConfig.interactivity.events.onHover.parallax.enable, label: "enable"},
                        interactivity_events_onHover_parallax_force: {value: BackgroundConfig.interactivity.events.onHover.parallax.force, label: "force", min: 0, max: 100, step: 1},
                        interactivity_events_onHover_parallax_smooth: {value: BackgroundConfig.interactivity.events.onHover.parallax.smooth, label: "smooth", min: 0, max: 100, step: 1}
                    }, {label: "parallax", collapsed: false})
                }, {label: "onHover", collapsed: false}),
                interactivity_events_resize: folder({
                    interactivity_events_resize_delay: {value: BackgroundConfig.interactivity.events.resize.delay, label: "delay", min: 0, max: 10, step: 0.1},
                    interactivity_events_resize_enable: {value: BackgroundConfig.interactivity.events.resize.enable, label: "enable"}
                }, {label: "resize", collapsed: false}),
            }, {label: "events", collapsed: true}),
            interactivity_modes: folder({
                interactivity_modes_attract: folder({
                    interactivity_modes_attract_distance: {value: BackgroundConfig.interactivity.modes.attract.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    interactivity_modes_attract_duration: {value: BackgroundConfig.interactivity.modes.attract.duration, label: "duration", min: 0, max: 10, step: 0.5},
                    interactivity_modes_attract_easing: {value: BackgroundConfig.interactivity.modes.attract.easing, label: "easing", options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]},
                    interactivity_modes_attract_factor: {value: BackgroundConfig.interactivity.modes.attract.factor, label: "factor", min: 0, max: 10, step: 1},
                    interactivity_modes_attract_maxSpeed: {value: BackgroundConfig.interactivity.modes.attract.maxSpeed, label: "maxSpeed", min: 0, max: 100, step: 1},
                    interactivity_modes_attract_speed: {value: BackgroundConfig.interactivity.modes.attract.speed, label: "speed", min: 0, max: 100, step: 1}
                }, {label: "attract", collapsed: false}),
                interactivity_modes_bounce: folder({
                    interactivity_modes_bounce_distance: {value: BackgroundConfig.interactivity.modes.bounce.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1}
                }, {label: "bounce", collapsed: false}),
                interactivity_modes_bubble: folder({
                    interactivity_modes_bubble_distance: {value: BackgroundConfig.interactivity.modes.bubble.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    interactivity_modes_bubble_duration: {value: BackgroundConfig.interactivity.modes.bubble.duration, label: "duration", min: 0, max: 10, step: 0.1},
                    interactivity_modes_bubble_mix: {value: BackgroundConfig.interactivity.modes.bubble.mix, label: "mix"},
                    interactivity_modes_bubble_opacity: {value: BackgroundConfig.interactivity.modes.bubble.opacity, label: "opacity", min: 0, max: 1, step: 0.01},
                    interactivity_modes_bubble_color: folder({
                        interactivity_modes_bubble_color_value: folder({
                            ...BackgroundConfig.interactivity.modes.bubble.color.value.reduce(function(acc, val, i){
                                acc[`interactivity_modes_bubble_color_value_${i}`] = {value: val, label: `${i}`};
                                return acc;
                            }, {})
                        }, {label: "value", collapsed: false})
                    }, {label: "color", collapsed: false}),
                    interactivity_modes_bubble_size: {value: BackgroundConfig.interactivity.modes.bubble.size, label: "size", min: 0, max: 1000, step: 1},
                    interactivity_modes_bubble_divs: folder({
                        interactivity_modes_bubble_divs_distance: {value: BackgroundConfig.interactivity.modes.bubble.divs.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                        interactivity_modes_bubble_divs_duration: {value: BackgroundConfig.interactivity.modes.bubble.divs.duration, label: "duration", min: 0, max: 10, step: 0.1},
                        interactivity_modes_bubble_divs_mix: {value: BackgroundConfig.interactivity.modes.bubble.divs.mix, label: "mix"},
                        interactivity_modes_bubble_divs_selectors: folder({
                            ...BackgroundConfig.interactivity.modes.bubble.divs.selectors.reduce(function(acc, sel, i){
                                acc[`interactivity_modes_bubble_divs_selectors_${i}`] = {value: sel, label: `${i}`};
                                return acc;
                            }, {})
                        }, {label: "selectors", collapsed: false})
                    }, {label: "divs", collapsed: false})
                }, {label: "bubble", collapsed: false}),
                interactivity_modes_connect: folder({
                    interactivity_modes_connect_distance: {value: BackgroundConfig.interactivity.modes.connect.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    interactivity_modes_connect_links: folder({
                        interactivity_modes_connect_links_opacity: {value: BackgroundConfig.interactivity.modes.connect.links.opacity, label: "opacity", min: 0, max: 1, step: 0.01}
                    }, {label: "links", collapsed: false}),
                    interactivity_modes_connect_radius: {value: BackgroundConfig.interactivity.modes.connect.radius, label: "radius", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1}
                }, {label: "connect", collapsed: false}),
                interactivity_modes_grab: folder({
                    interactivity_modes_grab_distance: {value: BackgroundConfig.interactivity.modes.grab.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    interactivity_modes_grab_links: folder({
                        interactivity_modes_grab_links_blink: {value: BackgroundConfig.interactivity.modes.grab.links.blink, label: "blink", min: 0, max: 1, step: 0.01},
                        interactivity_modes_grab_links_consent: {value: BackgroundConfig.interactivity.modes.grab.links.consent, label: "consent", min: 0, max: 1, step: 0.01},
                        interactivity_modes_grab_links_opacity: {value: BackgroundConfig.interactivity.modes.grab.links.opacity, label: "opacity", min: 0, max: 1, step: 0.01}
                    }, {label: "links", collapsed: false})
                }, {label: "grab", collapsed: false}),
                interactivity_modes_light: folder({
                    interactivity_modes_light_area: folder({
                        interactivity_modes_light_area_gradient: folder({
                            interactivity_modes_light_area_gradient_start: folder({
                                interactivity_modes_light_area_gradient_start_value: folder({
                                    ...BackgroundConfig.interactivity.modes.light.area.gradient.start.value.reduce(function(acc, val, i){
                                        acc[`interactivity_modes_light_area_gradient_start_value_${i}`] = {value: val, label: `${i}`};
                                        return acc;
                                    }, {})
                                }, {label: "value", collapsed: false})
                            }, {label: "start", collapsed: false}),
                            interactivity_modes_light_area_gradient_stop: folder({
                                interactivity_modes_light_area_gradient_stop_value: folder({
                                    ...BackgroundConfig.interactivity.modes.light.area.gradient.stop.value.reduce(function(acc, val, i){
                                        acc[`interactivity_modes_light_area_gradient_stop_value_${i}`] = {value: val, label: `${i}`};
                                        return acc;
                                    }, {})
                                }, {label: "value", collapsed: false})
                            }, {label: "stop", collapsed: false}),
                        }, {label: "gradient", collapsed: false}),
                            interactivity_modes_light_area_radius: {value: BackgroundConfig.interactivity.modes.light.area.radius, label: "radius", min: 0, max: 1000, step: 1
                        }
                    }, {label: "area", collapsed: false}),
                    interactivity_modes_light_shadow: folder({
                        interactivity_modes_light_shadow_color: folder({
                            interactivity_modes_light_shadow_color_value: folder({
                                ...BackgroundConfig.interactivity.modes.light.shadow.color.value.reduce(function(acc, val, i){
                                    acc[`interactivity_modes_light_shadow_color_value_${i}`] = {value: val, label: `${i}`};
                                    return acc;
                                }, {})
                            }, {label: "value", collapsed: false})
                        }, {label: "color", collapsed: false}),
                        interactivity_modes_light_shadow_length: {value: BackgroundConfig.interactivity.modes.light.shadow.length, label: "length", min: 0, max: 10000, step: 1}
                    }, {label: "shadow", collapsed: false})
                }, {label: "light", collapsed: false}),
                interactivity_modes_push: folder({
                    interactivity_modes_push_default: {value: BackgroundConfig.interactivity.modes.push.default, label: "default"},
                    interactivity_modes_push_groups: folder({
                        ...BackgroundConfig.interactivity.modes.push.groups.reduce(function(acc, gro, i){
                            acc[`interactivity_modes_push_groups_${i}`] = {value: gro, label: `${i}`, min: 0, max: 50, step: 1};
                            return acc;
                        }, {})
                    }, {label: "groups", collapsed: false}),
                    interactivity_modes_push_quantity: {value: BackgroundConfig.interactivity.modes.push.quantity, label: "quantity", min: 0, max: 50, step: 1}
                }, {label: "push", collapsed: false}),
                interactivity_modes_remove: folder({
                    interactivity_modes_remove_quantity: {value: BackgroundConfig.interactivity.modes.remove.quantity, label: "quantity", min: 0, max: 50, step: 1}
                }, {label: "remove", collapsed: false}),
                interactivity_modes_repulse: folder({
                    interactivity_modes_repulse_distance: {value: BackgroundConfig.interactivity.modes.repulse.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    interactivity_modes_repulse_duration: {value: BackgroundConfig.interactivity.modes.repulse.duration, label: "duration", min: 0, max: 10, step: 0.1},
                    interactivity_modes_repulse_factor: {value: BackgroundConfig.interactivity.modes.repulse.factor, label: "factor", min: 0, max: 10, step: 1},
                    interactivity_modes_repulse_speed: {value: BackgroundConfig.interactivity.modes.repulse.speed, label: "speed", min: 0, max: 100, step: 1},
                    interactivity_modes_repulse_maxSpeed: {value: BackgroundConfig.interactivity.modes.repulse.maxSpeed, label: "maxSpeed", min: 0, max: 100, step: 1},
                    interactivity_modes_repulse_easing: {value: BackgroundConfig.interactivity.modes.repulse.easing, label: "easing", options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]},
                    interactivity_modes_repulse_divs: folder({
                        interactivity_modes_repulse_divs_distance: {value: BackgroundConfig.interactivity.modes.repulse.divs.distance, label: "distance", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                        interactivity_modes_repulse_divs_duration: {value: BackgroundConfig.interactivity.modes.repulse.divs.duration, label: "duration", min: 0, max: 10, step: 0.1},
                        interactivity_modes_repulse_divs_factor: {value: BackgroundConfig.interactivity.modes.repulse.divs.factor, label: "factor", min: 0, max: 10, step: 1},
                        interactivity_modes_repulse_divs_speed: {value: BackgroundConfig.interactivity.modes.repulse.divs.speed, label: "speed", min: 0, max: 100, step: 1},
                        interactivity_modes_repulse_divs_maxSpeed: {value: BackgroundConfig.interactivity.modes.repulse.divs.maxSpeed, label: "maxSpeed", min: 0, max: 100, step: 1},
                        interactivity_modes_repulse_divs_easing: {value: BackgroundConfig.interactivity.modes.repulse.divs.easing, label: "easing", options: ["ease-in-back", "ease-out-back", "ease-in-out-back", "ease-in-circ", "ease-out-circ", "ease-in-out-circ", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-sine", "ease-out-sine", "ease-in-out-sine"]},
                        interactivity_modes_repulse_divs_selectors: folder({
                            ...BackgroundConfig.interactivity.modes.repulse.divs.selectors.reduce(function(acc, sel, i){
                                acc[`interactivity_modes_repulse_divs_selectors_${i}`] = {value: sel, label: `${i}`};
                                return acc;
                            }, {})
                        }, {label: "selectors", collapsed: false})
                    }, {label: "divs", collapsed: false})
                }, {label: "repulse", collapsed: false}),
                interactivity_modes_pause: {value: BackgroundConfig.interactivity.modes.pause, label: "pause"},
                interactivity_modes_slow: folder({
                    interactivity_modes_slow_factor: {value: BackgroundConfig.interactivity.modes.slow.factor, label: "factor", min: 0, max: 10, step: 1},
                    interactivity_modes_slow_radius: {value: BackgroundConfig.interactivity.modes.slow.radius, label: "radius", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1}
                }, {label: "slow", collapsed: false}),
                interactivity_modes_trail: folder({
                    interactivity_modes_trail_delay: {value: BackgroundConfig.interactivity.modes.trail.delay, label: "delay", min: 0, max: 10, step: 0.1},
                    interactivity_modes_trail_pauseOnStop: {value: BackgroundConfig.interactivity.modes.trail.pauseOnStop, label: "pauseOnStop"},
                    interactivity_modes_trail_quantity: {value: BackgroundConfig.interactivity.modes.trail.quantity, label: "quantity", min: 0, max: 50, step: 1}
                }, {label: "trail", collapsed: false})
            }, {label: "modes", collapsed: true}),
        }, {collapsed: true}),
        manualParticles: folder({
            ...BackgroundConfig.manualParticles.reduce(function(acc, mp, i){
                acc[`manualParticles_${i}`] = folder({
                    // [`manualParticles_${i}_options_show`]: {value: true, label: "Show options"},
                    // [`manualParticles_${i}_options`]: {value: mp.options, label: "options", render: function(get){return get(`particles.manualParticles.manualParticles_${i}.manualParticles_${i}_options_show`);}}, //particles
                    [`manualParticles_${i}_position_show`]: {value: true, label: "Show position"},
                    [`manualParticles_${i}_position`]: {value: mp.position, label: "position", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1, render: function(get){return get(`particles.manualParticles.manualParticles_${i}.manualParticles_${i}_position_show`);}}
                }, {label: `${i}`, collapsed: true});
                return acc;
            }, {})
        }, {collapsed: true}),
        particles: folder({
            particles_bounce: folder({
                particles_bounce_horizontal: folder({
                    particles_bounce_horizontal_value: {value: [BackgroundConfig.particles.bounce.horizontal.value.min, BackgroundConfig.particles.bounce.horizontal.value.max], label: "value", min: 0, max: 1000, step: 1}
                }, {label: "horizontal", collapsed: false}),particles_bounce_vertical: folder({
                    particles_bounce_vertical_value: {value: [BackgroundConfig.particles.bounce.vertical.value.min, BackgroundConfig.particles.bounce.vertical.value.max], label: "value", min: 0, max: 1000, step: 1}
                }, {label: "vertical", collapsed: false})
            }, {label: "bounce", collapsed: true}),
            particles_collisions: folder({
                particles_collisions_absorb: folder({
                    particles_collisions_absorb_speed: {value: BackgroundConfig.particles.collisions.absorb.speed, label: "speed", min: 0, max: 1000, step: 1}
                }, {label: "absorb", collapsed: false}),
                // particles_collisions_bounce: {value: BackgroundConfig.particles.collisions.bounce, label: "bounce"}, //bounce
                particles_collisions_enable: {value: BackgroundConfig.particles.collisions.enable, label: "enable"},
                particles_collisions_mode: {value: BackgroundConfig.particles.collisions.mode, label: "mode", options: ["absorb", "bounce", "destroy"]},
                particles_collisions_overlap: folder({
                    particles_collisions_overlap_enable: {value: BackgroundConfig.particles.collisions.overlap.enable, label: "enable"},
                    particles_collisions_overlap_retries: {value: BackgroundConfig.particles.collisions.overlap.retries, label: "retries", min: 0, max: 1000, step: 1}
                }, {label: "overlap", collapsed: false}),
            }, {label: "collisions", collapsed: true}),
            particles_color: folder({
                particles_color_value: folder({
                    ...BackgroundConfig.particles.color.value.reduce(function(acc, val, i){
                        acc[`particles_color_value_${i}`] = {value: val, label: `${i}`};
                        return acc;
                    }, {})
                }, {label: "value", collapsed: false})
            }, {label: "color", collapsed: true}),
            // particles_groups: {value: BackgroundConfig.particles.groups, label: "groups"}, //particles
            // particles_interactivity_show:{value: true, label: "Show interactivity"},
            // particles_interactivity:{value: BackgroundConfig.particles.interactivity, label: "interactivity", render: function(get){return get('particles.particles.articles_interactivity_show');}}, //interactivity
            particles_links: folder({
                particles_links_blink: {value: BackgroundConfig.particles.links.blink, label: "blink"},
                particles_links_color: folder({
                    particles_links_color_value: folder({
                        ...BackgroundConfig.particles.links.color.value.reduce(function(acc, val, i){
                            acc[`particles_links_color_value_${i}`] = {value: val, label: `${i}`};
                            return acc;
                        }, {})
                    }, {label: "value", collapsed: false})
                }, {label: "color", collapsed: false}),
                particles_links_consent: {value: BackgroundConfig.particles.links.consent, label: "consent"},
                particles_links_distance: {value: BackgroundConfig.particles.links.distance, label: "distance", min: 0, max: 1000, step: 1},
                particles_links_enable: {value: BackgroundConfig.particles.links.enable, label: "enable"},
                particles_links_frequency: {value: BackgroundConfig.particles.links.frequency, label: "frequency", min: 0, max: 1, step: 0.01},
                particles_links_opacity: {value: BackgroundConfig.particles.links.opacity, label: "opacity", min: 0, max: 1, step: 0.01},
                particles_links_shadow: folder({
                    particles_links_shadow_blur: {value: BackgroundConfig.particles.links.shadow.blur, label: "blur", min: 0, max: 50, step: 1},
                    particles_links_shadow_color: folder({
                        particles_links_shadow_color_value: folder({
                            ...BackgroundConfig.particles.links.shadow.color.value.reduce(function(acc, val, i){
                                acc[`particles_links_shadow_color_value_${i}`] = {value: val, label: `${i}`};
                                return acc;
                            }, {})
                        }, {label: "value", collapsed: false})
                    }, {label: "color", collapsed: false}),
                    particles_links_shadow_enable: {value: BackgroundConfig.particles.links.shadow.enable, label: "enable"}
                }, {label: "shadow", collapsed: false}),
                particles_links_triangles: folder({
                    particles_links_triangles_enable: {value: BackgroundConfig.particles.links.triangles.enable, label: "enable"},
                    particles_links_triangles_frequency: {value: BackgroundConfig.particles.links.triangles.frequency, label: "frequency", min: 0, max: 1, step: 0.01},
                    particles_links_triangles_opacity: {value: BackgroundConfig.particles.links.triangles.opacity, label: "opacity", min: 0, max: 1, step: 0.01}
                }, {label: "triangles", collapsed: false}),
                particles_links_width: {value: BackgroundConfig.particles.links.width, label: "width", min: 0, max: 1000, step: 1},
                particles_links_warp: {value: BackgroundConfig.particles.links.warp, label: "warp"}
            }, {label: "links", collapsed: true}),
            particles_move: folder({
                particles_move_angle: folder({
                    particles_move_angle_offset: {value: [BackgroundConfig.particles.move.angle.offset.min, BackgroundConfig.particles.move.angle.offset.max], label: "offset", min: -Math.max(window.innerWidth, window.innerHeight), max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    particles_move_angle_value: {value: [BackgroundConfig.particles.move.angle.value.min, BackgroundConfig.particles.move.angle.value.max], label: "value", min: 0, max: 1000, step: 1}
                }, {label: "angle", collapsed: false}),
                particles_move_attract: folder({
                    particles_move_attract_distance: {value: [BackgroundConfig.particles.move.attract.distance.min, BackgroundConfig.particles.move.attract.distance.max], label: "distance", min: 0, max: 1000, step: 1},
                    particles_move_attract_enable: {value: BackgroundConfig.particles.move.attract.enable, label: "enable"},
                    particles_move_attract_rotate: {value: BackgroundConfig.particles.move.attract.rotate, label: "rotate", min: 0, max: 10000, step: 1}
                }, {label: "attract", collapsed: false}),
                particles_move_center: folder({
                    particles_move_center_mode: {value: BackgroundConfig.particles.move.center.mode, label: "mode", options: ["precise", "percent"]},
                    particles_move_center_radius: {value: BackgroundConfig.particles.move.center.radius, label: "radius", min: 0, max: 1000, step: 1}
                }, {label: "center", collapsed: false}),
                particles_move_decay: {value: [BackgroundConfig.particles.move.decay.min, BackgroundConfig.particles.move.decay.max], label: "decay", min: 0, max: 1000, step: 1},
                particles_move_direction: {value: BackgroundConfig.particles.move.direction, label: "direction", options: ["bottom", "bottom-left", "bottom-right", "left", "none", "right", "top", "top-left", "top-right", "outside", "inside"]},
                particles_move_distance: folder({
                    particles_move_distance_horizontal: {value: BackgroundConfig.particles.move.distance.horizontal, label: "horizontal", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1},
                    particles_move_distance_vertical: {value: BackgroundConfig.particles.move.distance.vertical, label: "vertical", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1}
                }, {label: "distance", collapsed: false}),
                particles_move_drift: {value: [BackgroundConfig.particles.move.drift.min, BackgroundConfig.particles.move.drift.max], label: "drift", min: 0, max: 10, step: 0.01},
                particles_move_enable: {value: BackgroundConfig.particles.move.enable, label: "enable"},
                particles_move_gravity: folder({
                    particles_move_gravity_acceleration: {value: [BackgroundConfig.particles.move.gravity.acceleration.min, BackgroundConfig.particles.move.gravity.acceleration.max], label: "acceleration", min: 0, max: 1000, step: 1},
                    particles_move_gravity_enable: {value: BackgroundConfig.particles.move.gravity.enable, label: "enable"},
                    particles_move_gravity_inverse: {value: BackgroundConfig.particles.move.gravity.inverse, label: "inverse"},
                    particles_move_gravity_maxSpeed: {value: [BackgroundConfig.particles.move.gravity.maxSpeed.min, BackgroundConfig.particles.move.gravity.maxSpeed.max], label: "maxSpeed", min: 0, max: 1000, step: 1}
                }, {label: "gravity", collapsed: false}),
                particles_move_outModes: folder({
                    particles_move_outModes_bottom_show: {value: true, label: "Show bottom"},
                    particles_move_outModes_bottom: {value: BackgroundConfig.particles.move.outModes.bottom, label: "bottom", options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"], render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_bottom_show');}},
                    particles_move_outModes_default: {value: BackgroundConfig.particles.move.outModes.default, label: "default", options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"]},
                    particles_move_outModes_left_show: {value: true, label: "Show left"},
                    particles_move_outModes_left: {value: BackgroundConfig.particles.move.outModes.left, label: "left", options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"], render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_left_show');}},
                    particles_move_outModes_right_show: {value: true, label: "Show right"},
                    particles_move_outModes_right: {value: BackgroundConfig.particles.move.outModes.right, label: "right", options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"], render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_right_show');}},
                    particles_move_outModes_top_show: {value: true, label: "Show top"},
                    particles_move_outModes_top: {value: BackgroundConfig.particles.move.outModes.top, label: "top", options: ["bounce", "bounce-horizontal", "bounce-vertical", "none", "out", "destroy", "split"], render: function(get){return get('particles.particles.particles_move.particles_move_outModes.particles_move_outModes_top_show');}}
                }, {label: "outModes", collapsed: false}),
                particles_move_path: folder({
                    particles_move_path_clamp: {value: BackgroundConfig.particles.move.path.clamp, label: "clamp"},
                    particles_move_path_delay: folder({
                        particles_move_path_delay_value: {value: [BackgroundConfig.particles.move.path.delay.value.min, BackgroundConfig.particles.move.path.delay.value.max], label: "value", min: 0, max: 10, step: 0.1}
                    }, {label: "delay", collapsed: false}),
                    particles_move_path_enable: {value: BackgroundConfig.particles.move.path.enable, label: "enable"},
                    particles_move_path_generator_show: {value: true, label: "Show generator"},
                    particles_move_path_generator: {value: BackgroundConfig.particles.move.path.generator, label: "generator", render: function(get){return get('particles.particles.particles_move.particles_move_path.particles_move_path_generator_show');}},
                    particles_move_path_options: {value: BackgroundConfig.particles.move.path.options, label: "options"}
                }, {label: "path", collapsed: false}),
                particles_move_random: {value: BackgroundConfig.particles.move.random, label: "random"},
                particles_move_size: {value: BackgroundConfig.particles.move.size, label: "size", min: 0, max: 1000, step: 1},
                particles_move_speed: {value: [BackgroundConfig.particles.move.speed.min, BackgroundConfig.particles.move.speed.max], label: "speed", min: 0, max: 100, step: 1},
                particles_move_spin: folder({
                    particles_move_spin_acceleration: {value: [BackgroundConfig.particles.move.spin.acceleration.min, BackgroundConfig.particles.move.spin.acceleration.max], label: "acceleration", min: 0, max: 10, step: 0.01},
                    particles_move_spin_enable: {value: BackgroundConfig.particles.move.spin.enable, label: "enable"},
                    particles_move_spin_position_show: {value: true, label: "Show position"},
                    particles_move_spin_position: {value: BackgroundConfig.particles.move.spin.position, label: "position", min: 0, max: 100, step: 1, render: function(get){return get('particles.particles.particles_move.particles_move_spin.particles_move_spin_position_show');}}
                }, {label: "spin", collapsed: false}),
                particles_move_straight: {value: BackgroundConfig.particles.move.straight, label: "straight"},
                particles_move_trail: folder({
                    particles_move_trail_enable: {value: BackgroundConfig.particles.move.trail.enable, label: "enable"},
                    particles_move_trail_fill: folder({
                        particles_move_trail_fill_color_show: {value: true, label: "Show color"},
                        particles_move_trail_fill_color: folder({
                            particles_move_trail_fill_color_value: folder({
                                ...BackgroundConfig.particles.move.trail.fill.color.value.reduce(function(acc, val, i){
                                    acc[`particles_move_trail_fill_color_value_${i}`] = {value: val, label: `${i}`};
                                    return acc;
                                }, {})
                            }, {label: "value", collapsed: false})
                        }, {label: "color", render: function(get){return get('particles.particles.particles_move.particles_move_trail.particles_move_trail_fill.particles_move_trail_fill_color_show');}, collapsed: false}),
                        particles_move_trail_fill_image_show: {value: true, label: "Show image"},
                        particles_move_trail_fill_image: {value: BackgroundConfig.particles.move.trail.fill.image, label: "image", render: function(get){return get('particles.particles.particles_move.particles_move_trail.particles_move_trail_fill.particles_move_trail_fill_image_show');}}
                    }, {label: "fill", collapsed: false}),
                    particles_move_trail_length: {value: BackgroundConfig.particles.move.trail.length, label: "length", min: 0, max: 1000, step: 1}
                }, {label: "trail", collapsed: false}),
                particles_move_vibrate: {value: BackgroundConfig.particles.move.vibrate, label: "vibrate"},
                particles_move_warp: {value: BackgroundConfig.particles.move.warp, label: "warp"}
            }, {label: "move", collapsed: true}),
            particles_number: folder({
                particles_number_density: folder({
                    particles_number_density_enable: {value: BackgroundConfig.particles.number.density.enable, label: "enable"},
                    particles_number_density_height: {value: BackgroundConfig.particles.number.density.height, label: "height", min: 0, max: 10000, step: 1},
                    particles_number_density_width: {value: BackgroundConfig.particles.number.density.width, label: "width", min: 0, max: 10000, step: 1}
                }, {label: "density", collapsed: false}),
                particles_number_limit: {value: BackgroundConfig.particles.number.limit, label: "limit", min: 0, max: 10000, step: 1},
                particles_number_value: {value: BackgroundConfig.particles.number.value, label: "value", min: 0, max: 10000, step: 1}
            }, {label: "number", collapsed: true}),
            particles_opacity: folder({
                particles_opacity_value: {value: BackgroundConfig.particles.opacity.value, label: "value", min: 0, max: 1, step: 0.01},
                particles_opacity_random: {value: BackgroundConfig.particles.opacity.random, label: "random"},
                particles_opacity_animation: folder({
                    particles_opacity_animation_destroy: {value: BackgroundConfig.particles.opacity.animation.destroy, label: "destroy", options: ["none", "max", "min"]},
                    particles_opacity_animation_startValue: {value: BackgroundConfig.particles.opacity.animation.startValue, label: "startValue", options: ["max", "min", "random"]}
                }, {label: "animation", collapsed: false})
            }, {label: "opacity", collapsed: true}),
            particles_reduceDuplicates: {value: BackgroundConfig.particles.reduceDuplicates, label: "reduceDuplicates"},
            particles_shadow: folder({
                particles_shadow_blur: {value: BackgroundConfig.particles.shadow.blur, label: "blur", min: 0, max: 50, step: 1},
                particles_shadow_color: folder({
                    particles_shadow_color_value: folder({
                        ...BackgroundConfig.particles.shadow.color.value.reduce(function(acc, val, i){
                            acc[`particles_shadow_color_value_${i}`] = {value: val, label: `${i}`};
                            return acc;
                        }, {})
                    }, {label: "value", collapsed: false})
                }, {label: "color", collapsed: false}),
                particles_shadow_enable: {value: BackgroundConfig.particles.shadow.enable, label: "enable"},
                particles_shadow_offset: {value: BackgroundConfig.particles.shadow.offset, label: "offset", min: -Math.max(window.innerWidth, window.innerHeight), max: Math.max(window.innerWidth, window.innerHeight), step: 1}
            }, {label: "shadow", collapsed: true}),
            particles_shape: folder({
                particles_shape_options: folder({
                    ...BackgroundConfig.particles.shape.options.reduce(function(acc, opt, i){
                        acc[`particles_shape_options_${i}`] = folder({
                            [`particles_shape_options_${i}_close_show`]: {value: true, label: "Show close"},
                            [`particles_shape_options_${i}_close`]: {value: opt.close, label: "close", render: function(get){return get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_close_show`);}},
                            [`particles_shape_options_${i}_fill_show`]: {value: true, label: "Show fill"},
                            [`particles_shape_options_${i}_fill`]: {value: opt.fill, label: "fill", render: function(get){return get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_fill_show`);}},
                            // [`particles_shape_options_${i}_particles_show`]: {value: true, label: "Show particles"},
                            // [`particles_shape_options_${i}_particles`]: {value: opt.particles, label: "particles", render: function(get){return get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_particles_show`);}}, //particles
                            [`particles_shape_options_${i}_font_show`]: {value: true, label: "Show font", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}},
                            [`particles_shape_options_${i}_font`]: {value: opt.font, label: "font", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_font_show`);}},
                            [`particles_shape_options_${i}_style_show`]: {value: true, label: "Show style", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}},
                            [`particles_shape_options_${i}_style`]: {value: opt.style, label: "style", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_style_show`);}},
                            [`particles_shape_options_${i}_value_show`]: {value: true, label: "Show value", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}},
                            [`particles_shape_options_${i}_value`]: folder({
                                ...opt.value.reduce(function(acc2, val, j){
                                    acc2[`particles_shape_options_${i}_value_${j}`] = {value: val, label: `${j}`};
                                    return acc2;
                                }, {})
                            }, {label: "value", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get('particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_value_show');}, collapsed: false}),
                            [`particles_shape_options_${i}_weight_show`]: {value: true, label: "Show weight", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character";}},
                            [`particles_shape_options_${i}_weight`]: {value: opt.weight, label: "weight", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "character" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_weight_show`);}},
                            [`particles_shape_options_${i}_height_show`]: {value: true, label: "Show height", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}},
                            [`particles_shape_options_${i}_height`]: {value: opt.height, label: "height", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1, render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_height_show`);}},
                            [`particles_shape_options_${i}_replaceColor_show`]: {value: true, label: "Show replaceColor", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}},
                            [`particles_shape_options_${i}_replaceColor`]: {value: opt.replaceColor, label: "replaceColor", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_replaceColor_show`);}},
                            [`particles_shape_options_${i}_src_show`]: {value: true, label: "Show src", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}},
                            [`particles_shape_options_${i}_src`]: {value: opt.src, label: "src", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_src_show`);}},
                            [`particles_shape_options_${i}_width_show`]: {value: true, label: "Show width", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image";}},
                            [`particles_shape_options_${i}_width`]: {value: opt.width, label: "width", min: 0, max: Math.max(window.innerWidth, window.innerHeight), step: 1, render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "image" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_width_show`);}},
                            [`particles_shape_options_${i}_inset_show`]: {value: true, label: "Show inset", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star";}},
                            [`particles_shape_options_${i}_inset`]: {value: opt.inset, label: "inset", min: 0, max: 1000, step: 1, render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star" && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_inset_show`);}},
                            [`particles_shape_options_${i}_sides_show`]: {value: true, label: "Show sides", render: function(get){return get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "polygon" || get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star";}},
                            [`particles_shape_options_${i}_sides`]: {value: opt.sides, label: "sides", min: 0, max: 1000, step: 1, render: function(get){return (get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "polygon" || get('particles.particles.particles_shape.particles_shape_type.particles_shape_type_0') == "star") && get(`particles.particles.particles_shape.particles_shape_options.particles_shape_options_${i}.particles_shape_options_${i}_sides_show`);}}
                        }, {label: `${i}`, collapsed: false});
                        return acc;
                    }, {})
                }, {label: "options", collapsed: false}),
                particles_shape_type: folder({
                    ...BackgroundConfig.particles.shape.type.reduce(function(acc, typ, i){
                        acc[`particles_shape_type_${i}`] = {value: typ, label: `${i}`, options: ["character", "image", "polygon", "star", "circle", "square", "triangle"]};
                        return acc;
                    }, {})
                }, {label: "type", collapsed: false})
            }, {label: "shape", collapsed: true}),
            particles_size: folder({
                particles_size_value: {value: [BackgroundConfig.particles.size.value.min, BackgroundConfig.particles.size.value.max], label: "value", min: 0, max: 1000, step: 1},
                particles_size_animation: folder({
                    particles_size_animation_destroy: {value: BackgroundConfig.particles.size.animation.destroy, label: "destroy", options: ["none", "max", "min"]},
                    particles_size_animation_startValue: {value: BackgroundConfig.particles.size.animation.startValue, label: "startValue", options: ["max", "min", "random"]}
                }, {label: "animation", collapsed: false})
            }, {label: "size", collapsed: true}),
            particles_stroke: folder({
                ...BackgroundConfig.particles.stroke.reduce(function(acc, str, i){
                    acc[`particles_stroke_${i}`] = folder({
                        [`particles_stroke_${i}_color`]: folder({
                            [`particles_stroke_${i}_color_value`]: folder({
                                ...str.color.value.reduce(function(acc2, val, j){
                                    acc2[`particles_stroke_${i}_color_value_${j}`] = {value: val, label: `${j}`};
                                    return acc2;
                                }, {})
                            }, {label: "value", collapsed: false})
                        }, {label: "color", collapsed: false}),
                        [`particles_stroke_${i}_opacity_show`]: {value: true, label: "Show opacity"},
                        [`particles_stroke_${i}_opacity`]: {value: [str.opacity.min, str.opacity.max], label: "opacity", min: 0, max: 1, step: 0.01, render: function(get){return get(`particles.particles.particles_stroke.particles_stroke_${i}.particles_stroke_${i}_opacity_show`);}},
                        [`particles_stroke_${i}_width_show`]: {value: true, label: "Show width"},
                        [`particles_stroke_${i}_width`]: {value: [str.width.min, str.width.max], label: "width", min: 0, max: 1000, step: 1, render: function(get){return get(`particles.particles.particles_stroke.particles_stroke_${i}.particles_stroke_${i}_width_show`);}}
                    }, {label: `${i}`, collapsed: false});
                    return acc;
                }, {})
            }, {label: "stroke", collapsed: true}),
            particles_zIndex: folder({
                particles_zIndex_value: {value: BackgroundConfig.particles.zIndex.value, label: "value", min: 0, max: 10, step: 1},
                particles_zIndex_opacityRate: {value: BackgroundConfig.particles.zIndex.opacityRate, label: "opacityRate", min: 0, max: 10, step: 1},
                particles_zIndex_sizeRate: {value: BackgroundConfig.particles.zIndex.sizeRate, label: "sizeRate", min: 0, max: 10, step: 1},
                particles_zIndex_velocityRate: {value: BackgroundConfig.particles.zIndex.velocityRate, label: "velocityRate", min: 0, max: 10, step: 1}
            }, {label: "zIndex", collapsed: true}),
        }, {collapsed: true}),
        pauseOnBlur: {value: BackgroundConfig.pauseOnBlur},
        pauseOnOutSideViewport: {value: BackgroundConfig.pauseOnOutSideViewport},
        preset_show: {value: true, label: "Show preset"},
        preset: folder({
            ...BackgroundConfig.preset.reduce(function(acc, pre, i){
                acc[`preset_${i}`] = {value: pre, label: `${i}`, options: ["", "basic", "confetti", "fireworks", "stars", "snow", "bubbles", "firefly", "links", "fire", "seaAnemone", "fountain", "bigCircles", "blossomFallV1", "FlyingBat"], render: function(get){return get('particles.preset_show');}};
                return acc;
            }, {})
        }, {collapsed: true}),
        responsive: folder({
            ...BackgroundConfig.responsive.reduce(function(acc, res, i){
                acc[`responsive_${i}`] = folder({
                    [`responsive_${i}_maxWidth`]: {value: res.maxWidth, label: "maxWidth", min: 0, max: 10000, step: 1},
                    [`responsive_${i}_mode`]: {value: res.mode, label: "mode", options: ["screen", "canvas"]},
                    // [`responsive_${i}_options`]: {value: val.options, label: "options"} //options
                }, {label: `${i}`, collapsed: true});
                return acc;
            }, {})
        }, {collapsed: true}),
        smooth: {value: BackgroundConfig.smooth},
        style: {value: BackgroundConfig.style},
        themes: folder({
            ...BackgroundConfig.themes.reduce(function(acc, the, i){
                acc[`themes_${i}`] = folder({
                    [`themes_${i}_default`]: folder({
                        [`themes_${i}_default_auto`]: {value: the.default.auto, label: "auto"},
                        [`themes_${i}_default_mode`]: {value: the.default.mode, label: "mode", options: ["any", "dark", "light"]},
                        [`themes_${i}_default_value`]: {value: the.default.value, label: "value"},
                        // [`themes_${i}_options_show`]: {value: true, label: "Show options"},
                        // [`themes_${i}_options`]: {value: the.options, label: "options", render: function(get){return get(`particles.themes.themes_${i}.themes_${i}_options_show`);}} //options
                    }, {label: "default", collapsed: false})
                }, {label: `${i}`, collapsed: true});
                return acc;
            }, {})
        }, {collapsed: true}),
        zLayers: {value: BackgroundConfig.zLayers, min: 0, max: 100, step: 1}
    });
    if(config == null || JSON.stringify(config) === '{}'){
        config = {...BackgroundConfig};
    }else{
        //output fix
        config.background = {};
        config.background.color = {};
        config.background.color.value = BackgroundConfig.background.color.value.map(function(val, i){
            return config[`background_color_value_${i}`];
        });
        BackgroundConfig.background.color.value.map(function(val, i){
            delete config[`background_color_value_${i}`];
        });
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
        config.backgroundMask.cover.color.value = BackgroundConfig.backgroundMask.cover.color.value.map(function(val, i){
            return config[`backgroundMask_cover_color_value_${i}`];
        });
        BackgroundConfig.backgroundMask.cover.color.value.map(function(val, i){
            delete config[`backgroundMask_cover_color_value_${i}`];
        });
        config.backgroundMask.cover.opacity = config.backgroundMask_cover_opacity;
        delete config.backgroundMask_cover_opacity;
        config.backgroundMask.enable = config.backgroundMask_enable;
        delete config.backgroundMask_enable;
        config.delay = {};
        config.delay.min = config.delay[0];
        config.delay.max = config.delay[1];
        config.duration = {};
        config.duration.min = config.duration[0];
        config.duration.max = config.duration[1];
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
        config.interactivity.events.onClick.mode = BackgroundConfig.interactivity.events.onClick.mode.map(function(mod, i){
            return config[`interactivity_events_onClick_mode_${i}`];
        });
        BackgroundConfig.interactivity.events.onClick.mode.map(function(mod, i){
            delete config[`interactivity_events_onClick_mode_${i}`];
        });
        config.interactivity.events.onDiv = {};
        config.interactivity.events.onDiv.enable = config.interactivity_events_onDiv_enable;
        delete config.interactivity_events_onDiv_enable;
        config.interactivity.events.onDiv.mode = BackgroundConfig.interactivity.events.onDiv.mode.map(function(mod, i){
            return config[`interactivity_events_onDiv_mode_${i}`];
        });
        BackgroundConfig.interactivity.events.onDiv.mode.map(function(mod, i){
            delete config[`interactivity_events_onDiv_mode_${i}`];
        });
        config.interactivity.events.onDiv.selectors = BackgroundConfig.interactivity.events.onDiv.selectors.map(function(sel, i){
            return config[`interactivity_events_onDiv_selectors_${i}`];
        });
        BackgroundConfig.interactivity.events.onDiv.selectors.map(function(sel, i){
            delete config[`interactivity_events_onDiv_selectors_${i}`];
        });
        config.interactivity.events.onDiv.type = config.interactivity_events_onDiv_type;
        delete config.interactivity_events_onDiv_type;
        config.interactivity.events.onHover = {};
        config.interactivity.events.onHover.enable = config.interactivity_events_onHover_enable;
        delete config.interactivity_events_onHover_enable;
        config.interactivity.events.onHover.mode = BackgroundConfig.interactivity.events.onHover.mode.map(function(mod, i){
            return config[`interactivity_events_onHover_mode_${i}`];
        });
        BackgroundConfig.interactivity.events.onHover.mode.map(function(mod, i){
            delete config[`interactivity_events_onHover_mode_${i}`];
        });
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
        config.interactivity.modes.bubble.color.value = BackgroundConfig.interactivity.modes.bubble.color.value.map(function(val, i){
            return config[`interactivity_modes_bubble_color_value_${i}`];
        });
        BackgroundConfig.interactivity.modes.bubble.color.value.map(function(val, i){
            delete config[`interactivity_modes_bubble_color_value_${i}`];
        });
        config.interactivity.modes.bubble.size = config.interactivity_modes_bubble_size;
        delete config.interactivity_modes_bubble_size;
        config.interactivity.modes.bubble.divs = {};
        config.interactivity.modes.bubble.divs.distance = config.interactivity_modes_bubble_divs_distance;
        delete config.interactivity_modes_bubble_divs_distance;
        config.interactivity.modes.bubble.divs.duration = config.interactivity_modes_bubble_divs_duration;
        delete config.interactivity_modes_bubble_divs_duration;
        config.interactivity.modes.bubble.divs.mix = config.interactivity_modes_bubble_divs_mix;
        delete config.interactivity_modes_bubble_divs_mix;
        config.interactivity.modes.bubble.divs.selectors = BackgroundConfig.interactivity.modes.bubble.divs.selectors.map(function(sel, i){
            return config[`interactivity_modes_bubble_divs_selectors_${i}`];
        });
        BackgroundConfig.interactivity.modes.bubble.divs.selectors.map(function(sel, i){
            delete config[`interactivity_modes_bubble_divs_selectors_${i}`];
        });
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
        config.interactivity.modes.light.area.gradient.start.value = BackgroundConfig.interactivity.modes.light.area.gradient.start.value.map(function(val, i){
            return config[`interactivity_modes_light_area_gradient_start_value_${i}`];
        });
        BackgroundConfig.interactivity.modes.light.area.gradient.start.value.map(function(val, i){
            delete config[`interactivity_modes_light_area_gradient_start_value_${i}`];
        });
        config.interactivity.modes.light.area.gradient.stop = {};
        config.interactivity.modes.light.area.gradient.stop.value = BackgroundConfig.interactivity.modes.light.area.gradient.stop.value.map(function(val, i){
            return config[`interactivity_modes_light_area_gradient_stop_value_${i}`];
        });
        BackgroundConfig.interactivity.modes.light.area.gradient.stop.value.map(function(val, i){
            delete config[`interactivity_modes_light_area_gradient_stop_value_${i}`];
        });
        config.interactivity.modes.light.area.radius = config.interactivity_modes_light_area_radius;
        delete config.interactivity_modes_light_area_radius;
        config.interactivity.modes.light.shadow = {};
        config.interactivity.modes.light.shadow.color = {};
        config.interactivity.modes.light.shadow.color.value = BackgroundConfig.interactivity.modes.light.shadow.color.value.map(function(val, i){
            return config[`interactivity_modes_light_shadow_color_value_${i}`];
        });
        BackgroundConfig.interactivity.modes.light.shadow.color.value.map(function(val, i){
            delete config[`interactivity_modes_light_shadow_color_value_${i}`];
        });
        config.interactivity.modes.light.shadow.length = config.interactivity_modes_light_shadow_length;
        delete config.interactivity_modes_light_shadow_length;
        config.interactivity.modes.push = {};
        config.interactivity.modes.push.default = config.interactivity_modes_push_default;
        delete config.interactivity_modes_push_default;
        config.interactivity.modes.push.groups = BackgroundConfig.interactivity.modes.push.groups.map(function(gro, i){
            return config[`interactivity_modes_push_groups_${i}`];
        });
        BackgroundConfig.interactivity.modes.push.groups.map(function(gro, i){
            delete config[`interactivity_modes_push_groups_${i}`];
        });
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
        config.interactivity.modes.repulse.divs.selectors = BackgroundConfig.interactivity.modes.repulse.divs.selectors.map(function(sel, i){
            return config[`interactivity_modes_repulse_divs_selectors_${i}`];
        });
        BackgroundConfig.interactivity.modes.repulse.divs.selectors.map(function(sel, i){
            delete config[`interactivity_modes_repulse_divs_selectors_${i}`];
        });
        config.interactivity.modes.pause = BackgroundConfig.interactivity.modes.pause;
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
        config.manualParticles = BackgroundConfig.manualParticles.map(function(mp, i){
            let obj = {};
            // obj.options = config[`manualParticles_${i}_options_show`] ? config[`manualParticles_${i}_options_show`] : null; //particles
            obj.options = BackgroundConfig.manualParticles[i].options ? BackgroundConfig.manualParticles[i].options : null;
            obj.position = config[`manualParticles_${i}_position_show`] ? config[`manualParticles_${i}_position_show`] : null;
            return obj;
        });
        BackgroundConfig.manualParticles.map(function(mp, i){
            // delete config[`manualParticles_${i}_options_show`];
            // delete config[`manualParticles_${i}_options`];
            delete config[`manualParticles_${i}_position_show`];
            delete config[`manualParticles_${i}_position`];
        });
        config.particles = {};
        config.particles.bounce = {};
        config.particles.bounce.horizontal = {};
        config.particles.bounce.horizontal.value = {};
        config.particles.bounce.horizontal.value.min = config.particles_bounce_horizontal_value[0];
        config.particles.bounce.horizontal.value.max = config.particles_bounce_horizontal_value[1];
        delete config.particles_bounce_horizontal_value;
        config.particles.bounce.vertical = {};
        config.particles.bounce.vertical.min = config.particles_bounce_vertical_value[0];
        config.particles.bounce.vertical.max = config.particles_bounce_vertical_value[1];
        delete config.particles_bounce_vertical_value;
        config.particles.collisions = {};
        config.particles.collisions.absorb = {};
        config.particles.collisions.absorb.speed = config.particles_collisions_absorb_speed;
        delete config.particles_collisions_absorb_speed;
        // config.particles.collisions.bounce = config.particles_collisions_bounce; //bounce
        config.particles.collisions.bounce = BackgroundConfig.particles.collisions.bounce;
        // delete config.particles_collisions_bounce;
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
        config.particles.color.value = BackgroundConfig.particles.color.value.map(function(val, i){
            return config[`particles_color_value_${i}`];
        });
        BackgroundConfig.particles.color.value.map(function(val, i){
            delete config[`particles_color_value_${i}`];
        });     
        // config.particles.groups = config.particles_groups; //particles
        config.particles.groups = BackgroundConfig.particles.groups;
        // delete config.particles_groups;
        // config.particles.interactivity = config.particles_interactivity_show ? config.particles_interactivity : null; //interactivity
        config.particles.interactivity = BackgroundConfig.particles.interactivity ? BackgroundConfig.particles.interactivity : null;
        // delete config.particles_interactivity_show;
        // delete config.particles_interactivity;
        config.particles.links = {};
        config.particles.links.blink = config.particles_links_blink;
        delete config.particles_links_blink;
        config.particles.links.color = {};
        config.particles.links.color.value = BackgroundConfig.particles.links.color.value.map(function(val, i){
            return config[`particles_links_color_value_${i}`];
        });
        BackgroundConfig.particles.links.color.value.map(function(val, i){
            delete config[`particles_links_color_value_${i}`];
        });
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
        config.particles.links.shadow.color.value = BackgroundConfig.particles.links.shadow.color.value.map(function(val, i){
            return config[`particles_links_shadow_color_value_${i}`];
        });
        BackgroundConfig.particles.links.shadow.color.value.map(function(val, i){
            delete config[`particles_links_shadow_color_value_${i}`];
        });
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
        config.particles.move.angle.offset = {};
        config.particles.move.angle.offset.min = config.particles_move_angle_offset[0];
        config.particles.move.angle.offset.max = config.particles_move_angle_offset[1];
        delete config.particles_move_angle_offset;
        config.particles.move.angle.value = {};
        config.particles.move.angle.value.min = config.particles_move_angle_value[0];
        config.particles.move.angle.value.max = config.particles_move_angle_value[1];
        delete config.particles_move_angle_value;
        config.particles.move.attract = {};
        config.particles.move.attract.distance = {};
        config.particles.move.attract.distance.min = config.particles_move_attract_distance[0];
        config.particles.move.attract.distance.max = config.particles_move_attract_distance[1];
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
        config.particles.move.decay = {};
        config.particles.move.decay.min = config.particles_move_decay[0];
        config.particles.move.decay.max = config.particles_move_decay[1];
        delete config.particles_move_decay;
        config.particles.move.direction = config.particles_move_direction;
        delete config.particles_move_direction;
        config.particles.move.distance = {};
        config.particles.move.distance.horizontal = config.particles_move_distance_horizontal;
        delete config.particles_move_distance_horizontal;
        config.particles.move.distance.vertical = config.particles_move_distance_vertical;
        delete config.particles_move_distance_vertical;
        config.particles.move.drift = {};
        config.particles.move.drift.min = config.particles_move_drift[0];
        config.particles.move.drift.max = config.particles_move_drift[1];
        delete config.particles_move_drift;
        config.particles.move.enable = config.particles_move_enable;
        delete config.particles_move_enable;
        config.particles.move.gravity = {};
        config.particles.move.gravity.acceleration = {};
        config.particles.move.gravity.acceleration.min = config.particles_move_gravity_acceleration[0];
        config.particles.move.gravity.acceleration.max = config.particles_move_gravity_acceleration[1];
        delete config.particles_move_gravity_acceleration;
        config.particles.move.gravity.enable = config.particles_move_gravity_enable;
        delete config.particles_move_gravity_enable;
        config.particles.move.gravity.inverse = config.particles_move_gravity_inverse;
        delete config.particles_move_gravity_inverse;
        config.particles.move.gravity.maxSpeed = {};
        config.particles.move.gravity.maxSpeed.min = config.particles_move_gravity_maxSpeed[0];
        config.particles.move.gravity.maxSpeed.max = config.particles_move_gravity_maxSpeed[1];
        delete config.particles_move_gravity_maxSpeed;
        config.particles.move.outModes = {};
        config.particles.move.outModes.bottom = config.particles_move_outModes_bottom_show ? config.particles_move_outModes_bottom : null;
        delete config.particles_move_outModes_bottom_show;
        delete config.particles_move_outModes_bottom;
        config.particles.move.outModes.default = config.particles_move_outModes_default;
        delete config.particles_move_outModes_default;
        config.particles.move.outModes.left = config.particles_move_outModes_left_show ? config.particles_move_outModes_left : null;
        delete config.particles_move_outModes_left_show;
        delete config.particles_move_outModes_left;
        config.particles.move.outModes.right = config.particles_move_outModes_right_show ? config.particles_move_outModes_right : null;
        delete config.particles_move_outModes_right_show;
        delete config.particles_move_outModes_right;
        config.particles.move.outModes.top = config.particles_move_outModes_top_show ? config.particles_move_outModes_top : null;
        delete config.particles_move_outModes_top_show;
        delete config.particles_move_outModes_top;
        config.particles.move.path = {};
        config.particles.move.path.clamp = config.particles_move_path_clamp;
        delete config.particles_move_path_clamp;
        config.particles.move.path.delay = {};
        config.particles.move.path.delay.value = {};
        config.particles.move.path.delay.value.min = config.particles_move_path_delay_value[0];
        config.particles.move.path.delay.value.max = config.particles_move_path_delay_value[1];
        delete config.particles_move_path_delay_value;
        config.particles.move.path.enable = config.particles_move_path_enable;
        delete config.particles_move_path_enable;
        config.particles.move.path.generator = config.particles_move_path_generator_show ? config.particles_move_path_generator : null;
        delete config.particles_move_path_generator_show;
        delete config.particles_move_path_generator;
        config.particles.move.path.options = config.particles_move_path_options;
        delete config.particles_move_path_options;
        config.particles.move.random = config.particles_move_random;
        delete config.particles_move_random;
        config.particles.move.size = config.particles_move_size;
        delete config.particles_move_size;
        config.particles.move.speed = {};
        config.particles.move.speed.min = config.particles_move_speed[0];
        config.particles.move.speed.max = config.particles_move_speed[1];
        delete config.particles_move_speed;
        config.particles.move.spin = {};
        config.particles.move.spin.acceleration = {};
        config.particles.move.spin.acceleration.min = config.particles_move_spin_acceleration[0];
        config.particles.move.spin.acceleration.max = config.particles_move_spin_acceleration[1];
        delete config.particles_move_spin_acceleration;
        config.particles.move.spin.enable = config.particles_move_spin_enable;
        delete config.particles_move_spin_enable;
        config.particles.move.spin.position = config.particles_move_spin_position_show ? config.particles_move_spin_position : null;
        delete config.particles_move_spin_position_show;
        delete config.particles_move_spin_position;
        config.particles.move.straight = config.particles_move_straight;
        delete config.particles_move_straight;
        config.particles.move.trail = {};
        config.particles.move.trail.enable = config.particles_move_trail_enable;
        delete config.particles_move_trail_enable;
        config.particles.move.trail.fill = {};
        config.particles.move.trail.fill.color = {};
        config.particles.move.trail.fill.color.value = BackgroundConfig.particles.move.trail.fill.color.value.map(function(val, i){
            return config.particles_move_trail_fill_color_show ? config[`particles_move_trail_fill_color_value_${i}`] : null;
        });
        BackgroundConfig.particles.move.trail.fill.color.value.map(function(val, i){
            delete config[`particles_move_trail_fill_color_value_${i}`];
        });
        config.particles.move.trail.fill.image = config.particles_move_trail_fill_image_show ? config.particles_move_trail_fill_image : null;
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
        config.particles.shadow.color.value = BackgroundConfig.particles.shadow.color.value.map(function(val, i){
            return config[`particles_shadow_color_value_${i}`];
        });
        BackgroundConfig.particles.shadow.color.value.map(function(val, i){
            delete config[`particles_shadow_color_value_${i}`];
        });
        config.particles.shadow.enable = config.particles_shadow_enable;
        delete config.particles_shadow_enable;
        config.particles.shadow.offset = config.particles_shadow_offset;
        delete config.particles_shadow_offset;
        config.particles.shape = {};
        config.particles.shape.options = BackgroundConfig.particles.shape.options.map(function(opt, i){
            let obj = {};
            obj.close = config[`particles_shape_options_${i}_close_show`] ? config[`particles_shape_options_${i}_close`] : null;
            obj.fill = config[`particles_shape_options_${i}_fill_show`] ? config[`particles_shape_options_${i}_fill`] : null;
            // obj.particles = config[`particles_shape_options_${i}_particles_show`] ? config[`particles_shape_options_${i}_particles`] : null; //paricles
            obj.particles = BackgroundConfig.particles.shape.options[0].particles ? BackgroundConfig.particles.shape.options[0].particles : null;
            obj.font = config.particles_shape_type_0 == "character" && config[`particles_shape_options_${i}_font_show`] ? config[`particles_shape_options_${i}_font`] : null;
            obj.style = config.particles_shape_type_0 == "character" && config[`particles_shape_options_${i}_style_show`] ? config[`particles_shape_options_${i}_style`] : null;
            obj.value = opt.value.map(function(val, j){
                return config.particles_shape_type_0 == "character" && config[`particles_shape_options_${i}_value_show`] ? config[`particles_shape_options_${i}_value_${j}`] : null;
            });
            obj.weight = config.particles_shape_type_0 == "character" && config[`particles_shape_options_${i}_weight_show`] ? config[`particles_shape_options_${i}_weight`] : null;
            obj.height = config.particles_shape_type_0 == "image" && config[`particles_shape_options_${i}_height_show`] ? config[`particles_shape_options_${i}_height`] : null;
            obj.replaceColor = config.particles_shape_type_0 == "image" && config[`particles_shape_options_${i}_replaceColor_show`] ? config[`particles_shape_options_${i}_replaceColor`] : null;
            obj.src = config.particles_shape_type_0 == "image" && config[`particles_shape_options_${i}_src_show`] ? config[`particles_shape_options_${i}_src`] : null;
            obj.width = config.particles_shape_type_0 == "image" && config[`particles_shape_options_${i}_width_show`] ? config[`particles_shape_options_${i}_width`] : null;
            obj.inset = config.particles_shape_type_0 == "star" && config[`particles_shape_options_${i}_inset_show`] ? config[`particles_shape_options_${i}_inset`] : null;
            obj.sides = (config.particles_shape_type_0 == "polygon" || config.particles_shape_type_0 == "star") && config[`particles_shape_options_${i}_sides_show`] ? config[`particles_shape_options_${i}_sides`] : null;
            return obj;
        });
        BackgroundConfig.particles.shape.options.map(function(opt, i){
            delete config[`particles_shape_options_${i}_close_show`];
            delete config[`particles_shape_options_${i}_close`];
            delete config[`particles_shape_options_${i}_fill_show`];
            delete config[`particles_shape_options_${i}_fill`];
            // delete config[`particles_shape_options_${i}_particles_show`];
            // delete config[`particles_shape_options_${i}_particles`];
            delete BackgroundConfig.particles.shape.options[0].particles;
            delete BackgroundConfig.particles.shape.options[0].particles;
            delete config[`particles_shape_options_${i}_font_show`];
            delete config[`particles_shape_options_${i}_font`];
            delete config[`particles_shape_options_${i}_style_show`];
            delete config[`particles_shape_options_${i}_style`];
            opt.value.map(function(val, j){
                delete config[`particles_shape_options_${i}_value_show`];
                delete config[`particles_shape_options_${i}_value_${j}`];
            });
            delete config[`particles_shape_options_${i}_weight_show`];
            delete config[`particles_shape_options_${i}_weight`];
            delete config[`particles_shape_options_${i}_height_show`];
            delete config[`particles_shape_options_${i}_height`];
            delete config[`particles_shape_options_${i}_replaceColor_show`];
            delete config[`particles_shape_options_${i}_replaceColor`];
            delete config[`particles_shape_options_${i}_src_show`];
            delete config[`particles_shape_options_${i}_src`];
            delete config[`particles_shape_options_${i}_width_show`];
            delete config[`particles_shape_options_${i}_width`];
            delete config[`particles_shape_options_${i}_inset_show`];
            delete config[`particles_shape_options_${i}_inset`];
            delete config[`particles_shape_options_${i}_sides_show`];
            delete config[`particles_shape_options_${i}_sides`];
        });
        config.particles.shape.type = BackgroundConfig.particles.shape.type.map(function(typ, i){
            return config[`particles_shape_type_${i}`];
        });
        BackgroundConfig.particles.shape.type.map(function(typ, i){
            delete config[`particles_shape_type_${i}`];
        });
        config.particles.size = {};
        config.particles.size.value = {};
        config.particles.size.value.min = config.particles_size_value[0];
        config.particles.size.value.max = config.particles_size_value[1];
        delete config.particles_size_value;
        config.particles.size.animation = {};
        config.particles.size.animation.destroy = config.particles_size_animation_destroy;
        delete config.particles_size_animation_destroy;
        config.particles.size.animation.startValue = config.particles_size_animation_startValue;
        delete config.particles_size_animation_startValue;
        config.particles.stroke = BackgroundConfig.particles.stroke.map(function(str, i){
            let obj = {};
            obj.color = {};
            obj.color.value = str.color.value.map(function(val, j){
                return config[`particles_stroke_${i}_color_value_${j}`];
            });
            obj.opacity = {};            
            obj.opacity.min = config[`particles_stroke_${i}_opacity_show`] ? config[`particles_stroke_${i}_opacity`][0] : null;
            obj.opacity.max = config[`particles_stroke_${i}_opacity_show`] ? config[`particles_stroke_${i}_opacity`][1] : null;
            obj.width = {};
            obj.width.min = config[`particles_stroke_${i}_width_show`] ? config[`particles_stroke_${i}_width`][0] : null;
            obj.width.max = config[`particles_stroke_${i}_width_show`] ? config[`particles_stroke_${i}_width`][1] : null;
            return obj;
        });
        BackgroundConfig.particles.stroke.map(function(str, i){
            str.color.value.map(function(val, j){
                delete config[`particles_stroke_${i}_color_value_${j}`];
            });
            delete config[`particles_stroke_${i}_opacity_show`];
            delete config[`particles_stroke_${i}_opacity`];
            delete config[`particles_stroke_${i}_width_show`];
            delete config[`particles_stroke_${i}_width`];
        });
        config.particles.zIndex = {};
        config.particles.zIndex.value = config.particles_zIndex_value;
        delete config.particles_zIndex_value;
        config.particles.zIndex.opacityRate = config.particles_zIndex_opacityRate;
        delete config.particles_zIndex_opacityRate;
        config.particles.zIndex.sizeRate = config.particles_zIndex_sizeRate;
        delete config.particles_zIndex_sizeRate;
        config.particles.zIndex.velocityRate = config.particles_zIndex_velocityRate;
        delete config.particles_zIndex_velocityRate;
        config.preset = BackgroundConfig.preset.map(function(pre, i){
            return config.preset_show ? config[`preset_${i}`] : null;
        });
        BackgroundConfig.preset.map(function(pre, i){
            delete config[`preset_${i}`];
        });
        config.responsive = BackgroundConfig.responsive.map(function(res, i){
            let obj = {};
            obj.maxWidth = config[`responsive_${i}_maxWidth`];
            obj.mode = config[`responsive_${i}_mode`];
            // obj.options = config[`responsive_${i}_options`]; //options
            obj.options = BackgroundConfig.responsive[i].options;
            return obj;
        });
        BackgroundConfig.responsive.map(function(res, i){
            delete config[`responsive_${i}_maxWidth`];
            delete config[`responsive_${i}_mode`];
            // delete config[`responsive_${i}_options`];
        });
        config.themes = BackgroundConfig.themes.map(function(the, i){
            let obj = {};
            obj.default = {};
            obj.default.auto = config[`themes_${i}_default_auto`];
            obj.default.mode = config[`themes_${i}_default_mode`];
            obj.default.value = config[`themes_${i}_default_value`];
            obj.name = config[`themes_${i}_name`];
            // obj.options = config[`themes_${i}_options_show`] ? config[`themes_${i}_options`] : null; //options
            obj.options = BackgroundConfig.themes[0].options ? BackgroundConfig.themes[0].options : null;
            return obj;
        });
        BackgroundConfig.themes.map(function(the, i){
            delete config[`themes_${i}_default_auto`];
            delete config[`themes_${i}_default_mode`];
            delete config[`themes_${i}_default_value`];
            delete config[`themes_${i}_name`];
            // delete config[`themes_${i}_options_show`];
            // delete config[`themes_${i}_options`];
        });

        //plugins
        config.canvasMask = BackgroundConfig.canvasMask;
        config.exportImage = BackgroundConfig.exportImage;
        config.exportJSON = BackgroundConfig.exportJSON;
        config.exportVideo = BackgroundConfig.exportVideo;
        config.infection = BackgroundConfig.infection;
        config.motion = BackgroundConfig.motion;
        config.polygon = BackgroundConfig.polygon;
        config.sounds = BackgroundConfig.sounds;
    }

    const particlesLoaded = useCallback(async function(container){
        // console.log("Particles initialized");
        useParticlesPanel(container.particles._array);
    }, []);

    useEffect(function(){
        if(particlesContainer.includes("404")){
            if(window.innerWidth <= 1080){
                config.particles.links.distance = 55;
                config.particles.move.speed.max = 0.25;
                config.particles.number.value = 60;
                config.polygon.move.radius = 2.5;
                config.polygon.url = "/src/img/404_small.svg";
                config.polygon.position.x = 15;
            }else{
                config.polygon.move.radius = 15;
                config.polygon.url = "/src/img/404.svg";
                config.polygon.position.x = 5;
            }
        }
    }, [particlesContainer, width, config]);

    return <>
        <Particles id={particlesContainer} particlesLoaded={particlesLoaded} options={config} />
    </>;
};
