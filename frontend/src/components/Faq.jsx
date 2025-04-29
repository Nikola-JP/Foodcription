const FAQ = () => {
  const faqs = [
    {
      question: "Što je uključeno u Foodcription pretplatu?",
      answer:
        "Svaka pretplata uključuje dnevne obroke dostavljene na vaša vrata, prilagođene vašim prehrambenim potrebama.",
    },
    {
      question: "Mogu li otkazati pretplatu kad god poželim?",
      answer:
        "Da! Možete otkazati ili pauzirati pretplatu u bilo kojem trenutku bez dodatnih troškova.",
    },
    {
      question: "Postoje li vegetarijanske opcije?",
      answer:
        "Da, nudimo vegetarijanske, veganske, bezglutenske i druge opcije prilagođene vašim potrebama.",
    },
    {
      question: "Koja je razlika između Basic i Premium plana?",
      answer:
        "Basic uključuje obroke od ponedjeljka do petka, dok Premium uključuje cijeli tjedan, ekskluzivna jela i prioritetnu dostavu.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Često postavljana pitanja
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-white rounded shadow p-4">
            <summary className="cursor-pointer font-semibold text-lg">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
