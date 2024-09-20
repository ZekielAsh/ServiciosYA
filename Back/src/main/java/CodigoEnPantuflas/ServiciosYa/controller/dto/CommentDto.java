package CodigoEnPantuflas.ServiciosYa.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentDto {
    private String text;
    private UserDto user;
}
