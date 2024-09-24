package CodigoEnPantuflas.ServiciosYa.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor @Getter @Setter
@NoArgsConstructor
@Entity
public class ContactMedia {
    @Id
    @GeneratedValue
    private Long id;

    private String contactMail;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ContactMedia(String contactMail,String phoneNumber,User user ){
        this.contactMail = contactMail;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }

}

