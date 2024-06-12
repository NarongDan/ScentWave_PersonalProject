export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-[40em]">
      <h2 className="px-8 text-2xl font-bold text-gray-800 mb-6">About Us</h2>
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Our Story
          </h3>
          <p className="text-gray-600 leading-relaxed">
            At ScentWave, we believe that scent is more than just a fragrance;
            it's a statement, an expression of individuality, and a reflection
            of personal style. Our mission is to empower individuals to embrace
            their uniqueness and confidence through the power of scent.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            We curate a diverse and exclusive collection of fragrances that
            cater to the diverse tastes and preferences of our customers. With a
            seamless and personalized shopping experience, we ensure that every
            customer finds their signature scent with ease.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to create a world where everyone can effortlessly
            discover and embrace the perfect scent that resonates with their
            personality and lifestyle. We envision a community of fragrance
            enthusiasts sharing experiences, tips, and recommendations,
            fostering a culture of appreciation for the art of perfumery.
          </p>
        </div>
      </div>
    </div>
  );
}
