package CodigoEnPantuflas.ServiciosYa.controller.dto;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Data
@AllArgsConstructor
public class UserDto {
    private String nickName;
    private String email;
    private Set<RoleDto> userRoles = new HashSet<RoleDto>();
    private String currentRolDto;
    private String password;
    private String trade;
    private String district;
    private String contactMail;
    private String phoneNumber;
    private String socialMedia;
}
