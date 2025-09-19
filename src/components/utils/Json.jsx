import { useState, useEffect } from "react";

export function useFetchJson(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function(){
        let active = true;

        async function load() {
            setLoading(true);
            setError(null);
            try{
                const res = await fetch(url);
                if(!res.ok){
                    throw new Error("HTTP error " + res.status);
                }
                const json = await res.json();
                if(active){
                    setData(json);
                }
            }catch(err){
                if(active){
                    setError(err);
                }
            }finally{
                if(active){
                    setLoading(false);
                }
            }
        }

        load();

        return function(){
            active = false;
        };
    }, [url]);

    return { data, loading, error };
}
