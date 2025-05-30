# 🧩 Backend integracija za prikaz pojedinačnih jela (MealDetailPage)

## ✅ Cilj:
Omogućiti da frontend aplikacija dinamički prikazuje podatke za svako jelo kad korisnik klikne na njega na `/menu` stranici.

---

## 🧠 Što treba napraviti:

### 1. Endpoint: GET `/api/jela/{id}`

Napraviti REST endpoint u Spring Boot aplikaciji koji vraća podatke o jednom jelu na temelju ID-a.

```java
@GetMapping("/api/jela/{id}")
public ResponseEntity<MealDTO> getMealById(@PathVariable Long id) {
    MealDTO meal = mealService.findById(id); // koristi servis
    return ResponseEntity.ok(meal);
}
```

---

### 2. DTO struktura (MealDTO):

```java
public class MealDTO {
    private Long id;
    private String naziv;
    private String opis;
    private String slika; // relativna putanja npr. /images/shtrukli.jpg
    private String kategorija;
    private NutritivneVrijednosti nutrijenti;
    private List<RecenzijaDTO> recenzije;
    // + getteri i setteri
}

public class NutritivneVrijednosti {
    private int proteini;
    private int ugljikohidrati;
    private int masti;
    // + getteri i setteri
}

public class RecenzijaDTO {
    private String autor;
    private String grad;
    private String tekst;
    // + getteri i setteri
}
```

---

### 3. Frontend poziv (već pripremljen):

Frontend koristi `fetch` poziv na temelju `id` iz URL-a:

```js
useEffect(() => {
  fetch(`http://localhost:8080/api/jela/${id}`)
    .then(res => res.json())
    .then(data => setMeal(data))
    .catch(err => console.error("Greška pri dohvaćanju jela:", err));
}, [id]);
```

---

### 4. Napomena:

- Ako slike nisu na API-u, neka `slika` bude relativna putanja (`/images/ime.jpg`) – frontend ih učitava iz `public/images`.
- Recenzije mogu biti hardkodirane dok se ne izgradi sustav za korisnike i komentare.
- Ako koristiš JPA entitete, možeš napraviti mapiranje iz `MealEntity` u `MealDTO` ručno ili pomoću MapStruct.

---

### ✅ Primjer poziva:

`GET /api/jela/2`

Odgovor:
```json
{
  "id": 2,
  "naziv": "Štrukli sa sirom",
  "opis": "Domaći štrukli pečeni u vrhnju...",
  "slika": "/images/shtrukli.jpg",
  "kategorija": "Tradicionalno",
  "nutrijenti": {
    "proteini": 14,
    "ugljikohidrati": 42,
    "masti": 18
  },
  "recenzije": [
    { "autor": "Ana", "grad": "Zagreb", "tekst": "Savršeno za zimu!" }
  ]
}
```

---

Ako backend endpoint bude vraćao podatke u ovom formatu, frontend će automatski prikazivati točno jelo koje je kliknuto.
