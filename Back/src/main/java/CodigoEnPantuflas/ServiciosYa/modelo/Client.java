package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;;

@Entity @NoArgsConstructor
public class Client extends Role {

    public Client(User user) {
        this.setUser(user);
    }

    @Override
    public String getTrade() {
        return "";
    }

    @Override
    public String getDistrict(){
        return "";
    }

    @Override
    public Mode getMode() {
        return Mode.CLIENT;
    }

    @Override
    public Boolean isProfessional() {
        return false;
    }
}
