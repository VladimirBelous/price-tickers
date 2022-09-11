import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { socket } from "../../App";
import {
  addToList,
  deleteFromList,
  setLoading,
} from "../../store/slices/companysSlice";

import styles from "./Company.module.scss";

const Company = ({ type, data }) => {
  const { ticker, name, price, change, change_percent, glow } = data;

  const dispatch = useDispatch();

  const [tracked, setTracked] = useState(false);

  const addCompamyToTrack = () => {
    socket.emit("addCompanyToTrack", { ticker: ticker, name: name });
    dispatch(setLoading(true));
    dispatch(addToList(data));
    setTracked(true);
  };

  const deleteCompamyFromTrack = () => {
    socket.emit("deleteCompanyFromTrack", name);
    dispatch(deleteFromList(name));
    setTracked(false);
  };

  if (type === "companyList") {
    return (
      <div className={styles.company}>
        <span className={styles.ticker}>{ticker}</span>
        <span className={styles.name}>{name}</span>
        {tracked ? (
          <button className={styles.button} onClick={deleteCompamyFromTrack}>
            -
          </button>
        ) : (
          <button className={styles.button} onClick={addCompamyToTrack}>
            +
          </button>
        )}
      </div>
    );
  } else if (type === "priceTicker") {
    if (glow === "green") {
      return (
        <div className={`${styles.priceTicker} ${styles.priceTickerGreen}`}>
          <div className={`${styles.arrow} ${styles.arrowGreen}`}> &uarr;</div>
          <div className={styles.priceAndticker}>
            <span className={styles.ticker}>{ticker}</span>
            <span className={styles.price}>{price}</span>
          </div>
          <div className={styles.changePercentAndChange}>
            <span
              className={`${styles.change_percent} ${styles.change_percentGreen}`}
            >
              +{change_percent} %
            </span>
            <span className={`${styles.change} ${styles.changeGreen}`}>
              +{change}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.priceTicker}>
          <div className={`${styles.arrow} ${styles.arrowRed}`}> &darr;</div>
          <div className={styles.priceAndticker}>
            <span className={styles.ticker}>{ticker}</span>
            <span className={styles.price}>{price}</span>
          </div>
          <div className={styles.changePercentAndChange}>
            <span className={styles.change_percent}>-{change_percent} %</span>
            <span className={styles.change}>-{change}</span>
          </div>
        </div>
      );
    }
  }
};

export default Company;
