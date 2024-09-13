package CodigoEnPantuflas.ServiciosYa.modelo;

import CodigoEnPantuflas.ServiciosYa.modelo.user.User;
import jakarta.persistence.*;

@Entity

public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer profileId;
    private String nickName;
    @ManyToOne()
    private User user;

    public Integer getProfileId() {
        return profileId;
    }

    public void setProfileId(Integer profileId) {
        this.profileId = profileId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Profile(Integer profileId, String nickName){
        this.profileId = profileId;
        this.nickName = nickName;
    }

    public Profile(){

    }
}
