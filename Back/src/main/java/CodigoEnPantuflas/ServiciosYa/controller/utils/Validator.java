package CodigoEnPantuflas.ServiciosYa.controller.utils;

import CodigoEnPantuflas.ServiciosYa.controller.dto.RegisterBody;

import java.util.regex.Pattern;

public class Validator {

    private static final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    private static final String EMAIL_EMPTY_MESSAGE = "Email cannot be blank";
    private static final String INVALID_EMAIL_MESSAGE = "Invalid email format";
    private static final String PASSWORD_EMPTY_MESSAGE = "Password cannot be blank";
    private static final String NAME_EMPTY_MESSAGE = "Name cannot be blank";
    private static final String WRONG_EMAIL_OR_PASSWORD = "Wrong email or password";

    // La instancia única de Validator
    private static volatile Validator instance;

    // Constructor privado para evitar instanciación externa
    private Validator() {}

    // Método estático para obtener la instancia única
    public static Validator getInstance() {
        if (instance == null) {
            synchronized (Validator.class) {
                if (instance == null) {
                    instance = new Validator();
                }
            }
        }
        return instance;
    }

    public void validateRegisterBody(RegisterBody body) {
        if (is_mail_empty(body.getEmail())) {
            throw new IllegalArgumentException(EMAIL_EMPTY_MESSAGE);
        }
        if (isInvidalidEmail(body.getEmail())) {
            throw new IllegalArgumentException(INVALID_EMAIL_MESSAGE);
        }
        if (isPasswordEmpty(body.getPassword())) {
            throw new IllegalArgumentException(PASSWORD_EMPTY_MESSAGE);
        }
        if (body.getUserName() == null) {
            throw new IllegalArgumentException(NAME_EMPTY_MESSAGE);
        }
    }

    private static boolean isInvidalidEmail(String email){
        return !Pattern.matches(EMAIL_REGEX, email);
    }

    private static boolean isPasswordEmpty(String password) {
        return password == null || password.isBlank();
    }

    private static boolean is_mail_empty(String email) {
        return email == null || email.isBlank();
    }

    public void validateLoginBody(RegisterBody body) {
        if (is_mail_empty(body.getEmail()) || isPasswordEmpty(body.getPassword()) || isInvidalidEmail(body.getEmail())) {
            throw new IllegalArgumentException(EMAIL_EMPTY_MESSAGE);
        }
    }
}

