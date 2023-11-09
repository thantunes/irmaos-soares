import React from "react";
import styles from "./styles.css";
import useProduct from "vtex.product-context/useProduct";
// import Installments from "vtex.product-price/Installments";
import { useScrollThreshold } from "../../hooks/useScrollThreshold";
import css_class from "../../utils/css_class";
// import elementHeight from "../../utils/elementHeight";
import formatPrice from "../../utils/formatPrice";
import { Wrapper as AddToCart } from "vtex.add-to-cart-button";
import useResponsiveValidator from "../../hooks/useResponsiveValidator";

function ProductFixedBuy(): JSX.Element {
    const { selectedItem } = useProduct();
    const isDesktop = useResponsiveValidator({ type: "min", width: "desktop" });
    const { isActive } = useScrollThreshold(500);


    if (!(isActive)) return <></>;

    const classNames = {
        wrapper: css_class(
            styles.fixedBuy_wrapper,
            isActive ? styles.fixedBuy_active : "",
            isDesktop ? "" : styles.fixedBuy_isMobile
        ),
        content: styles.fixedBuy_content,
        imageWrapper: styles.fixedBuy_image_wrapper,
        image: styles.fixedBuy_image,
        infoWrapper: styles.fixedBuy_infoWrapper,
        productName: styles.fixedBuy_productName,
        priceContainer: styles.fixedBuy_priceContainer,
        precoDe: styles.fixedBuy_precoDe,
        precoPor: styles.fixedBuy_precoPor,
        buyWrapper: styles.fixedBuy_buyWrapper,
        selectedProductWrapper: styles.fixedBuy_selectedProductWrapper,
    };


    const prices = {
        de: formatPrice(selectedItem.sellers[0].commertialOffer.ListPrice),
        por: formatPrice(selectedItem.sellers[0].commertialOffer.Price),
    };

    return (
        <section className={classNames.wrapper}>
            <div className={classNames.content}>
                <div className={classNames.selectedProductWrapper}>
                    <div className={classNames.imageWrapper}>
                        <img
                            src={selectedItem.images[0].imageUrl}
                            className={classNames.image}
                        />
                    </div>
                    <div className={classNames.infoWrapper}>
                        <span className={classNames.productName}>
                            {selectedItem.name}
                        </span>

                        <div className={classNames.priceContainer}>
                            <span className={classNames.precoDe}>
                                {prices.de == prices.por ? "" : prices.de}
                            </span>
                            <span className={classNames.precoPor}>
                                {prices.por}
                            </span>
                            {/* <Installments message={"ou {installmentsNumber}x de {installmentValue}{hasInterest, select, true {, {interestRate} com juros} false { sem juros}}"}/> */}
                        </div>
                    </div>
                </div>

                <div className={classNames.buyWrapper}>
                    <AddToCart isOneClickBuy={false} text={"COMPRE AGORA"} />
                </div>
            </div>
        </section>
    );
}

export default ProductFixedBuy;
