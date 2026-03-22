import React,{useEffect,useState} from "react";

import {
Box,Typography,Paper,Table,
TableHead,TableRow,TableCell,
TableBody
} from "@mui/material";

import {
BarChart,Bar,
XAxis,YAxis,
Tooltip,
ResponsiveContainer,
LineChart,Line
} from "recharts";

import api from "../services/api";

function AdminRevenue(){

const [data,setData]=useState([]);

useEffect(()=>{
load();
},[]);

const load = async ()=>{

const res =
await api.get("/api/admin/revenue");

setData(res.data);

};

/* PROFIT DATA FOR CHART */

const profitData =
data.map(d=>({
stall:d.stall,
profit:d.commission,
vendorRevenue:d.revenue - d.commission
}));

return(

<Box>

<Typography variant="h5" mb={3}>
Revenue Analytics
</Typography>

<Paper sx={{p:4,borderRadius:4}}>

<Table>

<TableHead>
<TableRow>
<TableCell>Stall</TableCell>
<TableCell>Total Revenue</TableCell>
<TableCell>Commission (10%)</TableCell>
<TableCell>Platform Profit</TableCell>
</TableRow>
</TableHead>

<TableBody>

{data.map((r,i)=>{

return(
<TableRow key={i}>

<TableCell>{r.stall}</TableCell>

<TableCell>
₹{r.revenue}
</TableCell>

<TableCell>
₹{r.commission}
</TableCell>

<TableCell>
₹{r.commission}
</TableCell>

</TableRow>
);

})}

</TableBody>

</Table>

</Paper>


{/* BAR CHART */}

<Typography variant="h5" mb={3} mt={4}>
Revenue per Stall
</Typography>

<Paper sx={{p:4,borderRadius:4,mb:4}}>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={data}>

<XAxis dataKey="stall"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="revenue" name="Revenue"/>

<Bar dataKey="commission" name="Commission"/>

</BarChart>

</ResponsiveContainer>

</Paper>


{/* PROFIT CHART */}

<Typography variant="h5" mb={3}>
Platform Profit Analysis
</Typography>

<Paper sx={{p:4,borderRadius:4}}>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={profitData}>

<XAxis dataKey="stall"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="profit"
name="Platform Profit"
/>

<Line
type="monotone"
dataKey="vendorRevenue"
name="Vendor Revenue"
/>

</LineChart>

</ResponsiveContainer>

</Paper>

</Box>

);

}

export default AdminRevenue;