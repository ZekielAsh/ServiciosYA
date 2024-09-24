import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getTokenFromLocalStorage, getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { handleLogOut } from "../../services/auth/ProtectedRoute";
import Navbar from "../../components/navbar/Navbar";
import Spinner from "../../components/spinner/Spinner";


const Profile = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    console.log(useParams());
    console.log(email);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        const email = getUserEmailFromLocalStorage();
        if (token) {
          api
            .getUserByEmail(email)
            .then(response => {
              const userResp = response.data.userRoles;
              setUser({
                username: response.data.nickName,
                token: token,
                district: userResp.district,
                trade: userResp.trade,
                role: response.data.currentRolDto
              });
            })
            .catch(e => {
              setModalMessage(e.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      }, []);

    /*const fetchUser = async () => {
        try {
            if (email) {
                const response = await api.getUserByEmail(email);
                setUser(response.data);
                setIsLoading(false);
            } 
            setError(null);
        } catch (error) {
            setError('Este usuario no existe. Por favor, intente nuevamente.');
        }

    };*/
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

    if (isLoading) return <Spinner />;

    return (
        <>
            <Navbar user={user} />
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
        </>
        );
    };
export default Profile;