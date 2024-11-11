import Chart from 'charts/Chart';
import React from 'react';
import "./dashboard.scss";
import NewCustomersCard from './new-customers/NewCustomersCard';
import PendingOrders from './orders/PendingOrders';
import Widget from './widgets/Widget';
import { useAuthenticated } from 'react-admin';


const Dashboard = () => {
    useAuthenticated();

    return (
        <div className='dashboard'>
            <div className='widgets'>
                <Widget type="monthly-revenue" />
                <Widget type="new-orders" />
                <Widget type="out-for-delivery" />
                <Widget type="new-customers" />
            </div>
            <div className='below-widget'>
                <div className="left-column">
                    <Chart />
                    <PendingOrders />
                </div>
                <div className='right-column'>
                    <NewCustomersCard />
                </div>
            </div>
        </div>
    )
}

export default Dashboard