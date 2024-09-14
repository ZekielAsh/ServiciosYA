package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClientDao extends JpaRepository<Client, Long> {
}
