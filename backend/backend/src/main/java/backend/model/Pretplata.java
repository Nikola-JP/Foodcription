    package backend.model;

    

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;

    @Entity
    @Table(name = "fc_pretplata")
    public class Pretplata {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long idPretplata;

        private String tipPretplate;


        public Long getIdPretplata() {
            return this.idPretplata;
        }

        public void setIdPretplata(Long idPretplata) {
            this.idPretplata = idPretplata;
        }

        public String getTipPretplate() {
            return this.tipPretplate;
        }

        public void setTipPretplate(String tipPretplate) {
            this.tipPretplate = tipPretplate;
        }

    }