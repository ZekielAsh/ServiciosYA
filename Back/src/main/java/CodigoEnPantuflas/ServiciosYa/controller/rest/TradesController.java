package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.UserDto;
import CodigoEnPantuflas.ServiciosYa.service.TradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/trades")
public class TradesController {
    @Autowired
    TradesService tradesService;

    @GetMapping("/getAllTrades")
    @CrossOrigin
    public ResponseEntity<Set<String>> getAllTrades(){
        Set<String> trades  = tradesService.getAllTrades();
        return ResponseEntity.status(HttpStatus.OK).body(trades);
    }
}
