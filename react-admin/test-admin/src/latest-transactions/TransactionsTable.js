import React from 'react'
import "./transactionstable.scss";
import { useGetList } from 'react-admin';


const TransactionsTable = () => {
    const { data, total, isLoading, error } = useGetList(
        'transactions',
        {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'date_of_transaction', order: 'DESC' }
        }
    );
    return (
        <div className='table-striped'>
            <h1 className='title'>Last 10 Transactions</h1>
            <table className='table'>
                <thead>
                    <th>Customer</th>
                    <th>Order</th>
                    <th>Date of transaction</th>
                    <th>Status</th>
                </thead>
            </table>
        </div>
    )
}

export default TransactionsTable