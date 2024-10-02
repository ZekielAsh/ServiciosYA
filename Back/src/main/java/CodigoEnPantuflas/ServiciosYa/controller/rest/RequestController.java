package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.RequestDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.SimpleUserDto;
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

    @PostMapping("/addRequest")
    @CrossOrigin
    public ResponseEntity<RequestDto> addRequest(@RequestParam String request, @RequestParam String email) {
        Validator.getInstance().validateRequest(request);
        User user = userService.getByMail(email);
        Request savedRequest = requestService.addRequest(request, user);
        RequestDto requestDto = ObjectMapper.getInstance().convertRequestToRequestDto(savedRequest);
        SimpleUserDto simpleUserDto = ObjectMapper.getInstance().convertUserToSimpleUserDto(user);
        requestDto.setUser(simpleUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(requestDto);
    }

    @GetMapping("profile/{email}")
    @CrossOrigin
    public ResponseEntity<List<RequestDto>> getRequestsByProfile(@PathVariable String email) {
        User user = userService.getByMail(email);
        List<RequestDto> requestsDto = user.getRequests().stream().map(r -> ObjectMapper.getInstance().convertRequestToRequestDto(r)).toList();
        return ResponseEntity.ok(requestsDto);
    }

    // Los status que puede tener una request son: "PENDING", "ACCEPTED", "REJECTED"
    @PutMapping("/updateRequestStatus")
    @CrossOrigin
    public ResponseEntity<RequestDto> updateRequestStatus(@RequestParam Long requestId, @RequestParam String status) {
        Request updatedRequest = requestService.updateRequestStatus(requestId, status);
        RequestDto requestDto = ObjectMapper.getInstance().convertRequestToRequestDto(updatedRequest);
        return ResponseEntity.ok(requestDto);
    }

}
