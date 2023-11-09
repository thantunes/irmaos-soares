import { useState, useEffect } from "react";
import CrossSellingService from "../services/CrossSellingRestService";
import { ICrossSellingService, IProducts } from "../services/ICrosselingService";

const crossSellingService: ICrossSellingService = new CrossSellingService();


export function useSimilar() {
    const [products, setProducts] = useState<null | IProducts[]>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getSimilars() {
            setLoading(true);
            const prodcuts = await crossSellingService.similars("1");
            setLoading(false);
            setProducts(prodcuts);

        }

        getSimilars();
    }, [crossSellingService]);

    return [products, loading];
}
