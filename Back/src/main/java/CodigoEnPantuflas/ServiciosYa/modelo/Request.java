package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode
@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150)
    private String description;

    private ReqStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Asociado al usuario que hizo la solicitud

    public Request(String description, User user) {
        this.setUser(user);
        this.description = description;
        this.status = ReqStatus.PENDING;
    }

}
