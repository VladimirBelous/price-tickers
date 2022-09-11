import React from "react";
import { useSelector } from "react-redux";

import Company from "../Company/Company";

import styles from "./PriceTicker.module.scss";

const PriceTicker = () => {
  const data = useSelector(state => state.companysSlice.trackCompanyList);

  return (
    <div className={styles.priceTicker}>
      {data &&
        data.map((item, index) => {
          return <Company type="priceTicker" data={item} key={index} />;
        })}
    </div>
  );
};

export default PriceTicker;
