import React from 'react'
import './pendingOrders.scss';
import { Loading, Error, useGetList, useAuthenticated } from 'react-admin';
import PendingOrder from './PendingOrder';

const PendingOrders = () => {
    useAuthenticated();

    const { data: orders, total, isLoading, error, isError } = useGetList(
        'orders',
        {
            sort: { field: 'date_of_order', order: 'DESC' },
            filter: { "status": "Pending" },
        }
    );


    if (isLoading) return <Loading />;
    if (isError) return <Error error={error} />

    return (
        <div className='pending-orders'>
            <h3 className='title'>Pending Orders</h3>
            {orders.map(order =>
                <PendingOrder order={order} key={order.order_number} />
            )}
        </div>
    )
}

export default PendingOrders