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
        ContactMediaDto contactMediaDto = convertContactMediaToContactMediaDto(user.getContactMedia());
        return new UserDto(user.getUserNickname(), user.getMail(), userRolesDto, user.getNameOfCurrentRole(), user.getPassword(),contactMediaDto );
    }


    public RoleDto converRoleToRoleDto(Role role) {
        if(role.getMode() == Mode.CLIENT){
            return new ClientDto("a");
        } else{
            Professional professional = (Professional) role;
            return new ProfessionalDto(professional.getDistrict(), professional.getTrade());
        }
    }

    public CommentDto convertCommentToCommentDto(Comment comment){
        SimpleUserDto simpleUserDto = this.convertUserToSimpleUserDto(comment.getUser());
        return new CommentDto(comment.getText(), simpleUserDto);
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

    public ContactMedia convertContactMediaDtoToContactMedia(ContactMediaDto contactMediaDto){
        User user = convertUserDtoToUser(contactMediaDto.getUser());
        return new ContactMedia(contactMediaDto.getContactMail(),contactMediaDto.getPhoneNumber(),user);
    }

    public ContactMediaDto convertContactMediaToContactMediaDto(ContactMedia contactMedia) {
        UserDto userDto = convertUserToUserDto(contactMedia.getUser());
        return new ContactMediaDto(contactMedia.getContactMail(), contactMedia.getPhoneNumber(), userDto);
    }
}
