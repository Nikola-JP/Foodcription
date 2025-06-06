package backend.dto;

public class KorisnikPretplataDTO {
    private String ime;
    private String prezime;
    private String email;
    private String tipPretplate;
    private String status;
    private String role;

    public KorisnikPretplataDTO(String ime, String prezime, String email, String tipPretplate, String status, String role) {
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.tipPretplate = tipPretplate;
        this.status = status;
        this.role = role;
    }


    public String getIme() {
        return this.ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return this.prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTipPretplate() {
        return this.tipPretplate;
    }

    public void setTipPretplate(String tipPretplate) {
        this.tipPretplate = tipPretplate;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
