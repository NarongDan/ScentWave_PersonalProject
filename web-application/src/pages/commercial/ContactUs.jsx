import MapComponent from "../../features/homepage/components/MapComponent";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="px-8 text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Reach Out to Us
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Have questions or feedback? We'd love to hear from you! Reach out to
            our team through any of the following channels:
          </p>
          <ul className="list-disc text-gray-600 mt-4 ml-6">
            <li>Phone: +1-800-123-4567</li>
            <li>Email: info@scentwave.com</li>
            <li>Address: 123 Fragrance Ave, City, Country</li>
          </ul>
          <div>
            <header className="mt-5">
              <h1 className="text-2xl font-bold"></h1>
              <MapComponent />
            </header>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Send Us a Message
          </h3>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-600 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 bg-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
