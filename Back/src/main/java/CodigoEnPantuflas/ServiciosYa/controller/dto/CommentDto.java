package CodigoEnPantuflas.ServiciosYa.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentDto {

    @NotBlank(message = "El comentario no puede estar vacío.")
    @Size(max = 150, message = "El mensaje excedio el limite de 150 caracteres. Pruebe con un mensaje mas corto.")
    private String text;
    private SimpleUserDto user;
}
