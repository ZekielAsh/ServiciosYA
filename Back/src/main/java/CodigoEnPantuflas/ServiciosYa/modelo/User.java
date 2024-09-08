package CodigoEnPantuflas.ServiciosYa.modelo;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String firstName;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Profile> profiles = new HashSet<>();

    public User(){

    }

    public User(Integer userId, String firstName, Profile profile) {
        this.userId = userId;
        this.firstName = firstName;
        this.profiles = new HashSet<>();
        this.profiles.add(profile);
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirst_name() {
        return firstName;
    }

    public void setFirst_name(String firstName) {
        this.firstName = firstName;
    }

    public Set<Profile> getProfiles(){
        return this.profiles;
    }


}

