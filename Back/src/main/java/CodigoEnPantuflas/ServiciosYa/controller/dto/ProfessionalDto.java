package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalDto extends RolDto {
    String district;
    String trade;

    public static ProfessionalDto fromModel(Role role) {
        if (role instanceof Professional) {
            Professional professional = (Professional) role;
            return new ProfessionalDto(professional.getDistrict(), professional.getTrade());
        }
        throw new IllegalArgumentException("El rol proporcionado no es una instancia de Professional");
    }
}

