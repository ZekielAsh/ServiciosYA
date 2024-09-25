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
    ContactMediaDto contactMediaDto;

    public UserDto(String nickName, String email, String currentRolDto, String password, Set<RoleDto> userRoles,ContactMediaDto contactMediaDto) {
        this.nickName = nickName;
        this.email = email;
        this.currentRolDto = currentRolDto;
        this.password = password;
        this.contactMediaDto = contactMediaDto;
        this.userRoles = userRoles;
    }

}
