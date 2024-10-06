package CodigoEnPantuflas.ServiciosYa.controller.utils;

import CodigoEnPantuflas.ServiciosYa.controller.dto.*;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import CodigoEnPantuflas.ServiciosYa.modelo.*;

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
        Role userRole = user.getCurrentRole();
        return new UserDto(user.getUserNickname(), user.getMail(), userRolesDto, user.getNameOfCurrentRole(), user.getPassword(),
                userRole.getTrade(),userRole.getDistrict(),userRole.getContactMail(), userRole.getPhoneNumber());
    }

    public RoleDto converRoleToRoleDto(Role role) {
        if(role.getMode() == Mode.CLIENT){
            return new ClientDto(role.getUser().getUserNickname());
        } else{
            Professional professional = (Professional) role;
            return new ProfessionalDto(professional.getDistrict(), professional.getTrade(), professional.getContactMail(), professional.getPhoneNumber());
        }
    }

    public CommentDto convertCommentToCommentDto(Comment comment){
        SimpleUserDto simpleUserDto = this.convertUserToSimpleUserDto(comment.getUser());
        return new CommentDto(comment.getText(), simpleUserDto);
    }

    public RequestDto convertRequestToRequestDto(Request request){
        SimpleUserDto simpleUserDto = this.convertUserToSimpleUserDto(request.getClient());
        return new RequestDto(request.getTitle(), simpleUserDto, request.getStatus().toString());
    }

    public SimpleUserDto convertUserToSimpleUserDto(User user) {
        return new SimpleUserDto(user.getUserNickname());
    }

    public User convertUserDtoToUser(UserDto userDto){
        return new User(userDto.getNickName(), userDto.getEmail(), userDto.getPassword());
    }

    public User convertRegisterBodyToUser(RegisterBody registerBody){
        return new User(registerBody.getUserName(), registerBody.getEmail(), registerBody.getPassword());
    }

}
