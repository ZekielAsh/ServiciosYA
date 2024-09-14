package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IUserDao extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.mail = ?1")
    Optional<User> getByMail(String mail);
}

