package CodigoEnPantuflas.ServiciosYa.controller.dto;

public class LoginBody {
    String email = null;
    String password = null;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginBody(String email, String password){

    }

}
