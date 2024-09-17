package CodigoEnPantuflas.ServiciosYa.controller.rest;
import CodigoEnPantuflas.ServiciosYa.controller.dto.*;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
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

import java.util.Arrays;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private  AuthService authService;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<UserDto> register(@RequestBody RegisterBody registerBody){
        Validator.getInstance().validateRegisterBody(registerBody);
        User user = ObjectMapper.getInstance().convertRegisterBodyToUser(registerBody);
        User registeredUser = userService.saveOrUpdate(user);
        AuthResponse token = authService.register(registeredUser);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token.getToken());
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(registeredUser);
        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(userDto);
    }

    @PostMapping("/login")
    @CrossOrigin
    public ResponseEntity<UserDto> login(@RequestBody LoginBody loginBody){
        Validator validator = Validator.getInstance();
        validator.validateLoginBody(loginBody);
        User loginUser = userService.getByMail(loginBody.getEmail());
        validator.validatePassword(loginUser.getPassword(), loginBody.getPassword());
        AuthResponse token = authService.register(loginUser);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token.getToken());
        UserDto userDto = ObjectMapper.getInstance().convertUserToUserDto(loginUser);

        // Se expone el encabezado de authorization del header para acceder desde el front.
        headers.setAccessControlExposeHeaders(Arrays.asList("Authorization"));

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(userDto);
    }
}
