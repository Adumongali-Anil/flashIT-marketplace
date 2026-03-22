import React, { useEffect, useState, useRef } from "react";
import api from "../services/api";

function VendorStalls() {

  const formRef = useRef(null);

  const [stalls,setStalls]=useState([]);
  const [editingId,setEditingId]=useState(null);

  const [form,setForm]=useState({
    name:"",
    description:"",
    location:"",
    image:null
  });

  const [preview,setPreview]=useState(null);

  useEffect(()=>{
    fetchStalls();
  },[]);

  /* ================= FETCH ================= */

  const fetchStalls = async () => {
  try{
    const res = await api.get("/api/stalls/vendor/my-stalls");
    setStalls(res.data);
  }catch(e){
    console.error("Fetch stalls error:", e);
  }
};

  /* ================= INPUT ================= */

  const handleChange=e=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleImage=e=>{
    const file=e.target.files[0];
    setForm({...form,image:file});
    setPreview(URL.createObjectURL(file));
  };

  /* ================= RESET ================= */

  const resetForm=()=>{
    setForm({
      name:"",
      description:"",
      location:"",
      image:null
    });
    setPreview(null);
    setEditingId(null);
  };
  

  /* ================= CREATE ================= */

  const createStall=async()=>{

    try{
      const data=new FormData();

      data.append("name",form.name);
      data.append("description",form.description);
      data.append("location",form.location);
      if(form.image)
        data.append("image",form.image);

      await api.post("/api/stalls/vendor/create",data);

      alert("✅ Stall Created");

      resetForm();
      fetchStalls();

    }catch{
      alert("Create Failed");
    }
  };

  /* ================= DELETE ================= */

  const deleteStall=async(id)=>{

    if(!window.confirm("Delete Stall?")) return;

    try{
      await api.delete(`/api/stalls/vendor/delete/${id}`);
      alert("✅ Deleted");
      fetchStalls();
    }catch{
      alert("Delete Failed");
    }
  };

  /* ================= EDIT ================= */

  const startEdit=(stall)=>{

    setEditingId(stall.id);

    setForm({
      name:stall.name||"",
      description:stall.description||"",
      location:stall.location||"",
      image:null
    });

    setPreview(
      stall.imageUrl
        ? `http://localhost:8080/uploads/${stall.imageUrl}`
        : null
    );

    formRef.current?.scrollIntoView({
      behavior:"smooth"
    });
  };

  /* ================= UPDATE ================= */

  const updateStall=async()=>{

    try{

      const data=new FormData();

      data.append("name",form.name);
      data.append("description",form.description);
      data.append("location",form.location);

      if(form.image)
        data.append("image",form.image);

      await api.put(
        `/api/stalls/vendor/update/${editingId}`,
        data
      );

      alert("✅ Updated");

      resetForm();
      fetchStalls();

    }catch{
      alert("Update Failed");
    }
  };

  return(
    <div style={{padding:"30px"}}>

{/* ================= FORM ================= */}

<div ref={formRef} style={createCard}>

<h2>{editingId?"Edit Stall":"Add Stall"}</h2>

<input
name="name"
placeholder="Stall Name"
value={form.name}
onChange={handleChange}
style={input}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
style={input}
/>

<input
name="location"
placeholder="Location"
value={form.location}
onChange={handleChange}
style={input}
/>

<input type="file" onChange={handleImage}/>

{preview &&(
<img src={preview} alt="" style={previewImg}/>
)}

<button
style={mainBtn}
onClick={editingId?updateStall:createStall}
>
{editingId?"Update Stall":"Create Stall"}
</button>

</div>

{/* ================= GRID ================= */}

<h2 style={{marginTop:40}}>My Stalls</h2>

<div style={grid}>

{stalls.map(stall=>(

<div
key={stall.id}
style={stallCard}
onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-12px) scale(1.02)";
e.currentTarget.style.boxShadow="0 20px 45px rgba(0,0,0,0.25)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 8px 25px rgba(0,0,0,0.12)";
}}
>

<img
src={
stall.imageUrl
?`http://localhost:8080/uploads/${stall.imageUrl}`
:"https://picsum.photos/400/200"
}
alt=""
style={stallImage}
onMouseEnter={e=>e.target.style.transform="scale(1.1)"}
onMouseLeave={e=>e.target.style.transform="scale(1)"}
/>

<div style={{padding:15}}>
<h3>{stall.name}</h3>
<p>📍 {stall.location}</p>

<div style={actionBox}>

<button
style={editBtn}
onClick={()=>startEdit(stall)}
>
Edit
</button>

<button
style={deleteBtn}
onClick={()=>deleteStall(stall.id)}
>
Delete
</button>

</div>

</div>
</div>

))}

</div>
</div>
);
}

/* ================= STYLES ================= */

const createCard={
background:"#fff",
padding:"25px",
borderRadius:"14px",
boxShadow:"0 6px 20px rgba(0,0,0,0.1)",
maxWidth:"500px"
};

const input={
width:"100%",
padding:"10px",
marginBottom:"10px"
};

const previewImg={
width:"100%",
height:"150px",
objectFit:"cover",
marginTop:"10px",
borderRadius:"10px"
};

const mainBtn={
width:"100%",
padding:"12px",
background:"#2563eb",
color:"#fff",
border:"none",
borderRadius:"10px",
marginTop:"10px",
cursor:"pointer"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
gap:"25px"
};

const stallCard={
background:"#fff",
borderRadius:"16px",
overflow:"hidden",
transition:"all .35s ease",
boxShadow:"0 8px 25px rgba(0,0,0,0.12)"
};

const stallImage={
width:"100%",
height:"180px",
objectFit:"cover",
transition:"transform .5s ease"
};

const actionBox={
display:"flex",
gap:"10px",
marginTop:"10px"
};

const editBtn={
flex:1,
background:"#2563eb",
color:"#fff",
border:"none",
padding:"10px",
borderRadius:"10px",
cursor:"pointer",
transition:"0.3s"
};

const deleteBtn={
flex:1,
background:"#ef4444",
color:"#fff",
border:"none",
padding:"10px",
borderRadius:"10px",
cursor:"pointer",
transition:"0.3s"
};

export default VendorStalls;