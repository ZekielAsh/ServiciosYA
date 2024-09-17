package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.Set;

@Repository
public interface IUserDao extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.mail = ?1")
    Optional<User> getByMail(String mail);

    @Query("SELECT u FROM Professional p " +
            "JOIN Role r ON p.id = r.id " +
            "JOIN User u ON r.user = u " +
            "WHERE u.userNickname LIKE %?1% OR " +
            "u.mail LIKE %?1% OR " +
            "p.trade LIKE %?1%")
    Set<User> getProfessionalByKeyword(String keyword);
}

