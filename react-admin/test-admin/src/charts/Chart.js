import React, { useEffect } from 'react';
import "./chart.scss";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import API_BASE from 'constants/API_BASE';
import { useQuery } from 'react-query';
import { Loading, Error, Menu, useGetOne } from 'react-admin';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const fetchMonthyRevenue = (month) => {
    let url = API_BASE + '/orders/get_monthly_revenue_history/?';
    const token = localStorage.getItem('access');
    return fetch(url + new URLSearchParams({
        month: month,
    }), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json().then(data => data));
}

const Chart = () => {
    let selectedMonth = new Date().getMonth() + 1;
    const [monthSelected, setMonthSelected] = React.useState(selectedMonth.toString());

    const handleChange = (event) => {
        setMonthSelected(prev => event.target.value);
        selectedMonth = event.target.value;
        refetch();
    };

    const { isLoading, error, data, refetch } = useQuery('monthly-revenue', () => fetchMonthyRevenue(selectedMonth));

    if (isLoading) return <Loading />;
    if (error) return <Error />;

    return (

        <div className="chart">
            <div className='header'>
                <div className="title">30 Day Revenue History</div>
                <div className="monthSelect">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={monthSelected}
                            label="Month"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>February</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
                <AreaChart width={730} height={250} data={data.revenue_history}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke='gray' />
                    <YAxis dataKey="total" stroke='gray' />
                    <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart