package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.Trades;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface IUserDao extends JpaRepository<User, String> {


//    @Query("SELECT u FROM User u LEFT JOIN FETCH u.userRoles r LEFT JOIN FETCH u.currentRole WHERE u.mail = ?1")
    @Query("SELECT u FROM User u WHERE u.mail = :email")
    Optional<User> getByMail(@Param("email") String email);

    @Query("SELECT r FROM User u JOIN u.userRoles r WHERE u.mail = ?1")
    List<Role> findRolesByEmail(String email);

    @Query("SELECT u FROM Professional p " +
            "JOIN Role r ON p.id = r.id " +
            "JOIN User u ON r.user = u " +
            "WHERE u.userNickname LIKE %?1% OR " +
            "u.mail LIKE %?1% OR " +
            "p.trade LIKE %?1%")
    Set<User> getProfessionalByKeyword(String keyword);

    @Query("SELECT p.trade FROM User u JOIN u.userRoles r JOIN Professional p ON r.id = p.id WHERE u.mail = :email")
    String findProfessionalTradeByEmail(@Param("email") String email);

    @Query("SELECT p.district FROM User u JOIN u.userRoles r JOIN Professional p ON r.id = p.id WHERE u.mail = :email")
    String findProfessionalDistrictByEmail(@Param("email") String email);

    @Query("SELECT p.contactMail FROM User u JOIN u.userRoles r JOIN Professional p ON r.id = p.id WHERE u.mail = :email")
    String findProfessionalContactMailbyEmail(@Param("email") String email);

    @Query("SELECT p.phoneNumber FROM User u JOIN u.userRoles r JOIN Professional p ON r.id = p.id WHERE u.mail = :email")
    String findProfessionalPhoneByEmail(@Param("email") String email);

    @Query("SELECT u FROM Professional p " +
            "JOIN Role r ON p.id = r.id " +
            "JOIN User u ON r.user = u " +
            "WHERE p.trade LIKE %?1% ")
    Set<User> getProfessionalByTrade(String trade);

    @Query("SELECT u FROM Professional p " +
            "JOIN Role r ON p.id = r.id " +
            "JOIN User u ON r.user = u " +
            "WHERE p.district LIKE %?1% ")
    Set<User> getProfessionalByDistrict(String district);

}

