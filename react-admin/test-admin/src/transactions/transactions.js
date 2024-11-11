import { ChipField, Create, Datagrid, DateField, DateInput, Edit, EditButton, List, NumberField, ReferenceField, ReferenceInput, SelectInput, Show, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import React from 'react';
import { useTheme } from '@mui/material';
import ColoredChipField from 'fields/ColoredChipField';
import ColoredTextField from 'fields/ColoredTextField';

const statusChoices = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Payed', name: 'Payed' },
    { id: 'Cancelled', name: 'Cancelled' },
]

export const TransactionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <DateField source="date_of_transaction" />
            <ReferenceField source="orderId" reference="orders"><TextField source="order_number" /></ReferenceField>
            <ColoredTextField source='status' />
            <ReferenceField source="orderId" reference="orders" link={false} label="Amount (&#x20B9;)"><NumberField source="amount" sx={{
                fontWeight: 'bold',
            }} /></ReferenceField>
        </Datagrid>
    </List>
);


export const TransactionEdit = () => (
    <Edit>
        <SimpleForm>
            <DateInput source="date_of_transaction" />
            <SelectInput source="status" choices={statusChoices} />
            <ReferenceInput source="orderId" reference="orders"><SelectInput optionText="order_number" optionValue='id' /></ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const TransactionCreate = () => (
    <Create>
        <SimpleForm>
            <DateInput source="date_of_transaction" />
            <SelectInput source="status" choices={statusChoices} />
            <ReferenceInput source="orderId" reference="orders"><SelectInput optionText="order_number" optionValue='id' /></ReferenceInput>
        </SimpleForm>
    </Create>
);