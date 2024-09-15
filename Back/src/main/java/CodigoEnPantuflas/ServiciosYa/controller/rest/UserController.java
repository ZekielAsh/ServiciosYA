package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.function.ToDoubleBiFunction;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/changeRole")
    public String ChangeRole(){
        return "Estamos trabajando en este endpoint";
    }
}
