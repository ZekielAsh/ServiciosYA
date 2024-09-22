package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.dao.ICommentDao;
import CodigoEnPantuflas.ServiciosYa.modelo.Comment;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service @AllArgsConstructor
public class CommentService {
    @Autowired
    ICommentDao commentDao;

    public Comment save(Comment comment){
        Comment savedComment = commentDao.save(comment);
        savedComment.getUser().addNewComment(comment);
        return savedComment;
    }

    public List<Comment> findCommentsById(Long userId) {
        return commentDao.findCommentsById(userId);

    }
}
