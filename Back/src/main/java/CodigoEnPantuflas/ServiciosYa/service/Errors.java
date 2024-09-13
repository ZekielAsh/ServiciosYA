package CodigoEnPantuflas.ServiciosYa.service;

public enum Errors {

    NOT_FOUND_IN_DATABASE("Not found in database");

    private final String message;

    Errors(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

