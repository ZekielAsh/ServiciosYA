package CodigoEnPantuflas.ServiciosYa.exceptions;

public class UserNotFoundException extends NotFound{
    private final String email;

    public UserNotFoundException(String email) {
        this.email = email;
    }

    @Override
    public String getMessage() {return "El usario con el : " + email + " no existe";}
}
