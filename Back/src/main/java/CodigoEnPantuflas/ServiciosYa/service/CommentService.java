package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.dao.ICommentDao;
import CodigoEnPantuflas.ServiciosYa.dao.IUserDao;
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
    @Autowired
    IUserDao userDao;

    public Comment addComment(String text, User user) {
        Comment comment = new Comment();
        comment.setText(text);
        comment.setUser(user);
        user.addNewComment(comment);
        return commentDao.save(comment);
    }

    public List<Comment> findCommentsById(Long userId) {
        return commentDao.findCommentsById(userId);

    }
}
