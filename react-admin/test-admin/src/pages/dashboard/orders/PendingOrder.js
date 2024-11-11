import React from 'react'
import { Link, Loading, useReference } from 'react-admin'

const PendingOrder = ({ order }) => {
    const { referenceRecord: customer, isLoading } = useReference({
        reference: 'customers',
        id: order.customerId,
    });
    if (isLoading) return <Loading />;
    return (
        <Link to={`/orders/${order.id}`}>
            <div className='order-item'>
                <div className='user-details'>
                    <img alt='customer profile' src={customer.profile ?? 'images/blank-profile.webp'} />
                    <div className='order-details'>
                        <span>{new Date(order.date_of_order).toLocaleDateString('en-GB')}</span>
                        <div className='user-info'>by&nbsp;{customer.name},&nbsp;
                            {order.num_items === 0 && 'none'}
                            {order.num_items === 1 && 'one item'}
                            {order.num_items > 1 && order.num_items + ' items'}
                        </div>
                    </div>
                </div>
                <div className='amount'>
                    &#8377;{order.amount}
                </div>
            </div>
        </Link>
    )
}

export default PendingOrder