package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalDto implements RoleDto {
    String district;
    String trade;

    @Override
    public String getRole() {
        return "Profesional";
    }
}

