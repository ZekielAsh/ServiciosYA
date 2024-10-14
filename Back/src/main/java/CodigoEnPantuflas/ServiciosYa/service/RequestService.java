package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.dao.IRequestDao;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
import CodigoEnPantuflas.ServiciosYa.jwt.ReqStatus;
import CodigoEnPantuflas.ServiciosYa.modelo.Request;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            requestDao.deleteById(requestId);
        }
}
