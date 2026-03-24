import React,{useEffect,useState} from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

function CustomerStalls(){

const [stalls,setStalls] = useState([]);

const navigate = useNavigate();

useEffect(()=>{
loadStalls();
},[]);

const loadStalls = async ()=>{
const res = await api.get("/api/stalls/customer");
setStalls(res.data);
};

return(

<div style={{padding:"20px"}}>

<h2>Stalls</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",
gap:"25px",
marginTop:"20px"
}}
>

{stalls.map(s=>(

<div
key={s.id}
onClick={()=>navigate(`/stall/${s.id}`)}
style={{
borderRadius:"18px",
overflow:"hidden",
boxShadow:"0 4px 15px rgba(0,0,0,0.1)",
background:"white",
transition:"0.3s",
cursor:"pointer"
}}
onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-8px)";
e.currentTarget.style.boxShadow="0 15px 30px rgba(0,0,0,0.2)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 4px 15px rgba(0,0,0,0.1)";
}}
>

<img
src={`https://flashit-marketplace.onrender.com/uploads/${s.imageUrl}`}
alt=""
style={{
width:"100%",
height:"180px",
objectFit:"cover"
}}
/>

<div style={{padding:"15px"}}>

<h3>{s.name}</h3>

<p style={{color:"gray"}}>
{s.description}
</p>

</div>

</div>

))}

</div>

</div>

);

}

export default CustomerStalls;