package CodigoEnPantuflas.ServiciosYa.controller.dto;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Data
//@AllArgsConstructor
public class UserDto {
    private String nickName;
    private String email;
    private Set<RoleDto> userRoles = new HashSet<RoleDto>();
    private String currentRolDto;
    private String password;

    public UserDto(String nickName, String email, String currentRolDto, String password, Set<RoleDto> userRoles) {
        this.nickName = nickName;
        this.email = email;
        this.currentRolDto = currentRolDto;
        this.password = password;
        this.userRoles = userRoles;
    }

}
