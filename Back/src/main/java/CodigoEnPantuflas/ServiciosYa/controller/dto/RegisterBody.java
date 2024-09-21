package CodigoEnPantuflas.ServiciosYa.controller.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class RegisterBody {
    String userName;
    String email;
    String password;
    @NotEmpty(message = "Tenes que cargar una foto flaco")
    MultipartFile dniImage;
}
