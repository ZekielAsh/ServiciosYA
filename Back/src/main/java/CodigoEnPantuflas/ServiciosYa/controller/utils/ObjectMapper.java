package CodigoEnPantuflas.ServiciosYa.controller.utils;

import CodigoEnPantuflas.ServiciosYa.controller.dto.*;
import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.Role;
import CodigoEnPantuflas.ServiciosYa.modelo.User;

import java.util.Set;
import java.util.stream.Collectors;

public class ObjectMapper {
    private static volatile ObjectMapper instance;
    /**Esta clase se encarga de hacer todos los mapeos de objeto modelo a objeto dto*/
    private ObjectMapper() {}

    public static ObjectMapper getInstance() {
        if (instance == null) {
            synchronized (ObjectMapper.class) {
                if (instance == null) {
                    instance = new ObjectMapper();
                }
            }
        }
        return instance;
    }

    public UserDto convertUserToUserDto(User user){
        Set<RoleDto> userRolesDto = user.getUserRoles().stream().map(this::converRoleToRoleDto).collect(Collectors.toSet());
        return new UserDto(user.getUserNickname(), user.getMail(), userRolesDto, user.getCurrentRole().getRole().name());
    }

    public RoleDto converRoleToRoleDto(Role role) {
       if(role.getRole() == Roles.CLIENT){
           return new ClientDto("a");
       } else{
           Professional professional = (Professional) role;
           return new ProfessionalDto(professional.getDistrict(), professional.getTrade());
       }
    }

    public User convertRegisterBodyToUser(RegisterBody registerBody){
        return new User(registerBody.getUserName(), registerBody.getEmail(), registerBody.getPassword());
    }


}
