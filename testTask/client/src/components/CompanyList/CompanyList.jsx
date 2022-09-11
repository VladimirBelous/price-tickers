import React from "react";
import { useSelector } from "react-redux";

import Company from "../Company/Company";

import styles from "./CompanyList.module.scss";

const CompanyList = () => {
  const data = useSelector(state => state.companysSlice.companyData);
  return (
    <div className={styles.companyList}>
      <div className={styles.title}>Choose company to track</div>
      {data &&
        data.map((item, index) => {
          return (
            <Company type="companyList" index={index} data={item} key={index} />
          );
        })}
    </div>
  );
};

export default CompanyList;
