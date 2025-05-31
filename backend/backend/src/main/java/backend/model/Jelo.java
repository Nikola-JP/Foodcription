package backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fc_jelo")
public class Jelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jela")
    private Long id;

    @Column(name = "naziv_jela")
    private String naziv;

    @Column(name = "opis_jela")
    private String opis;

    @Column(name = "nutritivne_vrijednosti")
    private String nutritivneVrijednosti;

    @Column(name = "cijena_jela")
    private Double cijena;

    // Getteri i setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNaziv() { return naziv; }
    public void setNaziv(String naziv) { this.naziv = naziv; }

    public String getOpis() { return opis; }
    public void setOpis(String opis) { this.opis = opis; }

    public String getNutritivneVrijednosti() { return nutritivneVrijednosti; }
    public void setNutritivneVrijednosti(String nutritivneVrijednosti) { this.nutritivneVrijednosti = nutritivneVrijednosti; }

    public Double getCijena() { return cijena; }
    public void setCijena(Double cijena) { this.cijena = cijena; }
}
