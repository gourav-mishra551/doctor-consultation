import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('Id');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`https://api.assetorix.com/ah/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'id': id,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          toast.error('Authentication failed. Please login.');
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [token, id]);

  if (isAuthenticated === null) {
    // You can return a loading spinner or nothing while authentication is being checked
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"></div>
    </div>
    return null;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default AuthRoute;
