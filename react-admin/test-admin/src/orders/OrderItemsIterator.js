import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { TextField, useListContext } from 'react-admin';
import { ReferenceField } from 'react-admin';

const OrderItemsIterator = () => {
    const { data, isLoading } = useListContext();

    if (isLoading) return null;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <h3>Product</h3>
                    </TableCell>
                    <TableCell>
                        <h3>Quantity</h3>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(row => (
                    <TableRow>
                        <TableCell>
                            <ReferenceField source={row.productId} reference='products' link={false}>
                                <TextField source='name' />
                            </ReferenceField>
                        </TableCell>
                        <TableCell>
                            {row.qty}
                        </TableCell>
                    </TableRow>
                )

                )}
            </TableBody>
        </Table>
    )
}

export default OrderItemsIterator