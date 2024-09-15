package CodigoEnPantuflas.ServiciosYa.controller.dto;

public class ErrorDto {
    String status;
    Integer error;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getError() {
        return error;
    }

    public void setError(Integer error) {
        this.error = error;
    }

    public ErrorDto(String status, Integer error) {
        this.status = status;
        this.error = error;
    }

}
