import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from "@mui/material";

function AdminVendors() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/api/admin/vendors")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <Paper sx={{ p:3, borderRadius:3 }}>

      <Typography variant="h5" mb={2}>
        Vendors Management
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

    </Paper>
  );
}

export default AdminVendors;