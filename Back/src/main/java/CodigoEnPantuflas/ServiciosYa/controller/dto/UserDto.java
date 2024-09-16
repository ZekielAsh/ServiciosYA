package CodigoEnPantuflas.ServiciosYa.controller.dto;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
@Data
public class UserDto {
    private String nickName;
    private String email;
    private Set<String> userRoles = new HashSet<String>();
    private RolDto currentRolDto;

    public UserDto(String nickName, String email, Set<Role> userRoles, RolDto currentRoleDto) {
        this.nickName = nickName;
        this.userRoles = userRolesListFromModel(userRoles);
        this.email = email;
        this.currentRolDto = currentRoleDto;
    }

    public static UserDto fromModel(User user, ProfessionalDto profDto) {
        return new UserDto(user.getUserNickname(), user.getMail(), user.getUserRoles(), profDto);
    }

    private Set<String> userRolesListFromModel(Set<Role> userRoles){
        return userRoles.stream().map(role -> role.getRole().name())
                .collect(Collectors.toSet());
    }


}
