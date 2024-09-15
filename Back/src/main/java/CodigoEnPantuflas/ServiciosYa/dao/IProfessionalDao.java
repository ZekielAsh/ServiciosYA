package CodigoEnPantuflas.ServiciosYa.dao;

import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProfessionalDao extends JpaRepository<Professional, Long> {
}
