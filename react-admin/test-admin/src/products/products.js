import React from 'react';
import { Datagrid, DateField, List, TextField, Edit, SimpleForm, TextInput, Create, SelectInput, useRecordContext } from 'react-admin';

const categoryChoices = [
    { id: 'Head', name: 'Head' },
    { id: 'Block', name: 'Block' },
];

const productFilters = [
    <TextInput source='name' />,
    <SelectInput source='category' choices={categoryChoices} />

];

const ProductTitle = () => {
    const record = useRecordContext();

    return <span>{record ? record.name : ''}</span>
}

export const ProductList = () => (
    <List filters={productFilters} sx={{
        padding: 2
    }}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="category" />
            <TextField source="description" sortable={false} />
            <DateField source="date_created" sortable={false} />
        </Datagrid>
    </List>
);

export const ProductEdit = () => (
    <Edit title={<ProductTitle />}>
        <SimpleForm>
            <TextInput source="name" />
            <SelectInput source="category" choices={categoryChoices} />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const ProductCreate = () => (
    <Create redirect='list'>
        <SimpleForm>
            <TextInput source="name" />
            <SelectInput source="category" choices={[
                { id: 'Head', name: 'Head' },
                { id: 'Block', name: 'Block' },
            ]} />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);