const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-600 mb-6">404</h1>
      <p className="text-lg mb-4">Oops! The page you are looking for does not exist.</p>
      <a 
        href="/" 
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;