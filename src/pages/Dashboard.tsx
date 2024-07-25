import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      axios.get('http://localhost:3000/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setIsLoggedIn(true); // Set state isLoggedIn jika token valid
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Unauthorized access!</div>; // Redirect or handle unauthorized access
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Tampilan dashboard */}
    </div>
  );
}

export default Dashboard