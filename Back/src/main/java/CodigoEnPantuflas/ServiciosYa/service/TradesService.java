package CodigoEnPantuflas.ServiciosYa.service;

import CodigoEnPantuflas.ServiciosYa.modelo.Trades;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TradesService {

    public Set<String> getAllTrades() {
        return Arrays.stream(Trades.values())
                .map(Enum::name)
                .collect(Collectors.toSet());
    }
}
