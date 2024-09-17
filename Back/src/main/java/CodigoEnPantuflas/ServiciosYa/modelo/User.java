package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Roles;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = "mail"),
        indexes = @Index(name = "userMail", columnList = "mail"))
public class User implements UserDetails {
    private String userNickname;
    @Id
    @GeneratedValue
    private Long id = null;
    private String mail;
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Role> userRoles = new HashSet<Role>();
    @Transient
    private Role currentRole;

    public Set<Role> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<Role> userRoles) {
        this.userRoles = userRoles;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        var roles = this.userRoles.stream()
                .map(Role::getRole)
                .collect(Collectors.toList());

        var authList = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return authList;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.mail;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public Role getCurrentRole() {
        return currentRole;
    }

    public void setCurrentRole(Role currentRole) {
        this.currentRole = currentRole;
    }

    public User(String userNickname, String mail, String password){
        this.setUserNickname(userNickname);
        this.setMail(mail);
        this.setPassword(password);
        var role  = new Client(this);
        this.getUserRoles().add(role);
        this.setCurrentRole(role);
    }

    public User(){}

    public void addRole(Professional professionalRole) {
        this.getUserRoles().add(professionalRole);
    }

    public boolean isAlreadyProfessional() {
        return getUserRoles().stream()
                .anyMatch(Role::isProfessional);
    }
    /**
    public <T extends Role> void setRoleAsCurrent(Class<T> roleClass) {
        Role clientRole = getUserRoles().stream()
                .filter(roleClass::isInstance)
                .map(roleClass::cast)
                .findFirst().get();
        this.setCurrentRole(clientRole);
    }
     */
    public  void setRoleAsCurrent(Roles role) {
        Role clientRole = getUserRoles().stream().filter(rol -> rol.getRole().name() == role.name()).findFirst().get();
        this.setCurrentRole(clientRole);
    }

    public void addProfessionalRole(String distric, Trades trade) {
        this.getUserRoles().add(new Professional(this, distric, trade));
    }
}

