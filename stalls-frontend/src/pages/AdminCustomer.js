import React, { useEffect, useState } from "react";
import {
//   Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";
import api from "../services/api";
// import Layout from "../components/Layout";

function AdminVendors() {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const response = await api.get("/api/admin/users");
    setVendors(response.data.filter(u => u.role === "CUSTOMER"));
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/admin/users/${id}`);
    fetchVendors();
  };

  return (
    <>
      <Typography variant="h5" mb={2}>Vendors</Typography>
      <Paper sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Username</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map(v => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.username}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(v.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default AdminVendors;