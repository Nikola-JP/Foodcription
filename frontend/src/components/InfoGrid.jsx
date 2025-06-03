import { Info } from 'lucide-react'; // koristićemo ikonu iz lucide-react

function InfoGrid() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Info 1 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Kuhari s iskustvom</h3>
            <p className="text-gray-600 text-sm">Naš tim čine profesionalni kuhari s dugogodišnjim iskustvom u pripremi zdravih i ukusnih jela.</p>
          </div>
        </div>

        {/* Info 2 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Samo provjereni sastojci</h3>
            <p className="text-gray-600 text-sm">Koristimo isključivo svježe i lokalne namirnice, bez kompromisa na kvaliteti.</p>
          </div>
        </div>

        {/* Info 3 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Pristupačne cijene</h3>
            <p className="text-gray-600 text-sm">Naša misija je omogućiti svakome zdrav i ukusan obrok, bez opterećenja za novčanik.</p>
          </div>
        </div>

        {/* Info 4 */}
        <div className="flex items-start space-x-4">
          <Info className="text-green-500 w-8 h-8 mt-1" />
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-1">Pristupačne cijene</h3>
            <p className="text-gray-600 text-sm">Naša misija je omogućiti svakome zdrav i ukusan obrok, bez opterećenja za novčanik</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default InfoGrid;
