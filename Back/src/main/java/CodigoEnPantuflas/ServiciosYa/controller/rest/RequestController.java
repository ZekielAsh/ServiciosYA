package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.CreateRequestDTO;
import CodigoEnPantuflas.ServiciosYa.controller.dto.RequestDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.controller.utils.Validator;
import CodigoEnPantuflas.ServiciosYa.modelo.Request;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import CodigoEnPantuflas.ServiciosYa.service.RequestService;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @PostMapping("/sendRequest")
    @CrossOrigin
    public void addRequest(@RequestBody CreateRequestDTO dto, @RequestParam String email, @RequestParam String professionalEmail) {
        Validator.getInstance().validateRequest(dto);
        userService.sendNewRequest(email, professionalEmail, dto.getDescription(), dto.getTitle());
    }

//    RequestDto requestDto = ObjectMapper.getInstance().convertRequestToRequestDto(request);
//        return ResponseEntity.ok(requestDto);

    @GetMapping("sent/profile/{email}")
    @CrossOrigin
    public ResponseEntity<List<RequestDto>> getSendRequestsByProfile(@PathVariable String email) {
        User user = userService.getByMail(email);
        List<RequestDto> requestsDto = user.getSendRequests().stream().map(r -> ObjectMapper.getInstance().convertRequestToRequestDto(r)).toList();
        return ResponseEntity.ok(requestsDto);
    }

    @GetMapping("received/profile/{email}")
    @CrossOrigin
    public ResponseEntity<List<RequestDto>> getReceivedRequestsByProfile(@PathVariable String email) {
        User user = userService.getByMail(email);
        List<RequestDto> requestsDto = user.getReceivedRequests().stream().map(r -> ObjectMapper.getInstance().convertRequestToRequestDto(r)).toList();
        return ResponseEntity.ok(requestsDto);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("received/profile/{email}/{status}")
    @CrossOrigin
    public ResponseEntity<List<RequestDto>> getReceivedRequestsByProfileAndStatus(@PathVariable String email, @PathVariable String status) {
        User user = userService.getByMail(email);
        List<RequestDto> requestsDto =
                user.getReceivedRequestsByStatus(status).stream()
                .map(r -> ObjectMapper.getInstance().convertRequestToRequestDto(r))
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(requestsDto);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PutMapping("/updateRequestStatus")
    @CrossOrigin
    public ResponseEntity<RequestDto> updateRequestStatus(@RequestParam Long requestId, @RequestParam String status) {
        Request updatedRequest = requestService.updateRequestStatus(requestId, status);
        RequestDto requestDto = ObjectMapper.getInstance().convertRequestToRequestDto(updatedRequest);
        return ResponseEntity.ok(requestDto);
    }

    @PostMapping("/deleteRequest")
    @CrossOrigin
    public ResponseEntity<Void> deleteRequest(@RequestParam Long requestId) {
        requestService.deleteRequest(requestId);
        return ResponseEntity.ok().build();
    }

}
