package CodigoEnPantuflas.ServiciosYa.service;
import CodigoEnPantuflas.ServiciosYa.dao.IRequestDao;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.jwt.Mode;
import CodigoEnPantuflas.ServiciosYa.modelo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    @Autowired
    IUserDao userDao;
    @Autowired
    IRequestDao requestDao;

    public User saveOrUpdate(User user){
        return userDao.save(user);
    }

    public User createUserWithRoles() {
        // Crear usuario
        User user = new User();
        user.setMail("mano@hotmail.com");
        user.setUserNickname("nickname");
        user.setPassword("abcde3");

        // Crear roles
        user.setNameOfCurrentRole("CLIENT");
        user.setCurrentRole(new Client());

        return userDao.save(user);
    }

    public User getByMail(String mail) {
        User user = userDao.getByMail(mail)
                .orElseThrow(() -> new RuntimeException(Errors.NOT_FOUND_IN_DATABASE.getMessage()));
        if (user.getNameOfCurrentRole() == "CLIENT"){
            user.setCurrentRole( new Client());
        } else {
            String district = userDao.findProfessionalDistrictByEmail(mail);
            String trade = userDao.findProfessionalTradeByEmail(mail);
            String contactMail = userDao.findProfessionalContactMailbyEmail(mail);
            String phoneNumber = userDao.findProfessionalPhoneByEmail(mail);
            Professional pro = new Professional(user, district, trade);
            pro.setContactMail(contactMail);
            pro.setPhoneNumber(phoneNumber);
            user.setCurrentRole(pro);
        }
        user.setMail(mail);
        return userDao.save(user);
    }

    public User addProfessionalRole(String email, String district, String incomingTrade){
        User user = getByMail(email);
        checkIfTheUserIsProfessional(user);
        user.addProfessionalRole(district, incomingTrade);
        return userDao.save(user);
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

    public User changeUserRole(String userEmail) {
        User user = getByMail(userEmail);
        user.switchRole();
        return userDao.save(user);
    }

    public User addPhone(String email, String phone) {
        User user = getByMail(email);
        user.addPhone(phone);
        return userDao.save(user);
    }

    public User addEmailContact(String email, String emailContact) {
        User user = getByMail(email);
        user.addMail(emailContact);
        return userDao.save(user);
    }

    public Request sendNewRequest(String email, String professionalEmail, String description, String title) {
        User client = getByMail(email);
        User professional = getByMail(professionalEmail);

        Request request = new Request(client, professional, description, title);

        client.sendNewRequest(request);
        professional.receiveNewRequest(request);

        requestDao.save(request);

        return request;
    }
}
