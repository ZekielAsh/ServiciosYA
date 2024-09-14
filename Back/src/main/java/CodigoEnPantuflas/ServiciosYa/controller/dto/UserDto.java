package CodigoEnPantuflas.ServiciosYa.controller.dto;
import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.User;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class UserDto {
    private String nickName;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<String> userRoles) {
        this.userRoles = userRoles;
    }

    private String email;
    private Set<String> userRoles = new HashSet<String>();

    public UserDto(String nickName, String email, Set<Role> userRoles) {
        this.nickName = nickName;
        this.userRoles = userRolesListFromModel(userRoles);
        this.email = email;
    }

    public Set<String> userRolesListFromModel(Set<Role> userRoles){
        return userRoles.stream().map(role -> role.getRole().name())
                .collect(Collectors.toSet());
    }


}
