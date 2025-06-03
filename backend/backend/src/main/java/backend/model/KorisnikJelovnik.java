package backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fc_korisnik_jelovnik")
public class KorisnikJelovnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "korisnik_id")
    private Long korisnikId;

    @Column(name = "dan")
    private String dan;

    @Column(name = "jelo_id")
    private Long jeloId;

    // GETTERI
    public Long getId() { return id; }
    public Long getKorisnikId() { return korisnikId; }
    public String getDan() { return dan; }
    public Long getJeloId() { return jeloId; }

    // SETTERI
    public void setId(Long id) { this.id = id; }
    public void setKorisnikId(Long korisnikId) { this.korisnikId = korisnikId; }
    public void setDan(String dan) { this.dan = dan; }
    public void setJeloId(Long jeloId) { this.jeloId = jeloId; }
}
