package CodigoEnPantuflas.ServiciosYa.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class ClientDto implements RoleDto{
    String nickname;
    String role;

    public ClientDto(String nickname) {
        this.nickname = nickname;
        role = "CLIENT";
    }
}
