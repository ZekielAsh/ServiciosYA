package CodigoEnPantuflas.ServiciosYa.controller.utils;

import CodigoEnPantuflas.ServiciosYa.controller.dto.CommentDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.LoginBody;
import CodigoEnPantuflas.ServiciosYa.controller.dto.RegisterBody;
import CodigoEnPantuflas.ServiciosYa.modelo.User;

import java.util.regex.Pattern;

public class Validator {
    /**Esta clase deberia de usarse para hacer validaciones en los dtos entrantes
     * para que la capa de service tenga menos trabajo*/
    private static final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    private static final String EMAIL_EMPTY_MESSAGE = "La dirección de mail o contraseña son erroneas. Verifique su información e intente otra vez";
    private static final String INVALID_EMAIL_MESSAGE = "El registro ha fallado  por información invalida";
    private static final String PASSWORD_EMPTY_MESSAGE = "La dirección de mail o contraseña son erroneas. Verifique su información e intente otra vez";
    private static final String NAME_EMPTY_MESSAGE = "El nombre no puede estar en blanco";
    private static final String WRONG_EMAIL_OR_PASSWORD = "La dirección de mail o contraseña son erroneas. Verifique su información e intente otra vez";
    private static final String COMMENT_EMPTY_MESSAGE = "El comentario no puede estar vacío.";
    private static final String COMMENT_LONG_MESSAGE =  "El mensaje excedio el limite de 150 caracteres. Pruebe con un mensaje mas corto.";

    private static volatile Validator instance;

    private Validator() {}

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

    public void validateLoginBody(LoginBody body) {
        if (is_mail_empty(body.getEmail()) || isPasswordEmpty(body.getPassword()) || isInvidalidEmail(body.getEmail())) {
            throw new IllegalArgumentException(WRONG_EMAIL_OR_PASSWORD);
        }
    }

    public void validatePhoneNumber(String phoneNumber) {
        if (phoneNumber.isEmpty()) return;
        if (!phoneNumber.matches("\\d{8}")) {  // Verifica que tenga exactamente 8 dígitos
            throw new IllegalArgumentException("El número de teléfono debe tener exactamente 8 dígitos sin guiones.");
        }
    }

    public void validateComment(CommentDto commentDto) {
        if (commentDto.getText().isBlank()) {
            throw new IllegalArgumentException(COMMENT_EMPTY_MESSAGE);
        }
        if ((commentDto.getText().length() > 150)){
            throw new IllegalArgumentException(COMMENT_LONG_MESSAGE);
        }
    }

    public void validatePassword(String actualPassword, String incomingPassword) {

        if (!actualPassword.equals(incomingPassword)){
            throw new IllegalArgumentException(WRONG_EMAIL_OR_PASSWORD);
        }
    }

    public void validateMailNumber(String email) {
        if (email.isEmpty()) return;
        if(!email.contains("@")){
            throw new IllegalArgumentException("El correo electronico debe tener arroba");
        }
    }

    public void validateContactMedia(User user) {
        if (user.getCurrentRole().getContactMail() == null && user.getCurrentRole().getPhoneNumber() == null){
            throw new IllegalArgumentException("El Profesional no posee medios de contacto");
        }
    }
}

