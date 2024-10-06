package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IRequestDao extends JpaRepository<Request, Long> {

    @Query("SELECT r FROM Request r WHERE r.user.id = ?1")
    List<Request> findRequestsById(Long userId);
}
