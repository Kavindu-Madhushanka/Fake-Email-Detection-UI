function App() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          <h1 className="mb-6 text-2xl font-bold text-center text-blue-600">
            Fake Email Detector 🔍
          </h1>

          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Paste your email message here..."
          ></textarea>

          <button className="w-full py-3 mt-4 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
            Check Message
          </button>

          <div className="p-4 mt-6 font-bold text-center rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default App;
