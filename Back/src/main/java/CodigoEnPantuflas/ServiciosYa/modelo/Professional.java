package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import jakarta.persistence.Entity;
@Entity
public class Professional extends Role {
    String district;
    String trade;
    @Override
    public Roles getRole() {
        return Roles.PROFESSIONAL;
    }

    @Override
    public Boolean isProfessional() {
        return true;
    }

    public Professional(User user, String district, Trades trade) {
        this.district = district;
        this.trade = trade.name();
        this.setUser(user);
    }
    public Professional(){};

    public String getDistrict() {
        return this.district;
    }

    public String getTrade() {
        return this.trade;
    }
}
