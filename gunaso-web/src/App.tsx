import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans">
        {/* Persistent Navigation Bar */}
        <nav className="bg-white shadow px-6 py-4 flex gap-6 border-b">
          <Link to="/" className="text-gray-700 font-medium hover:text-blue-600">
            Home
          </Link>
          <Link to="/users" className="text-gray-700 font-medium hover:text-blue-600">
            Users
          </Link>
        </nav>

        {/* Dynamic Page Content Based on Route */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
