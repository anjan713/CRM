import React from "react";
import "./widget.scss";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useQuery } from "react-query";
import { Loading, Error } from "react-admin";
import API_BASE from "constants/API_BASE";

const Widget = ({ type }) => {
    let data;
    switch (type) {
        case "new-orders":
            data = {
                heading: "New Orders",
                isMoney: false,
                icon: <ShoppingCartIcon fontSize="large" />,
                endpoint: "/orders/get_pending_orders",
            };
            break;
        case "new-customers":
            data = {
                heading: "New Customers",
                isMoney: false,
                icon: <PersonAddIcon fontSize="large" />,
                endpoint: "/customers/get_new_customers",
            };
            break;
        case "out-for-delivery":
            data = {
                heading: "Out for Delivery",
                isMoney: false,
                icon: <LocalShippingIcon fontSize="large" />,
                endpoint: "/orders/get_out_orders",
            };
            break;
        case "monthly-revenue":
            data = {
                heading: "Monthly Revenue",
                isMoney: true,
                icon: <AttachMoneyIcon fontSize="large" />,
                endpoint: '/orders/get_monthly_revenue/',
            };
            break;
        default:
            break;
    }
    let url = API_BASE + data.endpoint;

    const token = localStorage.getItem("access");
    const {
        isLoading,
        error,
        data: response,
    } = useQuery(`widget-${type}`, () =>
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const res = response.json();
            return res;
        })
    );
    if (isLoading) return <Loading />;
    if (error) return <Error />;

    const amount = response.total;

    return (
        <div className="widget">
            <div className="left">
                <div className="icon">{data.icon}</div>
            </div>
            <div className="right">
                <h3 className="title">{data.heading}</h3>
                <span className="counter">
                    {data.isMoney && <span>&#x20B9;</span>}
                    {amount}
                </span>
            </div>
        </div>
    );
};

export default Widget;
