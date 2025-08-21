import React from "react";
import styles from "./styles.css";

//@ts-ignore
import useProduct from "vtex.product-context/useProduct";
import formatPrice from "../../utils/formatPrice";
import { Product } from "vtex.product-context/react/ProductTypes";
// import Installments from "vtex.product-price/Installments";

const CustomParcelamento: StorefrontFunctionComponent<Product> = () => {
    const { product } = useProduct();

    if (!product)   return null;

    const categoryId = product?.categoryId;
    const preco = product?.items[0].sellers[0].commertialOffer.Price;

    // juros de 11,90% no valor do produto, 2 casas decimais
    const precoJuros =  (parseFloat(preco) * 1.119).toFixed(2);
    const precoJurosReal = parseFloat(precoJuros);

    if (categoryId && categoryId == "101")  return <p className={`${styles.parcelamentoIS}`}></p>;

    // Check if product is in category 184 or if it is in cluster 139, 142 or 143
    if (categoryId === "184" || product?.productClusters.some((cluster: { id: string; }) => cluster.id === "142" || cluster.id === "143")) {
        return  (
            <p className={`${styles.parcelamentoIS}`} >ou <b>{formatPrice(precoJurosReal)}</b> em até <b>10x iguais no cartão</b></p>
        )
    }
    return <p className={`${styles.parcelamentoIS}`}>ou <b>{formatPrice(preco)}</b> em até <b>10x</b> sem juros</p>
    // return <Installments message={"ou {installmentsNumber}x de {installmentValue}{hasInterest, select, true {, {interestRate} com juros} false { sem juros}}"}/>
}

export default CustomParcelamento;
