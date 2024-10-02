package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.dao.IRequestDao;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import CodigoEnPantuflas.ServiciosYa.modelo.Request;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @AllArgsConstructor
public class RequestService {

        @Autowired
        IRequestDao requestDao;
        @Autowired
        IUserDao userDao;

        public Request addRequest(String description, User user) {
            Request request = new Request(description, user);
            user.addNewRequest(request);
            return requestDao.save(request);
        }

        public List<Request> findRequestsById(Long userId) {
            return requestDao.findRequestsById(userId);
        }

        public Request updateRequestStatus(Long requestId, String status) {
            Request request = requestDao.findById(requestId).get();
            request.setStatus(ReqStatus.valueOf(status));
            return requestDao.save(request);
        }
}
