import React from 'react'
import { Edit, useRecordContext, SimpleForm, TextInput, SelectInput, ReferenceInput, ReferenceManyField, NumberField, Datagrid, TextField, EditButton, ReferenceField, NumberInput } from 'react-admin';
import AddNewOrderItem from './AddNewOrderItem';
import "./orderEdit.scss";

const OrderEdit = () => {


    const OrderTitle = () => {
        const record = useRecordContext();

        return <span>Order {record ? `${record.order_number}` : ''}</span>
    }

    return (
        <Edit title={< OrderTitle />}>

            <SimpleForm>

                <TextInput source="order_number" fullWidth />
                <SelectInput fullWidth source="status" choices={[
                    { id: 'Pending', name: 'Pending' },
                    { id: 'Out for delivery', name: 'Out for delivery' },
                    { id: 'Delivered', name: 'Delivered' },
                ]} />
                <SelectInput fullWidth source="status_payment" choices={[
                    { id: 'Pending', name: 'Pending' },
                    { id: 'Payed', name: 'Payed' },
                    { id: 'Cancelled', name: 'Cancelled' },

                ]} />
                <ReferenceInput source="customerId" reference="customers">
                    <SelectInput optionText="name" fullWidth />
                </ReferenceInput>
                <NumberInput source="amount" label="Total" fullWidth />

                <div className='itenary'>
                    <h3 className='title'>Itenary</h3>
                    <div className='datagrid'>
                        <ReferenceManyField label="Itenary" reference='product-quantity' target='orderId'>
                            <Datagrid >
                                <ReferenceField source='productId' reference='products' link={false}>
                                    <TextField source='name' fullWidth />
                                </ReferenceField>
                                <NumberField source='qty' fullWidth />
                                <EditButton />
                            </Datagrid>
                        </ReferenceManyField>
                    </div>
                    <div className="btn">
                        <AddNewOrderItem />
                    </div>
                </div>
            </SimpleForm>
        </Edit >
    )
}

export default OrderEdit