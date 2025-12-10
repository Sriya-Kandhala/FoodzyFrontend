import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./store"; // adjust path if needed
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const LogoutButton = () => {
  const dispatch = useDispatch();     // to dispatch Redux actions
  const navigate = useNavigate();     // to navigate programmatically

  // ✅ Function called when user clicks Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");

        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });

  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "#0A4058",
        color: "white",
        border: "none",
        padding: "6px 12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <FaSignOutAlt /> Logout
    </button>
  );
};

export default LogoutButton;
