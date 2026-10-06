# 🧩 Backend Integration for Displaying Individual Meals (MealDetailPage)
## ✅ Goal:
Enable the frontend application to dynamically display data for each meal when the user clicks on it on the `/menu` page.
## 🧠 What Needs to Be Done:
### 1. Endpoint: GET `/api/jela/{id}`
Create a REST endpoint in the Spring Boot application that returns data for a single meal based on its ID.
```java
@GetMapping("/api/jela/{id}")
public ResponseEntity<MealDTO> getMealById(@PathVariable Long id) {
    MealDTO meal = mealService.findById(id); // use the service
    return ResponseEntity.ok(meal);
}
```
### 2. DTO Structure (MealDTO):
```java
public class MealDTO {
    private Long id;
    private String naziv;
    private String opis;
    private String slika; // relative path, e.g. /images/shtrukli.jpg
    private String kategorija;
    private NutritivneVrijednosti nutrijenti;
    private List<RecenzijaDTO> recenzije;
    // + getters and setters
}
public class NutritivneVrijednosti {
    private int proteini;
    private int ugljikohidrati;
    private int masti;
    // + getters and setters
}
public class RecenzijaDTO {
    private String autor;
    private String grad;
    private String tekst;
    // + getters and setters
}
```
### 3. Frontend Request (Already Prepared):
The frontend uses a `fetch` request based on the `id` from the URL:
```js
useEffect(() => {
  fetch(`http://localhost:8080/api/jela/${id}`)
    .then(res => res.json())
    .then(data => setMeal(data))
    .catch(err => console.error("Error fetching the meal:", err));
}, [id]);
```
### 4. Notes:
- If images are not served by the API, set `slika` to a relative path (`/images/name.jpg`) – the frontend loads them from `public/images`.
- Reviews can be hardcoded until the user and comment system is built.
- If you use JPA entities, you can map `MealEntity` to `MealDTO` manually or using MapStruct.
### ✅ Example Request:
`GET /api/jela/2`
Response:
```json
{
  "id": 2,
  "naziv": "Cheese Štrukli",
  "opis": "Homemade štrukli baked in cream...",
  "slika": "/images/shtrukli.jpg",
  "kategorija": "Traditional",
  "nutrijenti": {
    "proteini": 14,
    "ugljikohidrati": 42,
    "masti": 18
  },
  "recenzije": [
    { "autor": "Ana", "grad": "Zagreb", "tekst": "Perfect for winter!" }
  ]
}
```
If the backend endpoint returns data in this format, the frontend will automatically display the exact meal that was clicked.
