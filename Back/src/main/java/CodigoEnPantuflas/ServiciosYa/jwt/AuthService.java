package CodigoEnPantuflas.ServiciosYa.jwt;
import CodigoEnPantuflas.ServiciosYa.controller.dto.LoginBody;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    @Autowired
    private IUserDao userRepository;
    @Autowired
    private JwtService jwtService;

    public AuthResponse login(LoginBody loginBody) {
        return null;
    }

    public AuthResponse register(UserDetails user) throws IllegalArgumentException {
        return new AuthResponse(jwtService.getToken(user));
    }
}
