function HeroSection({ title, subtitle, backgroundImage, primaryButton, secondaryButton }) {
  return (
    <section
      className="h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
        {subtitle}
      </p>
      <div className="flex space-x-4">
        {primaryButton && (
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition">
            {primaryButton}
          </button>
        )}
        {secondaryButton && (
          <button className="bg-white hover:bg-gray-100 text-green-500 font-semibold py-3 px-6 rounded-full transition">
            {secondaryButton}
          </button>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
