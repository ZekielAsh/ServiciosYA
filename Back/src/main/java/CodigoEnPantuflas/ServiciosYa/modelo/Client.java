package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import jakarta.persistence.Entity;;

@Entity
public class Client extends Role {

    public Client() {
    }

    public Client(User user) {
        this.setUser(user);
    }

    @Override
    public Roles getRole() {
        return Roles.CLIENT;
    }

    @Override
    public Boolean isProfessional() {
        return false;
    }
}
