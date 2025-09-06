import React, { useState } from "react";
import Login from "./login";
import Dashboard from "./dashboard "; // yeh aapka dashboard component hoga

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default Admin;
