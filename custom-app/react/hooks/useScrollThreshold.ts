import { useState, useEffect } from "react";

export function useScrollThreshold(threshold: number) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const willBeActive = window.scrollY > threshold;
            const willChange  = isActive != willBeActive;
            if(willChange) {
                setIsActive(willBeActive);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => { window.removeEventListener("scroll", handleScroll); };
    }, [isActive]);

    return { isActive };
}
