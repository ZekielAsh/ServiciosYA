package CodigoEnPantuflas.ServiciosYa.controller.rest;
import CodigoEnPantuflas.ServiciosYa.controller.dto.ProfessionalRegisterDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/addProfessionalRole")
    @CrossOrigin
    public ResponseEntity<UserDto> addProfessionalRole(UserDto userDto, ProfessionalRegisterDto profRegDto){
        User userWithProffesionalRole =
                userService.addProfessionalRole(userDto.getEmail(), profRegDto.getDistrict(), profRegDto.getTrade());
        UserDto userWithProffesionalDto =
                new UserDto(userWithProffesionalRole.getUserNickname(), userWithProffesionalRole.getMail(), userWithProffesionalRole.getUserRoles());
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }
}
