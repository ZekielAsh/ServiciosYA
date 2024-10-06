package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import lombok.Data;

@Data
public class CreateRequestDTO {
    private String title;
    private String description;
}
