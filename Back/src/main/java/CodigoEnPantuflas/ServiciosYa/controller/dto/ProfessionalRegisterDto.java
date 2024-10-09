package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import CodigoEnPantuflas.ServiciosYa.modelo.Trades;
import lombok.*;

@Data
@AllArgsConstructor
public class ProfessionalRegisterDto {
    private String email;
    private String district;
    private Trades trade;
}
