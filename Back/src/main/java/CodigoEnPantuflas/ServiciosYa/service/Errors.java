package CodigoEnPantuflas.ServiciosYa.service;

public enum Errors {

    NOT_FOUND_IN_DATABASE("No se encuentra en la base de datos"),
    INVALID_TRADE("El oficio es invalido"),
    USER_IS_PROFESSIONAL("El usuario ya es profesional");

    private final String message;

    Errors(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

