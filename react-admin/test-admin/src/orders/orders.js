import ColoredTextField from 'fields/ColoredTextField';
import React from 'react';
import { Datagrid, DateField, List, ReferenceField, TextField, ReferenceInput, SelectInput, SimpleForm, TextInput, Create, NumberField, AutocompleteInput, DateInput } from 'react-admin';

const statusChoices =
    [
        { id: 'Pending', name: 'Pending' },
        { id: 'Out for delivery', name: 'Out for delivery' },
        { id: 'Delivered', name: 'Delivered' },
    ]
const statusPaymentChoices = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Payed', name: 'Payed' },
    { id: 'Cancelled', name: 'Cancelled' },

]
const orderFilters = [
    <ReferenceInput source="customerId" reference='customers' label='Customer' alwaysOn >
        <AutocompleteInput optionText="name" sx={{
            width: 300
        }} />
    </ReferenceInput>,
    <TextInput source="order_number" label='Order Number' />,
    <DateInput source='date_of_order' label='Date of Order' />,
    <SelectInput source='status' choices={statusChoices} alwaysOn />,
    <SelectInput source='status_payment' choices={statusPaymentChoices} />
]

export const OrderList = () => (
    <List filters={orderFilters} sx={{
        padding: 2
    }}>
        <Datagrid rowClick="edit">
            <DateField source="date_of_order" />
            <TextField source="order_number" />
            <NumberField source='num_items' label='No. of items' sortable={false} />
            <ReferenceField source="customerId" reference="customers"><TextField source="name" /></ReferenceField>
            <ColoredTextField source='status' />
            <ColoredTextField source='status_payment' label="Payment" />
            <NumberField source="amount" label='Total (&#x20B9;)' sx={{
                fontWeight: 'bold',
            }} />
        </Datagrid>
    </List>
);

export const OrderCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="order_number" fullWidth />
            <DateInput source="date_of_order" fullWidth />
            <SelectInput fullWidth source="status" choices={statusChoices} />
            <SelectInput fullWidth source="status_payment" choices={statusPaymentChoices} />
            <ReferenceInput source="customerId" reference="customers">
                <AutocompleteInput optionText="name" fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

