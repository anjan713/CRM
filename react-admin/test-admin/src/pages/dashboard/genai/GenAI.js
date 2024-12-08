import CustomerDisplay from "customers/CustomerDisplay";
import React from "react";
import "./newcustomerscard.scss";
import { useAuthenticated, useGetList } from "react-admin";
import { Loading, Error } from "react-admin";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import API_BASE from "constants/API_BASE";

const GenAI = ({}) => {
  useAuthenticated();

  let month = new Date().getMonth();
  let url = API_BASE + "/orders/get_revenue_prediction/?month=" + month;

  const token = localStorage.getItem("access");
  const {
    isLoading,
    error,
    data: response,
    refetch,
  } = useQuery(`monthly-revenue-total`, () =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      const res = response.json();
      console.log(res);
      return res;
    })
  );
  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const amount = response?.predicted_total_monthly_revenue;

  return (
    <div className="card">
      <h3 className="title">Generate AI Insights - Total Monthly Revenue</h3>
      {/* <button onClick={refetch}>Refetch</button> */}
      <p>{amount}</p>
    </div>
  );
};

export default GenAI;
