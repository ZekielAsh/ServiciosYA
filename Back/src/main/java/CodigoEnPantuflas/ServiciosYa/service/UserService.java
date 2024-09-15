package CodigoEnPantuflas.ServiciosYa.service;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.modelo.Professional;
import CodigoEnPantuflas.ServiciosYa.modelo.Trades;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    IUserDao userDao;

    public User saveOrUpdate(User user){
        return userDao.save(user);
    }

    public User getByMail(String mail){
        return userDao.getByMail(mail)
                .orElseThrow(() -> new RuntimeException(Errors.NOT_FOUND_IN_DATABASE.getMessage()));
    }

    public User addProfessionalRole(String email, String distric, String incomingTrade){
        User user = getByMail(email);
        Trades trade = parseTrade(incomingTrade);
        Professional professionalRole = new Professional(user, distric, trade);
        user.addRole(professionalRole);
        return userDao.save(user);
    }

    public Trades parseTrade(String trade) {
        try{
            return Trades.valueOf(trade.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(Errors.INVALID_TRADE.getMessage());
        }
    }
}
