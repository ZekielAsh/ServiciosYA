package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.Roles;

public class Professional extends Role {

    @Override
    public Roles getRole() {
        return Roles.PROFESSIONAL;
    }
    public Professional(User user, String district, Trades trade) {
        this.setUser(user);
    }
}
