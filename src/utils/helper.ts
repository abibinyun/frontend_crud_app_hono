import Cookies from 'js-cookie';
import axios from 'axios';

declare global {
    interface ImportMeta {
      readonly VITE_API_URL: string;
    }
  }

export const checkIsLoggedIn = async () => {
  const token = Cookies.get('token'); // Ambil token dari cookies
  
  if (!token) {
    throw new Error('Token not found'); // Jika token tidak ada, lemparkan error
  }

  try {
    const response = await axios.get('http://localhost:3000/verify', {
      headers: {
        Authorization: `Bearer ${token}`, // Set header Authorization dengan token
      },
    });
    if(response.status === 200 && response.data.message) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Verification error:', error);
    throw error; // Melempar kembali error untuk ditangani di tempat lain
  }
  };