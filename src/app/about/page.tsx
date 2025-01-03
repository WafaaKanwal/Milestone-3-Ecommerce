export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/about-hero.jpg" // Replace with your hero image
            alt="StepStyle Hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            About Us
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the story behind StepStyle and our passion for fashion, quality, and sustainability.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image */}
          <div className="w-full h-96 lg:h-auto rounded-lg overflow-hidden">
            <img
              src="/team.jpg" // Replace with your about image
              alt="StepStyle Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="prose prose-lg text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="mb-6">
              Welcome to <span className="font-semibold text-gray-900">StepStyle</span>, your number one source for all things footwear and bags. We're dedicated to providing you the very best of fashion accessories, with an emphasis on quality, style, and comfort.
            </p>
            <p className="mb-6">
              Founded in 2023 by fashion enthusiasts, <span className="font-semibold text-gray-900">StepStyle</span> has come a long way from its beginnings in a small studio. When we first started out, our passion for stylish and comfortable footwear drove us to quit our day jobs, do tons of research, and turn our passion into a booming online store.
            </p>
            <p className="mb-6">
              We now serve customers all over the world, and are thrilled to be a part of the eco-friendly, fair trade wing of the fashion industry. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p className="mb-6">
              Sincerely,<br />
              <span className="font-semibold text-gray-900">The StepStyle Team</span>
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1: Quality */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">Quality</h3>
                <p className="mt-2 text-gray-600">
                  We are committed to delivering high-quality products that stand the test of time.
                </p>
              </div>
            </div>

            {/* Value 2: Sustainability */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">Sustainability</h3>
                <p className="mt-2 text-gray-600">
                  We prioritize eco-friendly materials and ethical production practices.
                </p>
              </div>
            </div>

            {/* Value 3: Customer Satisfaction */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">Customer Satisfaction</h3>
                <p className="mt-2 text-gray-600">
                  Your happiness is our priority. We strive to exceed your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}