package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Entity
public class Professional extends Role {
    String district;
    String trade;
    @Email(message = "El formato del correo electrónico no es válido.")
    private String contactMail;
    @Pattern(regexp = "^\\d{8}$", message = "El número de teléfono debe tener exactamente 8 dígitos sin guiones.")
    private String phoneNumber;

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
