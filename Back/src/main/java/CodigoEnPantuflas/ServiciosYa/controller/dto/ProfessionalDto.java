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
    private String district;
    private String trade;
    private String contactMail;
    private String phoneNumber;

    public ProfessionalDto(String district, String trade) {
        this.trade = trade;
        this.district = district;
    }
}

