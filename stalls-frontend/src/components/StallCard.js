import { useNavigate } from "react-router-dom";

function StallCard({ stall }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vendor/stall/${stall.id}`)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "0.35s",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}

      onMouseEnter={(e)=>{
        e.currentTarget.style.transform =
          "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.25)";
      }}

      onMouseLeave={(e)=>{
        e.currentTarget.style.transform="none";
        e.currentTarget.style.boxShadow =
          "0 4px 15px rgba(0,0,0,0.1)";
      }}
    >

      {/* Stall Image */}
      <img
        src={
          stall.imageUrl
          ? `https://flashit-marketplace.onrender.com/uploads/${stall.imageUrl}`
          : "https://source.unsplash.com/400x250/?restaurant"
        }
        alt=""
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover"
        }}
      />

      {/* Details */}
      <div style={{ padding: "15px" }}>
        <h3>{stall.name}</h3>

        <p style={{
          color:"#777",
          fontSize:"14px"
        }}>
          {stall.description}
        </p>

        <p style={{
          fontWeight:"bold",
          color:"#555"
        }}>
          📍 {stall.location}
        </p>
      </div>

    </div>
  );
}

export default StallCard;