import { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';

const LogoutPage = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post('/api/users/signout');
        Router.push('/jobs');
      } catch (error) {
        console.error(error);
      }
    };
    logout();
  }, []);

  return <div>Signing out</div>;
};

export default LogoutPage;
