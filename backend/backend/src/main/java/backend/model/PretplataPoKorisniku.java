package backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fc_pretplata_po_korisniku")
public class PretplataPoKorisniku {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPretplatePoKorisniku;

    @ManyToOne
    @JoinColumn(name = "id_korisnika", nullable = false)
    private Korisnik korisnik;

    @ManyToOne
    @JoinColumn(name = "id_pretplate", nullable = false)
    private Pretplata pretplata;

    private Date datumPocetka;
    private Date datumZavrsetka;
    private String status;
    private String tipPlacanja;

    // Getters and Setters
    public Long getIdPretplatePoKorisniku() {
        return idPretplatePoKorisniku;
    }

    public void setIdPretplatePoKorisniku(Long idPretplatePoKorisniku) {
        this.idPretplatePoKorisniku = idPretplatePoKorisniku;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public Pretplata getPretplata() {
        return pretplata;
    }

    public void setPretplata(Pretplata pretplata) {
        this.pretplata = pretplata;
    }

    public Date getDatumPocetka() {
        return datumPocetka;
    }

    public void setDatumPocetka(Date datumPocetka) {
        this.datumPocetka = datumPocetka;
    }

    public Date getDatumZavrsetka() {
        return datumZavrsetka;
    }

    public void setDatumZavrsetka(Date datumZavrsetka) {
        this.datumZavrsetka = datumZavrsetka;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTipPlacanja() {
        return tipPlacanja;
    }

    public void setTipPlacanja(String tipPlacanja) {
        this.tipPlacanja = tipPlacanja;
    }
}
