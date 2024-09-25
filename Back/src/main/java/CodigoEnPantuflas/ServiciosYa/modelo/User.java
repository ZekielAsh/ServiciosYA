
package CodigoEnPantuflas.ServiciosYa.modelo;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
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
    private String nameOfCurrentRole;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ContactMedia contactMedia;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Comment>  comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Role> userRoles = new HashSet<Role>();


    public User(String userNickname, String mail, String password){
        this.setUserNickname(userNickname);
        this.setMail(mail);
        this.setPassword(password);
        var role  = new Client(this);
        this.getUserRoles().add(role);
        this.setCurrentRole(role);
        nameOfCurrentRole = currentRole.getMode().name();
        comments = new HashSet<>();
    }


    public Set<Role> getUserRoles2(){
        return this.userRoles;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Este metodo tiene que ver con el jwtToken, deberia de devolver los roles en token para el front
        var roles = this.userRoles.stream()
                .map(Role::getMode)
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

    public Set<Role> getSortedRoles() {
        return this.getUserRoles().stream()
                .sorted(Comparator.comparing(Role::getMode)) // Ordena alfabéticamente por el nombre del rol
                .collect(Collectors.toCollection(LinkedHashSet::new)); // Devuelve un Set ordenado
    }

    public void addRole(Professional professionalRole) {
        this.getUserRoles().add(professionalRole);
    }

    public boolean isAlreadyProfessional() {
        return getUserRoles().stream()
                .anyMatch(Role::isProfessional);
    }

    public ContactMedia getContactMediaOrCreate(){
        return this.getContactMedia() == null ? new ContactMedia() : this.getContactMedia();
    }

    public Role findRoleWithMode(Mode mode){
        return  getUserRoles().stream().filter(rol -> rol.getMode().name() == mode.name()).findFirst().get();
    }

    public  void setRoleAsCurrent(Mode mode) {
        Role clientRole = getUserRoles().stream().filter(rol -> rol.getMode().name() == mode.name()).findFirst().get();
        this.setCurrentRole(clientRole);
        nameOfCurrentRole = clientRole.getMode().name();
    }

    public void addProfessionalRole(String distric, Trades trade) {
        Role role = new Professional(this, distric, trade.getClass().getName());
        this.getUserRoles().add(role);
        this.setCurrentRole(role);
    }

    public void addNewComment(Comment comment) {
        this.comments.add(comment);
    }

    public void switchRole() {
        if (this.getNameOfCurrentRole() == null || this.getNameOfCurrentRole().equals(Mode.PROFESSIONAL.name())) {
            this.setRoleAsCurrent(Mode.CLIENT);
        } else {
            this.setRoleAsCurrent(Mode.PROFESSIONAL);
        }
    }

    public void addPhone(String phone) {
        this.getContactMediaOrCreate().setPhoneNumber(phone);
    }

    public void addMail(String email) {
        this.getContactMediaOrCreate().setContactMail(email);
    }
}

