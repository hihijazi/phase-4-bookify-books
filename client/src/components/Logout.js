import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

function Logout({ onLogOut }) {
  const navigate = useNavigate()
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        setLogoutSuccess(true);
        localStorage.removeItem("user")
         navigate('/home'); // Redirect to home page
        window.location.reload(); // Reload the app
      } else {
        // Handle other status codes, if needed
        console.error("Logout request failed");
      }
    })
    .catch(error => {
      console.error("Error during logout:", error);
    });
  }, [onLogOut]);

  return (
    <></>
  );
}

export default Logout;
