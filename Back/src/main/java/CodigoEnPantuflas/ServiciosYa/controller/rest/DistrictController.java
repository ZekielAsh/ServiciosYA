package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.DistrictDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.Norte;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.Oeste;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.Sur;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/district")
public class DistrictController {

    @GetMapping("/getAllDistricts")
    @CrossOrigin
    public ResponseEntity<List<DistrictDto>> getAllDistricts() {
        Set<Class<? extends Enum<?>>> allDistricts = new HashSet<>(Arrays.asList(Norte.class, Sur.class, Oeste.class));

        List<DistrictDto> districtsDto = allDistricts.stream()
                .map(districtClass -> ObjectMapper.getInstance().convertoToDisctrictDto(districtClass))
                .collect(Collectors.toList());

        return ResponseEntity.ok(districtsDto);
    }
}

