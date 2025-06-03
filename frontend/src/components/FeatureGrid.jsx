import img2 from '../assets/card2.jpg';
import img1 from '../assets/card1.jpg';
import img3 from '../assets/card3.jpg';
import img4 from '../assets/card4.jpg';
import img5 from '../assets/card5.jpg';
import img6 from '../assets/card6.jpg';

function FeatureGrid() {
  return (
    <section className="py-16 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img1} alt="Slika 1" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Svježe pripremljeno svaki dan</h3>
            <p className="text-gray-500">Naši kuhari svakodnevno pripremaju obroke od najkvalitetnijih sastojaka, garantirajući svježinu i okus u svakom zalogaju.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img2} alt="Slika 2" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Raznoliki jelovnici</h3>
            <p className="text-gray-500">Svaki tjedan donosi nove recepte i okuse  od tradicionalnih do modernih jela, za svačije nepce.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img3} alt="Slika 3" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Prilagođeno tvom životnom stilu</h3>
            <p className="text-gray-500">Bilo da si u žurbi ili želiš uživati u mirnom ručku, naši obroci su spremni za posluživanje kad god ti poželiš.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img4} alt="Slika 4" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Obroci spremni za mikrovalnu ili pećnicu</h3>
            <p className="text-gray-500">Svaki obrok dolazi zapakiran i spreman za brzo podgrijavanje  uživaj u toplom ručku za nekoliko minuta.</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img5} alt="Slika 5" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Jednostavna narudžba, brza dostava</h3>
            <p className="text-gray-500">Odaberi svoj plan, naruči online i uživaj u obrocima bez stresa mi brinemo o svemu ostalom.</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <img src={img6} alt="Slika 6" className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-green-600 text-xl font-semibold mb-2">Nutritivno uravnoteženo</h3>
            <p className="text-gray-500">Svaki obrok pažljivo je osmišljen kako bi zadovoljio tvoje dnevne potrebe za energijom i zdravljem.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeatureGrid;
