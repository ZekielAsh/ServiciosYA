package CodigoEnPantuflas.ServiciosYa.controller.dto;

import CodigoEnPantuflas.ServiciosYa.modelo.Profile;
import CodigoEnPantuflas.ServiciosYa.modelo.User;

public class UserDto {
    private Integer id;
    private String firstName;

    // Constructor
    public UserDto(Integer id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }

    // Método para convertir UserDto a User
    public User toModel() {
        var someProfile = new Profile(2, "aaa");
        User user = new User(this.id, this.firstName, someProfile);
        return user;
    }

    // Método para crear UserDto desde User
    public static UserDto fromModel(User user) {
        return new UserDto(user.getUserId(), user.getFirst_name());
    }

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
