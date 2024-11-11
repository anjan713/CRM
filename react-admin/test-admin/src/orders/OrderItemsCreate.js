import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm } from 'react-admin';
import React from 'react';
import "./orderlineitemsedit.scss";
import { useLocation } from 'react-router';


const OrderLineItemsEdit = () => {

    const location = useLocation();
    const order_id =
        location.state && location.state.record
            ? location.state.record.orderId
            : undefined;

    const redirect = order_id ? `/orders/${order_id}` : false
    console.log(redirect);

    return (

        <Create redirect={redirect}>
            <SimpleForm>
                <div className="order-items">
                    <div className='product'>
                        <ReferenceInput source="productId" reference="products"><SelectInput optionText="name" fullWidth /></ReferenceInput>
                    </div>
                    <div className='qty'>
                        <NumberInput source="qty" defaultValue={0} fullWidth />
                    </div>
                </div>

            </SimpleForm>
        </Create>
    )
};
export default OrderLineItemsEdit;