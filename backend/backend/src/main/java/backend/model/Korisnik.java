package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fc_korisnik")
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_korisnika")
    private Long idKorisnika;

    @Column(name = "ime_korisnika")
    private String imeKorisnika;

    @Column(name = "prezime_korisnika")
    private String prezimeKorisnika;

    @Column(name = "email_korisnika", unique = true)
    private String emailKorisnika;

    @Column(name = "lozinka_korisnika")
    private String lozinkaKorisnika;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "mob_korisnika")
    private String phone;

    @ManyToOne
    @JoinColumn(name = "pretplata_id")
    private Pretplata pretplata;

    public enum Role {
        user, admin
    }


    public Long getIdKorisnika() {
        return this.idKorisnika;
    }

    public void setIdKorisnika(Long idKorisnika) {
        this.idKorisnika = idKorisnika;
    }

    public String getImeKorisnika() {
        return this.imeKorisnika;
    }

    public void setImeKorisnika(String imeKorisnika) {
        this.imeKorisnika = imeKorisnika;
    }

    public String getPrezimeKorisnika() {
        return this.prezimeKorisnika;
    }

    public void setPrezimeKorisnika(String prezimeKorisnika) {
        this.prezimeKorisnika = prezimeKorisnika;
    }

    public String getEmailKorisnika() {
        return this.emailKorisnika;
    }

    public void setEmailKorisnika(String emailKorisnika) {
        this.emailKorisnika = emailKorisnika;
    }

    public String getLozinkaKorisnika() {
        return this.lozinkaKorisnika;
    }

    public void setLozinkaKorisnika(String lozinkaKorisnika) {
        this.lozinkaKorisnika = lozinkaKorisnika;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public void setMobKorisnika(String mobKorisnika) {
        this.phone = mobKorisnika;
    }

    public Pretplata getPretplata() {
        return this.pretplata;
    }

    public void setPretplata(Pretplata pretplata) {
        this.pretplata = pretplata;
    }
}