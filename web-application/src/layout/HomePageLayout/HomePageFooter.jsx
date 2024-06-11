export default function HomePageFooter() {
  return (
    <>
      <div className="flex-1 space-y-4">
        <p className="font-semibold">About Us</p>
        <p className="text-xs">
          Discover the art of fragrance with SCENTWAVE. Our mission is to create
          captivating scents that leave a lasting impression. From timeless
          classics to contemporary creations, we blend the finest ingredients to
          bring you perfumes that evoke emotions and memories.
        </p>
      </div>
      <div className="flex-1 space-y-4">
        <p className="font-semibold">Customer Service</p>
        <p className="text-sm">Contact Us:</p>
        <p className="text-xs">
          We're here to help. Reach out to our support team at{" "}
          <a href="mailto:support@example.com" className="underline">
            support@example.com
          </a>
          .
        </p>
        <p className="text-sm">Shipping & Returns:</p>
        <p className="text-xs">
          Learn about our shipping policies and how to return items.
        </p>
        <p className="text-sm">FAQ:</p>
        <p className="text-xs">Find answers to common questions.</p>
      </div>
      <div className="flex-1 space-y-4">
        <p className="font-semibold">Follow Us</p>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            aria-label="Facebook"
            className="text-white hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 0h-20c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10.615v-8.726h-2.944v-3.409h2.944v-2.555c0-2.922 1.787-4.516 4.397-4.516 1.251 0 2.326.093 2.638.135v3.056h-1.809c-1.42 0-1.694.674-1.694 1.663v2.217h3.39l-.442 3.409h-2.948v8.726h5.784c1.104 0 2-.896 2-2v-20c0-1.104-.896-2-2-2z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            className="text-white hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.42.403.592.205 1.017.453 1.465.9.448.448.695.873.9 1.465.163.45.347 1.25.403 2.42.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.42-.205.592-.453 1.017-.9 1.465-.448.448-.873.695-1.465.9-.45.163-1.25.347-2.42.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.42-.403-.592-.205-1.017-.453-1.465-.9-.448-.448-.695-.873-.9-1.465-.163-.45-.347-1.25-.403-2.42-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.42.205-.592.453-1.017.9-1.465.448-.448.873-.695 1.465-.9.45-.163 1.25-.347 2.42-.403 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.015-4.947.072-1.286.058-2.172.254-2.947.535-.806.291-1.494.678-2.17 1.354-.676.676-1.063 1.364-1.354 2.17-.281.775-.477 1.661-.535 2.947-.057 1.28-.072 1.688-.072 4.947s.015 3.667.072 4.947c.058 1.286.254 2.172.535 2.947.291.806.678 1.494 1.354 2.17.676.676 1.364 1.063 2.17 1.354.775.281 1.661.477 2.947.535 1.28.057 1.688.072 4.947.072s3.667-.015 4.947-.072c1.286-.058 2.172-.254 2.947-.535.806-.291 1.494-.678 2.17-1.354.676-.676 1.063-1.364 1.354-2.17.281-.775.477-1.661.535-2.947.057-1.28.072-1.688.072-4.947s-.015-3.667-.072-4.947c-.058-1.286-.254-2.172-.535-2.947-.291-.806-.678-1.494-1.354-2.17-.676-.676-1.364-1.063-2.17-1.354-.775-.281-1.661-.477-2.947-.535-1.28-.057-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z" />
            </svg>
          </a>
          <a
            href="https://www.twitter.com"
            aria-label="Twitter"
            className="text-white hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.93 2.207-4.93 4.93 0 .386.044.762.128 1.124-4.096-.205-7.725-2.17-10.153-5.159-.425.729-.667 1.574-.667 2.476 0 1.71.87 3.217 2.188 4.099-.807-.026-1.566-.083-2.228-.348v.035c0 2.385 1.698 4.374 3.946 4.829-.413.111-.85.171-1.3.171-.317 0-.626-.031-.927-.088.627 1.956 2.445 3.379 4.6 3.42-1.685 1.321-3.809 2.107-6.115 2.107-.398 0-.79-.023-1.176-.069 2.18 1.397 4.768 2.211 7.548 2.211 9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.015-.636.961-.694 1.8-1.562 2.457-2.549z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
