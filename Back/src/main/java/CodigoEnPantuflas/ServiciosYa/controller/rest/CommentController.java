package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.CommentDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.dao.ICommentDao;
import CodigoEnPantuflas.ServiciosYa.modelo.Comment;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/addComment")
    public ResponseEntity<CommentDto> addComment(@RequestBody @Valid Comment comment) {
        Comment savedComment = commentService.save(comment);
        CommentDto commentDto = ObjectMapper.getInstance().convertCommentToCommentDto(savedComment);
        return ResponseEntity.ok(commentDto);
    }

    @GetMapping("profile/{userId}")
    public ResponseEntity<List<CommentDto>> getCommentsByProfile(@PathVariable Long userId) {
        List<Comment> comments = commentService.findCommentsById(userId);
        List<CommentDto> commentsDto = comments.stream().map(c -> ObjectMapper.getInstance().convertCommentToCommentDto(c)).toList();
        return ResponseEntity.ok(commentsDto);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test endpoint");
    }

}