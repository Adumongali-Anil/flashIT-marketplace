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
        ? stall.imageUrl
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
    <div style={{padding:"10px"}}>

{/* ================= FORM ================= */}

<div ref={formRef} style={createCard}>

<h2 className="responsive-h2">{editingId?"Edit Stall":"Add Stall"}</h2>

<input
name="name"
placeholder="Stall Name"
value={form.name}
onChange={handleChange}
className="responsive-input"
style={{marginBottom:"10px"}}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
className="responsive-input"
style={{marginBottom:"10px"}}
/>

<input
name="location"
placeholder="Location"
value={form.location}
onChange={handleChange}
className="responsive-input"
style={{marginBottom:"10px"}}
/>

<input type="file" onChange={handleImage} className="responsive-input"/>

{preview &&(
<img src={preview} alt="" style={previewImg}/>
)}

<button
className="responsive-button"
style={{marginTop:"10px"}}
onClick={editingId?updateStall:createStall}
>
{editingId?"Update Stall":"Create Stall"}
</button>

</div>

{/* ================= GRID ================= */}

<h2 className="responsive-h2" style={{marginTop:20}}>My Stalls</h2>

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
?stall.imageUrl
:"https://picsum.photos/400/200"
}
alt=""
style={stallImage}
onMouseEnter={e=>e.target.style.transform="scale(1.1)"}
onMouseLeave={e=>e.target.style.transform="scale(1)"}
/>

<div style={{padding:"10px"}}>
<h3 style={{fontSize:"16px", margin:"8px 0"}}>{stall.name}</h3>
<p style={{margin:"5px 0", fontSize:"13px"}}>📍 {stall.location}</p>

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
padding:"15px",
borderRadius:"14px",
boxShadow:"0 6px 20px rgba(0,0,0,0.1)",
maxWidth:"100%",
marginBottom:"20px"
};

const previewImg={
width:"100%",
height:"150px",
objectFit:"cover",
marginTop:"10px",
borderRadius:"10px"
};

const grid={
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
gap:"12px"
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
height:"150px",
objectFit:"cover",
transition:"transform .5s ease"
};

const actionBox={
display:"flex",
gap:"8px",
marginTop:"8px"
};

const editBtn={
flex:1,
background:"#2563eb",
color:"#fff",
border:"none",
padding:"8px",
borderRadius:"8px",
cursor:"pointer",
transition:"0.3s",
fontSize:"13px"
};

const deleteBtn={
flex:1,
background:"#ef4444",
color:"#fff",
border:"none",
padding:"8px",
borderRadius:"8px",
cursor:"pointer",
transition:"0.3s",
fontSize:"13px"
};

export default VendorStalls;