import React from "react";
import { useNavigate } from "react-router-dom";

function ManagerHome() {
  const navigate = useNavigate();
  return (
    <div>
      <button>Dashboard</button>
      <button
        onClick={() => {
          navigate("/predictcustomer");
        }}
      >
        Prediction for a customer
      </button>
      <button>Predictions for list of customers</button>
    </div>
  );
}

export default ManagerHome;
