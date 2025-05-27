package backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "FC_Korisnik")
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idKorisnika;

    private String imeKorisnika;
    private String prezimeKorisnika;
    private String emailKorisnika;
    private String lozinkaKorisnika;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        user, admin
    }

    // Getters and Setters

    public Long getIdKorisnika() {
        return idKorisnika;
    }

    public void setIdKorisnika(Long idKorisnika) {
        this.idKorisnika = idKorisnika;
    }

    public String getImeKorisnika() {
        return imeKorisnika;
    }

    public void setImeKorisnika(String imeKorisnika) {
        this.imeKorisnika = imeKorisnika;
    }

    public String getPrezimeKorisnika() {
        return prezimeKorisnika;
    }

    public void setPrezimeKorisnika(String prezimeKorisnika) {
        this.prezimeKorisnika = prezimeKorisnika;
    }

    public String getEmailKorisnika() {
        return emailKorisnika;
    }

    public void setEmailKorisnika(String emailKorisnika) {
        this.emailKorisnika = emailKorisnika;
    }

    public String getLozinkaKorisnika() {
        return lozinkaKorisnika;
    }

    public void setLozinkaKorisnika(String lozinkaKorisnika) {
        this.lozinkaKorisnika = lozinkaKorisnika;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
