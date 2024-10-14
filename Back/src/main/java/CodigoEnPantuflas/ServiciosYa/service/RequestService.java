package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.dao.IRequestDao;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import CodigoEnPantuflas.ServiciosYa.modelo.Request;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service @AllArgsConstructor
public class RequestService {

        @Autowired
        IRequestDao requestDao;
        @Autowired
        IUserDao userDao;

        public Request updateRequestStatus(Long requestId, String status) {
            Request request = requestDao.findById(requestId).get();
            request.setStatus(ReqStatus.valueOf(status));
            return requestDao.save(request);
        }

        @Transactional
        public void deleteRequest(Long requestId) {
            Request request = requestDao.findById(requestId).get();
            User clientUser = request.getClient();
            User professionalUser = request.getProfessional();
            clientUser.removeSentRequest(requestId);
            professionalUser.removeRecievedRequest(requestId);
            requestDao.deleteById(requestId);
            Optional<Request> requestAfterDelete = requestDao.findById(requestId);
            String a = "a";
        }

        public Request getRequestById(Long requestId) {
            Request request = requestDao.findById(requestId).get();
            return request;
        }
}
