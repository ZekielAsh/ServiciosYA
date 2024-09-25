import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getTokenFromLocalStorage, getUserEmailFromLocalStorage } from "../../utils/localStorage";
import { handleLogOut } from "../../services/auth/ProtectedRoute";
import Navbar from "../../components/navbar/Navbar";
import Spinner from "../../components/spinner/Spinner";


const Profile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [modalMessage, setModalMessage] = useState("");
    const [contactInfo, setContactInfo] = useState({
        phone: "",
        email: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [review, setReview] = useState(""); // Estado para el nuevo comentario
    const [reviews, setReviews] = useState([]); // Estado para las reseñas existentes
    const [reviewError, setReviewError] = useState(""); // Estado para errores de reseña

    useEffect(() => {
        const token = getTokenFromLocalStorage();
        const currentUserEmail  = getUserEmailFromLocalStorage();
        if (token) {
          api
            .getUserByEmail(currentUserEmail )
                .then(response => {
                    //Esta constante deberia obtener el rol profesional de la lista de userRoles
                    const userResp = response.data.userRoles;
                    console.log(userResp);
                    setUser({
                        username: response.data.nickName,
                        token: token,
                        email: currentUserEmail,
                        district: userResp.find(role => role.role == "PROFESSIONAL").district,
                        trade: userResp.find(role => role.role == "PROFESSIONAL").trade,
                        roles: userResp.map(role => role.role),
                        role: response.data.currentRolDto
                    });
                    // Simular la obtención de la información de contacto del perfil visitado
                    setContactInfo({
                        phone: response.data.contactInfo.phone || "",
                        email: response.data.contactInfo.email || ""
                    });
                    // Simular la obtención de reseñas del backend
                    setReviews(response.data.reviews || []);
                console.log(userResp);
                })
                .catch(e => {
                setModalMessage(e.message);
                })
                .finally(() => {
                setIsLoading(false);
                console.log(user);
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

    const renderOptions = () => {
        switch (user?.role) {
            case "CLIENT":
                return (
                    <>
                        <h3>Rol: {user.role}</h3>
                        {user.roles.length > 1 ? (
                            <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
                        ) : (
                            <Link to="/registerPro">RegisterPro</Link>
                        )}
                    </>
                );
            case "PROFESSIONAL":
                return (
                    <>
                        <h3>Rol: {user.role}</h3>
                        <h3>District: {user.district}</h3>
                        <h3>Trade: {user.trade}</h3>
                        {renderContactInfo()}
                        <button onClick={() => handleSwitchRole()}>Cambiar Rol</button>
                    </>
                );
            default:
                return (
                    <>
                    </>
                );
        }
    }

    const handleSwitchRole = () => {
        if (user.roles.length > 1) {
            const newRole = user.roles.find(role => role !== user.role);
            api
            .changeRole(user.email).then((response) => {
                setUser({ ...user, role: newRole });
            })
            .catch(error => {
                setError('No se pudo cambiar el rol. Por favor, intente nuevamente.');
            });
        }
    };

    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const saveContactInfo = () => {
        api.updateContactInfo(contactInfo)
            .then(() => {
                setIsEditing(false);
            })
            .catch(error => {
                setError('No se pudo actualizar la información de contacto.');
            });
    };

    const renderContactInfo = () => {
        const currentUserEmail = getUserEmailFromLocalStorage();

        // Condición para verificar si el usuario es el dueño del perfil
        const isProfileOwner = currentUserEmail === user.email;

        if (user?.role === "PROFESSIONAL" && isProfileOwner && isEditing) {
            return (
                <>
                    <div>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleContactInfoChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={contactInfo.email}
                            onChange={handleContactInfoChange}
                        />
                    </div>
                    <button onClick={saveContactInfo}>Guardar</button>
                </>
            );
        } else {
            return (
                <>
                    <div>
                        <h3>Teléfono: {contactInfo.phone}</h3>
                    </div>
                    <div>
                        <h3>Email: {contactInfo.email}</h3>
                    </div>
                    {user?.role === "PROFESSIONAL" && isProfileOwner && (
                        <button onClick={() => setIsEditing(true)}>Editar Contacto</button>
                    )}
                </>
            );
        }
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleReviewSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Llamar al backend para validar y enviar la reseña
            api.submitReview({ review })
                .then(response => {
                    // Añadir la nueva reseña a la lista de reseñas
                    setReviews([...reviews, response.data.review]);
                    setReview(""); // Limpiar el campo de reseña
                    setReviewError(""); // Limpiar errores
                })
                .catch(error => {
                    // Mostrar error proporcionado por el backend (e.g. reseña vacía, límite de caracteres)
                    setReviewError(error.response.data.message || "Error al enviar la reseña.");
                });
        }
    };

    const renderReviews = () => {
        return reviews.map((review, index) => (
            <div key={index}>
                <p>{review}</p>
            </div>
        ));
    };


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
                            {renderOptions()}
                        </div>
                
                    </div>
                )}
                {/* Sección de reseñas */}
                <div>
                    <h2>Reseñas</h2>
                    {renderReviews()}
                    <textarea
                        value={review}
                        onChange={handleReviewChange}
                        onKeyDown={handleReviewSubmit}
                        placeholder="Escribe tu reseña y presiona Enter"
                    />
                    {reviewError && <div style={{ color: 'red' }}>{reviewError}</div>}
                </div>
                
                <button onClick={handleButton}>{buttonLabel()}</button>
            </div>
        </>
        );
    };
export default Profile;