import "./widget.scss";
import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useQuery } from 'react-query';
import { Loading, Error } from 'react-admin';
import API_BASE from "constants/API_BASE";

const Widget = ({ type }) => {
    let widgetData;
    switch (type) {
        case 'total-orders':
            widgetData = {
                title: 'TOTAL ORDERS',
                isMoney: false,
                link: 'See all orders',
                icon: <ShoppingCartOutlinedIcon className="icon" style={{
                    backgroundColor: "#f5e5bd",
                    color: "goldenrod",
                }} />,
                url: '/orders/get_total_orders/'
            }
            break;
        case 'customers':
            widgetData = {
                title: 'CUSTOMERS',
                isMoney: false,
                link: 'See all customers',
                icon: <PersonOutlineOutlinedIcon className="icon" style={{
                    backgroundColor: '#ff9999',
                    color: 'red',
                }} />,
                url: '/customers/get_total_customers/'

            }
            break;
        case 'pending-orders':
            widgetData = {
                title: 'PENDING ORDERS',
                isMoney: false,
                link: 'See all pending orders',
                icon: <PendingActionsIcon className="icon" style={{
                    color: '#0000ff',
                    backgroundColor: '#9999ff'
                }} />,
                url: '/orders/get_pending_orders/'
            }
            break;
        case 'delivered-orders':
            widgetData = {
                title: 'DELIVERED ORDERS',
                isMoney: false,
                link: 'See all delivered orders',
                icon: <DeliveryDiningIcon className="icon" style={{
                    color: '#ffa64d',
                    backgroundColor: '#ffd9b3'
                }} />,
                url: '/orders/get_completed_orders/'

            }
            break;
        default:
            break;
    }

    const url = API_BASE + widgetData.url;
    console.log('URL', url);

    const { isLoading, error, data } = useQuery(`widget-${type}`, () =>
        fetch(url).then((response) => {
            const res = response.json();
            return res;
        })
    );


    if (isLoading) return <Loading />;
    if (error) return <Error />;

    const amount = data.total
    const diff = -10;

    if (diff >= 0) {
        // @ts-ignore
        widgetData.percentageType = 'positive';
    } else {
        // @ts-ignore
        widgetData.percentageType = 'negative';
    }


    return (
        <div className="widget">
            <div className="left">
                <span className="title">{widgetData.title}</span>
                <span className="counter">{widgetData.isMoney && <CurrencyRupeeOutlinedIcon />} {amount} </span>
                <span className="link">{widgetData.link}</span>
            </div>
            <div className="right">
                {/* @ts-ignore */}
                <div className={`percentage ${widgetData.percentageType}`}>
                    {/* @ts-ignore */}
                    {widgetData.percentageType === 'positive' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    {Math.abs(diff)}%
                </div>
                {widgetData.icon}
            </div>
        </div >
    )
}

export default Widget