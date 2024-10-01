package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import lombok.*;

@Data
@AllArgsConstructor
public class RequestDto {
    private String description;
    private SimpleUserDto user;
    private ReqStatus status;
}
