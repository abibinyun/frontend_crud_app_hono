// src/components/Login.js
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: username,
        password,
      });

      if (response.status === 200 && response.data && response.data.token) {
        const { token } = response.data;
        Cookies.set('token', token, { expires: 7 });
        setError('');
        window.location.reload()
      } else {
        setError('Login failed. Please check your credentials.');
        console.error('Invalid response data:', response.data);
      }

    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
