"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Something went wrong
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Unable to load this page
            </h1>
            <p className="text-gray-600">
              {error?.message ||
                "We hit an unexpected issue while rendering this route."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-6 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

