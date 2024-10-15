package CodigoEnPantuflas.ServiciosYa.controller.rest;

import CodigoEnPantuflas.ServiciosYa.controller.dto.DistrictDto;
import CodigoEnPantuflas.ServiciosYa.controller.dto.RequestDto;
import CodigoEnPantuflas.ServiciosYa.controller.utils.ObjectMapper;
import CodigoEnPantuflas.ServiciosYa.modelo.User;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.DistrictNorth;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.DistrictSouth;
import CodigoEnPantuflas.ServiciosYa.modelo.districts.DistrictWest;
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
        Set<Class<? extends Enum<?>>> allDistricts = new HashSet<>(Arrays.asList(DistrictNorth.class, DistrictSouth.class, DistrictWest.class));

        List<DistrictDto> districtsDto = allDistricts.stream()
                .map(districtClass -> ObjectMapper.getInstance().convertoToDisctrictDto(districtClass))
                .collect(Collectors.toList());

        return ResponseEntity.ok(districtsDto);
    }
}

