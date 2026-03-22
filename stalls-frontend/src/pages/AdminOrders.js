import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import api from "../services/api";
import AdminTableWrapper from "../components/AdminTableWrapper";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try{

      const res = await api.get("/api/admin/orders");

      setOrders(res.data);

    }catch(e){
      console.log(e);
    }

  };

  return (
    <>

      <Typography variant="h5" mb={3}>
        Orders Live Monitor
      </Typography>

      <AdminTableWrapper>

        <Table>

          <TableHead>

            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>User</b></TableCell>
              <TableCell><b>Total</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {orders.map(o => (

              <TableRow
                hover
                key={o.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f5f9"
                  }
                }}
              >

                <TableCell>{o.id}</TableCell>

                {/* ⭐ FIX USERNAME */}
                <TableCell>
                  {o.user?.username || "Customer"}
                </TableCell>

                <TableCell>₹{o.total}</TableCell>

                <TableCell>{o.status}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </AdminTableWrapper>

    </>
  );
}

export default AdminOrders;