import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

import api from "../services/api";
import AdminTableWrapper from "../components/AdminTableWrapper";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  /* ⭐ GET LOGGED USERNAME */
  const loggedUser = localStorage.getItem("username");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await api.delete(`/api/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <>
      <Typography variant="h5" mb={3}>
        Users Management
      </Typography>

      <AdminTableWrapper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Username</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {users.map(user => (

              <TableRow
                key={user.id}
                hover
                sx={{
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "#f1f5f9"
                  }
                }}
              >

                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>

                <TableCell>

                  {/* ⭐ DO NOT SHOW DELETE BUTTON FOR LOGGED ADMIN */}
                  {user.username !== loggedUser && (

                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>

                  )}

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </AdminTableWrapper>
    </>
  );
}

export default AdminUsers;