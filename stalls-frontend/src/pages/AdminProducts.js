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

function AdminProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/api/admin/products");
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {

    if(!window.confirm("Delete this product?")) return;

    await api.delete(`/api/admin/products/${id}`);
    loadProducts();
  };

  return (
    <>
      <Typography variant="h5" mb={3}>
        Products Management
      </Typography>

      <AdminTableWrapper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Vendor</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {products.map((p) => (

              <TableRow
                key={p.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#f1f5f9"
                  }
                }}
              >

                <TableCell>{p.id}</TableCell>

                <TableCell>{p.name}</TableCell>

                <TableCell>₹{p.price}</TableCell>

                {/* ⭐ FIX vendor name */}
                <TableCell>
                  {p.stall?.user?.username || "Vendor"}
                </TableCell>

                <TableCell>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </AdminTableWrapper>
    </>
  );
}

export default AdminProducts;