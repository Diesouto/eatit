import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = (e: React.FormEvent) => {
        localStorage.setItem('userRole', '');
        navigate('/login');
    }

    return (
        <button onClick={handleLogout} className="btn btn-danger mt-3">
            Logout
        </button>
    );
};

export default LogoutButton;
