package CodigoEnPantuflas.ServiciosYa.controller.rest;
import CodigoEnPantuflas.ServiciosYa.controller.dto.RegisterBody;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.Validator;
import CodigoEnPantuflas.ServiciosYa.jwt.AuthResponse;
import CodigoEnPantuflas.ServiciosYa.jwt.AuthService;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private  AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterBody registerBody){
        Validator.getInstance().validateRegisterBody(registerBody);
        User user = new User(registerBody.getUserName(), registerBody.getEmail(), registerBody.getPassword());
        User registeredUser = userService.saveOrUpdate(user);
        AuthResponse token = authService.register(registeredUser);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token.getToken());
        UserDto userDto = new UserDto(user.getUserNickname(), user.getMail(), user.getUserRoles());
        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody RegisterBody loginBody){
        Validator.getInstance().validateLoginBody(loginBody);
        return ResponseEntity.ok(new AuthResponse("a"));
    }
}
