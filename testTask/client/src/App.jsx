import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import CompanyList from "./components/CompanyList/CompanyList";
import PriceTicker from "./components/PriceTicker/PriceTicker";
import TimeInterval from "./components/TimeInterval/TimeInterval";

import {
  setCompanysData,
  settrackCompanysData,
} from "./store/slices/companysSlice";

export const socket = io.connect("http://localhost:4000");

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.companysSlice.loading);

  useEffect(() => {
    socket.emit("initialCompanysInfo");
    socket.on("init", response => {
      const res = Array.isArray(response) ? response : [response];
      dispatch(setCompanysData(res));
    });
  }, []);
  useEffect(() => {
    if (loading) {
      socket.emit("start");
      socket.on("ticker", response => {
        const res = Array.isArray(response) ? response : [response];
        dispatch(settrackCompanysData(res));
      });
    }
  }, [loading]);
  return (
    <div className="container">
      <PriceTicker />
      <CompanyList />
      <TimeInterval />
    </div>
  );
};

export default App;
