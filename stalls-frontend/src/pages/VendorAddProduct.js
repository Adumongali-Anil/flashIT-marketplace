import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function VendorAddProduct() {

  const navigate = useNavigate();

  const [stalls,setStalls] = useState([]);

  const [formData,setFormData] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    stallId:""
  });

  const [image,setImage] = useState(null);

  useEffect(()=>{
    fetchStalls();
  },[]);

  const fetchStalls = async()=>{
    const res =
      await api.get("/api/stalls/vendor/my-stalls");
    setStalls(res.data);
  };

  const handleCreate = async()=>{

    const data = new FormData();

    data.append("name",formData.name);
    data.append("description",formData.description);
    data.append("price",formData.price);
    data.append("stock",formData.stock);
    data.append("image",image);

    await api.post(
      `/api/products/vendor/create/${formData.stallId}`,
      data
    );

    alert("Product Added ✅");

    navigate("/vendor/products");
  };

  return (
    <div style={{padding:20}}>

      <h2>Add Product</h2>

      <select
        onChange={(e)=>
          setFormData({
            ...formData,
            stallId:e.target.value
          })}
      >
        <option>Select Stall</option>

        {stalls.map(s=>(
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}

      </select><br/><br/>

      <input placeholder="Name"
        onChange={e=>
          setFormData({...formData,name:e.target.value})
        }
      /><br/><br/>

      <input placeholder="Description"
        onChange={e=>
          setFormData({...formData,
          description:e.target.value})
        }
      /><br/><br/>

      <input type="number"
        placeholder="Price"
        onChange={e=>
          setFormData({...formData,
          price:e.target.value})
        }
      /><br/><br/>

      <input type="number"
        placeholder="Stock"
        onChange={e=>
          setFormData({...formData,
          stock:e.target.value})
        }
      /><br/><br/>

      <input type="file"
        onChange={(e)=>
          setImage(e.target.files[0])
        }
      /><br/><br/>

      <button onClick={handleCreate}>
        Add Product
      </button>

    </div>
  );
}

export default VendorAddProduct;