package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Entity
public class Professional extends Role {
    private String district;
    private String trade;


    @Override
    public Mode getMode() {
        return Mode.PROFESSIONAL;
    }

    @Override
    public Boolean isProfessional() {
        return true;
    }

    public Professional(User user, String district, String trade) {
        this.district = district;
        this.trade = trade;
        this.setUser(user);
    }

}
