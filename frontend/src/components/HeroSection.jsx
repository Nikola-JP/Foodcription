import heroImage from "../assets/HeroImage.jpg";

function HeroSection() {
  return (
    <section
      className="h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
        Title
      </h1>
      <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Subtitle</p>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition">
          Button 1
        </button>
        <button className="bg-white hover:bg-gray-100 text-green-500 font-semibold py-3 px-6 rounded-full transition">
          Button 2
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
