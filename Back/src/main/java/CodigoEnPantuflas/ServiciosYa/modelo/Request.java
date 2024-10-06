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
    @Column(length = 50)
    private String title;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;  // Asociado al usuario que hizo la solicitud

    @ManyToOne
    @JoinColumn(name = "professional_id")
    private User professional;  // Asociado al usuario que hizo la solicitud


    private ReqStatus status;

    public Request(User client, User professional, String description,  String title) {
        this.setClient(client);
        this.setProfessional(professional);
        this.description = description;
        this.title = title;
        this.status = ReqStatus.PENDING;
    }

}
