import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdatePaymentForm from '../components/UpdatePaymentForm';

const UpdatePaymentFormPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

return (
<UpdatePaymentForm onClick={handleClick}/>
);
};

export default UpdatePaymentFormPage;