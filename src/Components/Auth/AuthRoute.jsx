import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('Id');
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // For manual navigation

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`https://api.assetorix.com/ah/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
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
    // Show a loading spinner while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with the current page as the "from" state
    return <Navigate
    to="/auth"
    state={{
      from: location.state?.from || location.pathname,
      previous: location.pathname,
    }}
  />;
  }

  // If authenticated, render the protected component
  return <Component {...rest} />;
};

export default AuthRoute;
