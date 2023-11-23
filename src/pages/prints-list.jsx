import { useState, useContext } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { StoreContext } from "../providers/storeProvider";
import Link from "next/link";
import Cart from "../svg/Cart";
import Switch from "../svg/Switch";
import { shuffle } from "../helpers";
import prints from "../data/prints/prints.json";
import { getPrintsData } from '../helpers/printsData'

import Header from "../components/Header";

import { useWindowSize } from "../helpers/useWindowSize";

const PrintsList = props => {
  const [store, setStore] = useContext(StoreContext);
  const { t } = useTranslation();
  const { products } = props;
  console.log(products)

  return (
    <div className="print-list-container">
      <Header
        title={t("megacities")}
        tagline={t("compositeCountryPortraits")}
        about={t("about")}
        series={t("series")}
        prints={t("prints")}
        contact={t("contact")}
      />
      <div className="prints-selction-container">
        <h1 className="prints-title">
          <span>A1</span> {t("prints", { ns: "prints" })}
        </h1>
        <ol className="prints-list">
          <li>{t("editionOf500", { ns: "prints" })}</li>
          <li>{t("printedOn250gmMattePaper", { ns: "prints" })}</li>
          <li>{t("signedAndNumbered", { ns: "prints" })}</li>
        </ol>
        {store.printSelection.length > 0 && (
          <Link href="/checkout" className="cart-container">
            <p>{store.printSelection.length}</p>
            <Cart />
          </Link>
        )}
        {/* <Link className="prints-select-view" href="/prints">
          <Switch />
          <p>{t("galleryView", { ns: "prints" })}</p>
        </Link> */}
        <div className="prints-list-selection-container">
          {/* {props.shuffledPrints.map((print, i) => {
            <div className="prints-list-selection" key={i}>
              {print.name}
            </div>
          })} */}
        </div>
      </div>
    </div>
  );
};

export default PrintsList;

export async function getStaticProps({ locale = "en" }) {
  const { data: products } = await getPrintsData()

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "prints"])),
      products: products
    },
  };
}
