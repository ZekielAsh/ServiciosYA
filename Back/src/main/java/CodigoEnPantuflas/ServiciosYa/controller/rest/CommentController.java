package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.CommentDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.SimpleUserDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.controller.utils.Validator;
import CodigoEnPantuflas.ServiciosYa.dao.ICommentDao;
import CodigoEnPantuflas.ServiciosYa.modelo.Comment;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.CommentService;
import CodigoEnPantuflas.ServiciosYa.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/addComment")
    @CrossOrigin
    public ResponseEntity<CommentDto> addComment(@RequestBody CommentDto commentDto, @RequestParam String email) {
        Validator.getInstance().validateComment(commentDto);
        User user = userService.getByMail(email);
        Comment savedComment = commentService.addComment(commentDto.getText(), user);
        SimpleUserDto simpleUserDto = ObjectMapper.getInstance().convertUserToSimpleUserDto(user);
        commentDto.setUser(simpleUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentDto);
    }

    @GetMapping("profile/{email}")
    @CrossOrigin
    public ResponseEntity<List<CommentDto>> getCommentsByProfile(@PathVariable String email) {
        User user = userService.getByMail(email);
        List<CommentDto> commentsDto = user.getComments().stream().map(c -> ObjectMapper.getInstance().convertCommentToCommentDto(c)).toList();
        return ResponseEntity.ok(commentsDto);
    }

}