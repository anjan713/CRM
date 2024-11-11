import CustomerDisplay from 'customers/CustomerDisplay';
import React from 'react'
import "./newcustomerscard.scss";
import { useAuthenticated, useGetList } from 'react-admin';
import { Loading, Error } from 'react-admin';
import { Link } from 'react-router-dom';



const NewCustomersCard = () => {
    useAuthenticated();

    const { data, isLoading, isError, error } = useGetList('customers', {
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'date_created', order: 'DESC' },
    });



    if (isLoading) return <Loading />;
    if (isError) return <Error error={error} />;
    return (
        <div className='card'>
            <h3 className='title'>Recent Customers</h3>
            <div className='customer-names'>
                {Array.isArray(data) && data.map(customer =>
                    <li key={customer.name}>
                        <Link to={`/customers/${customer.id}`}>
                            <CustomerDisplay name={customer.name} picURL={customer.profile ?? "images/blank-profile.webp"} />
                        </Link>
                    </li>)}
            </div>
            <Link to="/customers" className='see-all'><span>See all customers</span></Link>

        </div>
    )
}

export default NewCustomersCard