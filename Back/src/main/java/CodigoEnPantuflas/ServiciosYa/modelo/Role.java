package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String contactMail;
    private String phoneNumber;

    public abstract String getTrade();
    public abstract String getDistrict();
    public abstract Mode getMode();

    public abstract Boolean isProfessional();

}
