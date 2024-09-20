package CodigoEnPantuflas.ServiciosYa.service;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import CodigoEnPantuflas.ServiciosYa.modelo.Trades;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    @Autowired
    IUserDao userDao;

    public User saveOrUpdate(User user){
        User savedUser = userDao.save(user);
        savedUser.setRoleAsCurrent(Mode.CLIENT);
        return savedUser;
    }

    public User getByMail(String mail){
        User user = userDao.getByMail(mail)
                .orElseThrow(() -> new RuntimeException(Errors.NOT_FOUND_IN_DATABASE.getMessage()));
        user.setRoleAsCurrent(Mode.CLIENT);
        return user;
    }

    public User addProfessionalRole(String email, String distric, String incomingTrade){
        User user = getByMail(email);
        Trades trade = parseTrade(incomingTrade);
        checkIfTheUserIsProfessional(user);
        user.addProfessionalRole(distric, trade);
        User userWithRole = userDao.save(user);
        userWithRole.setRoleAsCurrent(Mode.PROFESSIONAL);
        return userWithRole;
    }

    private static void checkIfTheUserIsProfessional(User user) {
        if (user.isAlreadyProfessional()){
            throw new RuntimeException(Errors.USER_IS_PROFESSIONAL.getMessage());
        }
    }

    public Trades parseTrade(String trade) {
        try{
            return Trades.valueOf(trade.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(Errors.INVALID_TRADE.getMessage());
        }
    }

    public Set<User> getProfessionalsByKeyword(String keyword) {
        Set<User> users =  userDao.getProfessionalByKeyword(keyword);
        users.forEach(user -> {user.setRoleAsCurrent(Mode.PROFESSIONAL);});
        return users;
    }
}
