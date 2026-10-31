import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UsersList } from './pages/UsersPage';
import { UserProfile } from './pages/User';
import { UsersRegister } from './pages/auth/register';
import { UsersLogin } from './pages/auth/login';


function MainLayout() {
  return (
      <div className="min-h-screen bg-gray-100 font-sans">
        <nav className="bg-white shadow px-6 py-4 flex gap-6 border-b">
          <Link to="/" className="text-gray-700 font-medium hover:text-blue-600">
            Home
          </Link>
          <Link to="/users" className="text-gray-700 font-medium hover:text-blue-600">
            Users
          </Link>
        </nav>

        <main className="p-6">
          <Outlet/>
        </main>
      </div>
  )
}


export function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path='/users' element={<UsersList />}/>
            <Route path='/users/:id' element={<UserProfile />}/>
          </Route>

            // Include routes that dont need navbar
          <Route path='/register' element={<UsersRegister />}/>
          <Route path='/login' element={<UsersLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
