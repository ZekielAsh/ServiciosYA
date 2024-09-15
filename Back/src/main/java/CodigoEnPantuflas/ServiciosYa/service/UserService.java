package CodigoEnPantuflas.ServiciosYa.service;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    IUserDao userDao;

    public User saveOrUpdate(User user){
        /** esto deberia de estar en un bloque try and catch para tirar error
         * si el mail ya esta en la base, tengo que saber explicitamente que error tira
         * para catchear ese*/
        return userDao.save(user);
    }

    public User getByMail(String mail){
        return userDao.getByMail(mail)
                .orElseThrow(() -> new RuntimeException(Errors.NOT_FOUND_IN_DATABASE.getMessage()));
    }
}
