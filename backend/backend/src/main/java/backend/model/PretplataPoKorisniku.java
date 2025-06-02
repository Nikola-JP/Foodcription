package backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fc_pretplata_po_korisniku")
public class PretplataPoKorisniku {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPretplatePoKorisniku;

    private Long idKorisnika;
    private Long idPretplate;
    private Date datumPocetka;
    private Date datumZavrsetka;
    private String status;
    private String tipPlacanja;


    public Long getId_pretplate_po_korisniku() {
        return this.idPretplatePoKorisniku;
    }

    public void setId_pretplate_po_korisniku(Long id_pretplate_po_korisniku) {
        this.idPretplatePoKorisniku = id_pretplate_po_korisniku;
    }

    public Long getIdKorisnika() {
        return this.idKorisnika;
    }

    public void setIdKorisnika(Long idKorisnika) {
        this.idKorisnika = idKorisnika;
    }

    public Long getIdPretplate() {
        return this.idPretplate;
    }

    public void setIdPretplate(Long idPretplate) {
        this.idPretplate = idPretplate;
    }

    public Date getDatumPocetka() {
        return this.datumPocetka;
    }

    public void setDatumPocetka(Date datumPocetka) {
        this.datumPocetka = datumPocetka;
    }

    public Date getDatumZavrsetka() {
        return this.datumZavrsetka;
    }

    public void setDatumZavrsetka(Date datumZavrsetka) {
        this.datumZavrsetka = datumZavrsetka;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTipPlacanja() {
        return this.tipPlacanja;
    }

    public void setTip_placanja(String tipPlacanja) {
        this.tipPlacanja = tipPlacanja;
    }
    
}
