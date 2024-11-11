import React from 'react';
import { Stack } from '@mui/material';
import { Create, Datagrid, Edit, EmailField, FileInput, ImageField, ImageInput, List, SimpleForm, TextField, TextInput, WrapperField } from 'react-admin';
import CustomerProfilePic from 'fields/CustomerProfilePic';

const customerFilters = [
    <TextInput source='name' />,
    <TextInput source='company' />,
    <TextInput source='location' />,
    <TextInput source='email' />,
    <TextInput source='position' />,
    <TextInput source='phone' />,
]

export const CustomerList = () => (
    <List filters={customerFilters} sx={{
        padding: 2
    }}>
        <Datagrid rowClick="edit">
            <WrapperField label="Customer" sortable={false}>
                <Stack direction='row' alignItems='center' gap={2}>
                    <CustomerProfilePic source='profile' />
                    <TextField source="name" />
                </Stack>
            </WrapperField>
            <TextField source="company" />
            <TextField source="location" />
            <TextField source="position" sortable={false} />
            <TextField source="phone" sortable={false} />
            <EmailField source="email" sortable={false} />
            <TextField source="count_total_orders" label="Total Orders" sortable={false} />
            <TextField source="count_total_spent" label="Total Revenue (&#x20B9;)" sortable={false} />
        </Datagrid>
    </List>
);

export const CustomerEdit = () => (
    <Edit title={<CustomerProfilePic source='profile' />}>
        <SimpleForm>
            <Stack direction='row' width="100%" gap={10}>
                <Stack flex={1}>
                    <TextInput source="name" fullWidth />
                    <TextInput source="phone" fullWidth />
                    <TextInput source="email" fullWidth />
                </Stack>
                <Stack flex={2} justifyContent='flex-end'>
                    <TextInput source="company" fullWidth />
                    <TextInput source="location" fullWidth />
                    <TextInput source="position" fullWidth />
                </Stack>

            </Stack>
        </SimpleForm>
    </Edit>
);

export const CustomerCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <Stack direction='row' width="100%" gap={10}>
                <Stack flex={1}>
                    <TextInput source="name" fullWidth />
                    <TextInput source="phone" fullWidth />
                    <TextInput source="email" fullWidth />
                </Stack>
                <Stack flex={2} justifyContent='flex-end'>
                    <TextInput source="company" fullWidth />
                    <TextInput source="location" fullWidth />
                    <TextInput source="position" fullWidth />
                </Stack>

            </Stack>
        </SimpleForm>
    </Create>
);