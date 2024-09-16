package CodigoEnPantuflas.ServiciosYa.controller.rest;
import CodigoEnPantuflas.ServiciosYa.controller.dto.ProfessionalDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.ProfessionalRegisterDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/addProfessionalRole")
    @CrossOrigin
    public ResponseEntity<UserDto> addProfessionalRole(@RequestBody ProfessionalRegisterDto profRegDto){
        User user = userService.addProfessionalRole(profRegDto.getEmail(), profRegDto.getDistrict(), profRegDto.getTrade());
        ProfessionalDto profDto = ProfessionalDto.fromModel(user.getCurrentRole());
        UserDto userDto = UserDto.fromModel(user, profDto);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }
}
