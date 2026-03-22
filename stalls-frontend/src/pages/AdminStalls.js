import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box
} from "@mui/material";

import api from "../services/api";

function AdminStalls() {

  const [stalls, setStalls] = useState([]);

  useEffect(() => {
    fetchStalls();
  }, []);

  const fetchStalls = async () => {
    const res = await api.get("/api/stalls/admin/all-stalls");
    setStalls(res.data);
  };

  const deleteStall = async (id) => {

    if(!window.confirm("Delete this stall?")) return;

    await api.delete(`/api/admin/stalls/${id}`);
    fetchStalls();
  };

  return (
    <Box>

      <Typography variant="h5" mb={3}>
        All Vendor Stalls
      </Typography>

      <Grid container spacing={3}>

        {stalls.map(stall => (

          <Grid item xs={12} sm={6} md={4} lg={3} key={stall.id}>

            <Card
              sx={{
                borderRadius:3,
                boxShadow:"0 8px 20px rgba(0,0,0,0.1)",
                transition:"0.3s",
                "&:hover":{
                  transform:"translateY(-6px)",
                  boxShadow:"0 15px 35px rgba(0,0,0,0.2)"
                }
              }}
            >

              <CardMedia
                component="img"
                height="160"
                image={
                  stall.imageUrl
                  ? `http://localhost:8080/uploads/${stall.imageUrl}`
                  : "https://picsum.photos/400/200"
                }
              />

              <CardContent>

                <Typography variant="h6">
                  {stall.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                >
                  {stall.description || "No description"}
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={()=>deleteStall(stall.id)}
                >
                  Delete Stall
                </Button>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
}

export default AdminStalls;