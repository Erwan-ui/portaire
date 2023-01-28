import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../components/Home';

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('hello')
    navigate('/payment-form');
}

return (
<Home onClick={handleClick} />
);
};

export default HomePage;