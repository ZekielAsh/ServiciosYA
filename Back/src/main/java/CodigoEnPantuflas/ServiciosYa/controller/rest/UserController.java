package CodigoEnPantuflas.ServiciosYa.controller.rest;
import CodigoEnPantuflas.ServiciosYa.controller.dto.ProfessionalRegisterDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/addProfessionalRole")
    @CrossOrigin
    public ResponseEntity<UserDto> addProfessionalRole(@RequestBody ProfessionalRegisterDto profRegDto){
        User user = userService.addProfessionalRole(profRegDto.getEmail(), profRegDto.getDistrict(), profRegDto.getTrade());
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @GetMapping("/getByKeyword")
    @CrossOrigin
    public ResponseEntity<Set<UserDto>> getProfessionalsByKeyword(@RequestParam String keyword){
        Set<User> professionalUsers = userService.getProfessionalsByKeyword(keyword);
        Set<UserDto> professionalsDto = professionalUsers.stream().map(user -> ObjectMapper.getInstance().convertUserToUserDto(user)).collect(Collectors.toSet());
        return ResponseEntity.status(HttpStatus.OK).body(professionalsDto);
    }

    @GetMapping("/getByEmail")
    @CrossOrigin
    public ResponseEntity<UserDto> getByEmail(@RequestParam String email){
        User user = userService.getByMail(email);
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }

    @PostMapping("/create")
    @CrossOrigin
    public ResponseEntity<UserDto> createUser(@RequestParam String email, @RequestParam String nickname) {
        User user = userService.createUserWithRoles();
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }
    
    @PostMapping("/changeRole")
    @CrossOrigin
    public ResponseEntity<UserDto> changeUserRole(@RequestParam String email) {
        User user = userService.changeUserRole(email);
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDto);
    }


}
