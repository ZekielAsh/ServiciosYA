package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import lombok.*;

@Data
@AllArgsConstructor
public class RequestDto {
    private String title;
    private SimpleUserDto user;
    private String status;
    private String description;
}
