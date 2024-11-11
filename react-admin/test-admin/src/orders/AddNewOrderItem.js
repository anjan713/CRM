// @ts-nocheck
import React from 'react'
import { useRecordContext } from 'react-admin';
import { Button, Link } from "react-admin";

const AddNewOrderItem = () => {
    const record = useRecordContext();
    return (
        <Button variant='contained' size='large' sx={{
            my: (theme) => theme.spacing(3)
        }} component={Link} to={{
            pathname: '/product-quantity/create',
            state: { record: { orderId: record.id } }
        }}
            label="Add new order item">

        </Button>

    )
}

export default AddNewOrderItem;