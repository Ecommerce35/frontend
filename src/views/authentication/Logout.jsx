import React from 'react';
import { useNavigate } from 'react-router-dom';

import { clearAuthUser } from '../../api/auth';

const Logout = () => {
    const navigate = useNavigate();
    // const resetUser = useAuthStore((state) => state.resetUser); // Access resetUser from the store
    clearAuthUser(); // Clear tokens from cookies
    navigate('/auth/email'); // Redirect to login page

    // return (
    //     <button onClick={handleLogout}>
    //         Logout
    //     </button>
    // );
};

export default Logout;
