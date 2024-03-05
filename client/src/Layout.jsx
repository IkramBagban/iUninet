import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-[#3FAAA8F2] to-[#39B792] text-white text-2xl font-bold py-4 px-6 text-left">
        <h1>Header</h1>
      </header>

      <div className="flex flex-1">
        <aside className=" bg-white border-r border-gray-200">
          <nav className="py-4">
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 text-teal-600 hover:bg-gray-100 rounded-md transition duration-300 ${isActive ? "bg-gray-100" : ""
                }`
              }
            >
              <span className="material-symbols-outlined">chat</span>
              {/* <span>Chat</span> */}
            </NavLink>
            <NavLink
              to="/note"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 text-teal-600 hover:bg-gray-100 rounded-md transition duration-300 ${isActive ? "bg-gray-100" : ""
                }`
              }
            >
              <span className="material-symbols-outlined">note_alt</span>
              {/* <span>Notes</span> */}
            </NavLink>
          </nav>
        </aside>

        <main className="w-5/6  border-l-1  ">
          {/* <main className="border-l-1  "> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
