// ⚠️ Backend kolega treba dohvatiti listu jela za korisnika, ovisno o pretplati (Basic: 5 dana, Premium: 7 dana)
  // Ovdje dolje mock podaci služe za prikaz korisnicima ovisno o tipu pretplate
  // TODO: Ovdje implementirati fetch poziv za backend:
  // fetch(`/api/user-meals?subscriptionType=basic|premium`)
  //   .then(response => response.json())
  //   .then(data => setMeals(data))

  // 👇 Ako je pretplata BASIC (pon - pet)
  { day: 'Ponedjeljak', name: 'Štrukli sa sirom', delivered: true },
  { day: 'Utorak', name: 'Goulash', delivered: false },
  { day: 'Srijeda', name: 'Voćna salata', delivered: false },
  { day: 'Četvrtak', name: 'Burger od teletine', delivered: false },
  { day: 'Petak', name: 'Salata od banane', delivered: false },

  // 👇 Ako je pretplata PREMIUM (pon - ned)
  // ⚠️ Ove dane treba prikazivati samo ako korisnik ima premium pretplatu
  { day: 'Subota', name: 'Štrukli sa sirom', delivered: false },
  { day: 'Nedjelja', name: 'Goulash', delivered: false },
];
