package CodigoEnPantuflas.ServiciosYa.controller.dto;

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
    private String role;

    public ProfessionalDto(String district, String trade, String contactMail, String phoneNumber) {
        this.district = district;
        this.trade = trade;
        this.contactMail = contactMail;
        this.phoneNumber = phoneNumber;
        role = "PROFESSIONAL";
    }
}

