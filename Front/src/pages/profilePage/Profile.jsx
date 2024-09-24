import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { handleLogOut } from "../../services/auth/ProtectedRoute";


const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            navigate('/login');
        } else {
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        try {
            if (id) {
                const response = await api.getUserById(id);
                setUser(response.data);
            } 
            setError(null);
        } catch (error) {
            setError('Este usuario no existe. Por favor, intente nuevamente.');
        }

    };
    const buttonLabel = () => {
        return "Log Out";
    }

    const handleButton = () => {
        handleLogOutButton();
    }

    const handleLogOutButton = () => {
        handleLogOut();
        navigate('/');
    }

    return (
        <div>
            <h1>Profile</h1>
            {error && <div>{error}</div>}
            {user && (
                <div>
                    <div>
                        <h2>{user.username}</h2>
                    </div>
                    <div>
                        <h3>{user.email}</h3>
                    </div>
                    <div>
                        <h3>Role: {user.role}</h3>
                    </div>
                </div>
            )}
            <button onClick={handleButton}>{buttonLabel()}</button>
        </div>
    );
};

export default Profile;