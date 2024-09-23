package CodigoEnPantuflas.ServiciosYa.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientDto implements RoleDto{
    private String forTest;

    @Override
    public String getRole() {
        return "Cliente";
    }

}
