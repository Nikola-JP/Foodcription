package backend.dto;

public class KorisnikPretplataUpdateRequest {
    private String email;
    private String ime;
    private String prezime;
    private String tipPretplate;
    private String status;

    // Constructors
    public KorisnikPretplataUpdateRequest() {
    }

    public KorisnikPretplataUpdateRequest(String email, String ime, String prezime, String tipPretplate, String status) {
        this.email = email;
        this.ime = ime;
        this.prezime = prezime;
        this.tipPretplate = tipPretplate;
        this.status = status;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getTipPretplate() {
        return tipPretplate;
    }

    public void setTipPretplate(String tipPretplate) {
        this.tipPretplate = tipPretplate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
