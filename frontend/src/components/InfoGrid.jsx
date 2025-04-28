import { Info } from 'lucide-react'; // koristićemo ikonu iz lucide-react

function InfoGrid() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Info 1 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Kuhari info</h3>
            <p className="text-gray-600 text-sm">Tekst koji govori o načinu pripreme hrane.</p>
          </div>
        </div>

        {/* Info 2 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Hrana info</h3>
            <p className="text-gray-600 text-sm">Opći info o hrani koja se radi.</p>
          </div>
        </div>

        {/* Info 3 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Hrana spremna za mikrovalnu / pećnicu</h3>
            <p className="text-gray-600 text-sm">Dodatni opis da je hrana spremna.</p>
          </div>
        </div>

        {/* Info 4 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Naglasak jeftine cijene</h3>
            <p className="text-gray-600 text-sm">Pristupačna cijena planova.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default InfoGrid;
