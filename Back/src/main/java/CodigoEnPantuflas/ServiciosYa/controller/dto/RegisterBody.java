package CodigoEnPantuflas.ServiciosYa.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterBody {
    String userName;
    String email;
    String password;
}
