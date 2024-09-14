package CodigoEnPantuflas.ServiciosYa.modelo.user;
import jakarta.persistence.Entity;;

@Entity
public class Client extends Role {

    public Client() {
    }

    public Client(User user) {
        this.setUser(user);
    }

}
