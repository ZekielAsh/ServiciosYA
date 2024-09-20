package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.Entity;;

@Entity
public class Client extends Role {

    public Client() {
    }

    public Client(User user) {
        this.setUser(user);
    }

    @Override
    public Mode getRole() {
        return Mode.CLIENT;
    }

    @Override
    public Boolean isProfessional() {
        return false;
    }
}
