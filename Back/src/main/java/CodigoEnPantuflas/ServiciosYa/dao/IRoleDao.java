package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleDao extends JpaRepository<Role, Long> {
}
