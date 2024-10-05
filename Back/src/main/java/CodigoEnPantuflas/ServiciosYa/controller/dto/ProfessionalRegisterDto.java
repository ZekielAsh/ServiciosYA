package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import lombok.*;

@Data
@AllArgsConstructor
public class ProfessionalRegisterDto {
    private String email;
    private String district;
    private Mode trade;
}
