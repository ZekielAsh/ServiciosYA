package CodigoEnPantuflas.ServiciosYa.service;
import CodigoEnPantuflas.ServiciosYa.modelo.Profile;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
@SpringBootTest
public class userServiceTest{
    @Autowired
    private UserService userService;
    @Test
    void canSaveAnUser() {
        Profile profile = new Profile(2, "Ricardito");
        User user = new User(1, "Ricardo", profile);
        userService.saveOrUpdate(user);
    }
}
