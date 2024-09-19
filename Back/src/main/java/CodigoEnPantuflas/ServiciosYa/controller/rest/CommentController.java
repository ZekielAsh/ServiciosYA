package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.dao.ICommentDao;
import CodigoEnPantuflas.ServiciosYa.modelo.Comment;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("comments/addComment")
    public ResponseEntity<Comment> addComment(@RequestBody @Valid Comment comment) {
        Comment savedComment = commentService.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("comments/profile/{userId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByProfile(@PathVariable Long userId) {
        List<Comment> comments = commentService.findCommentsById(userId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/comments/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test endpoint");
    }

}