package CodigoEnPantuflas.ServiciosYa.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;  // Asociado al usuario que hizo el comentario

    public Comment(@NotBlank(message = "El comentario no puede estar vacío.") @Size(max = 150, message = "El mensaje excedio el limite de 150 caracteres. Pruebe con un mensaje mas corto.") String text, User user) {

    }
}
