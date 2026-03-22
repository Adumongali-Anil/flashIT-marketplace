import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function VendorEditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/api/products/vendor/${id}`);
      setFormData(res.data);
    } catch (error) {
      alert("Not allowed ❌");
      navigate("/vendor/products");
    }
  };

  const handleUpdate = async () => {
    try {

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);

      if (image) {
        data.append("image", image);
      }

      await api.put(
        `/api/products/vendor/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Product Updated ✅");
      navigate("/vendor/products");

    } catch (error) {
      console.log(error);
      alert("Update Failed ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Edit Product</h2>

      <input
        value={formData.name}
        onChange={e =>
          setFormData({ ...formData, name: e.target.value })
        }
      /><br /><br />

      <input
        value={formData.description}
        onChange={e =>
          setFormData({ ...formData, description: e.target.value })
        }
      /><br /><br />

      <input
        type="number"
        value={formData.price}
        onChange={e =>
          setFormData({ ...formData, price: e.target.value })
        }
      /><br /><br />

      <input
        type="number"
        value={formData.stock}
        onChange={e =>
          setFormData({ ...formData, stock: e.target.value })
        }
      /><br /><br />

      <input
        type="file"
        onChange={e =>
          setImage(e.target.files[0])
        }
      /><br /><br />

      <button onClick={handleUpdate}>
        Update Product
      </button>

    </div>
  );
}

export default VendorEditProduct;