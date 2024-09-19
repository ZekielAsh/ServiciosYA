package CodigoEnPantuflas.ServiciosYa.modelo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El comentario no puede estar vacío.")
    @Size(max = 150, message = "El mensaje excedio el limite de 150 caracteres. Pruebe con un mensaje mas corto.")
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Asociado al usuario que hizo el comentario

}
