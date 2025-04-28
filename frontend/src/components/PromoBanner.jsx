import promoImage from "../assets/Food.png"; // tvoja transparentna PNG slika

function PromoBanner() {
  return (
    <section className="py-8 px-8">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-green-400 to-green-500 rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between p-8 relative">
        {/* Tekst */}
        <div className="text-white max-w-xl z-10">
          <h2 className="text-4xl font-bold mb-4">
            Naša hrana je pažljivo pripremljena
          </h2>
          <p className="text-lg">
            Koristimo samo svježe sastojke, pažljivo birane recepte i najvišu
            kvalitetu pripreme kako bismo vam donijeli jela koja su ukusna,
            nutritivno bogata i spremna za vaš užurbani dan.
          </p>
        </div>

        {/* Slika */}
        <div className="mt-8 md:mt-0">
          <img
            src={promoImage}
            alt="Promo Hrana"
            className="h-96 md:h-[450px] object-contain -ml-8 drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
