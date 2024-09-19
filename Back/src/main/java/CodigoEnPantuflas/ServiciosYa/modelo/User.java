package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = "mail"),
        indexes = @Index(name = "userMail", columnList = "mail"))
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id = null;

    @Transient
    private Role currentRole;

    private String userNickname;
    private String mail;
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment>  comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Role> userRoles = new HashSet<Role>();

    public User(String userNickname, String mail, String password){
        this.setUserNickname(userNickname);
        this.setMail(mail);
        this.setPassword(password);
        var role  = new Client(this);
        this.getUserRoles().add(role);
        this.setCurrentRole(role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Este metodo tiene que ver con el jwtToken, deberia de devolver los roles en token para el front
        var roles = this.userRoles.stream()
                .map(Role::getRole)
                .collect(Collectors.toList());

        var authList = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return authList;
    }

    @Override
    /** esto se hereda de UserDetails, deberia de ser el
     userName pero como por modelo de negocio no es unique queda como email
     El objetivo es generar un token con el identificador unico del usuario*/
    public String getUsername() {
        return this.mail;
    }


    public void addRole(Professional professionalRole) {
        this.getUserRoles().add(professionalRole);
    }

    public boolean isAlreadyProfessional() {
        return getUserRoles().stream()
                .anyMatch(Role::isProfessional);
    }

    public  void setRoleAsCurrent(Roles role) {
        Role clientRole = getUserRoles().stream().filter(rol -> rol.getRole().name() == role.name()).findFirst().get();
        this.setCurrentRole(clientRole);
    }

    public void addProfessionalRole(String distric, Trades trade) {
        this.getUserRoles().add(new Professional(this, distric, trade));
    }

    public void addNewComment(Comment comment) {
        this.comments.add(comment);
    }
}

