import Chart from '../../charts/Chart';
import Featured from '../../featured/Featured';
import React from 'react'
import Widget from '../../widget/Widget';
import "./home.scss";
import TransactionsTable from 'latest-transactions/TransactionsTable';


const Home = () => {


    return (
        <div className="home">
            <div className="widgets">
                <Widget type='total-orders' />
                <Widget type='pending-orders' />
                <Widget type='delivered-orders' />
                <Widget type='customers' />
            </div>
            <div className='charts'>
                <Featured />
                <Chart />
            </div>
            <div className='transactions'>
                <TransactionsTable />
            </div>

        </div>
    )
}

export default Home