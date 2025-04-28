
import { Home, TrendingUp, Cloud, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Finance", icon: TrendingUp, path: "/finance" },
    { name: "Weather", icon: Cloud, path: "/weather" },
    { name: "News", icon: Newspaper, path: "/news" },
  ];

  return (
    <aside 
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out h-screen fixed lg:relative z-30`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && (
          <span className="text-xl font-bold text-primary-500 dark:text-primary-400 transition-opacity duration-300">
            Analytics
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className={`${isOpen ? "ml-auto" : "mx-auto"} p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            <path d={isOpen ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
          </svg>
        </button>
      </div>
      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md group transition-colors"
              >
                <item.icon className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400" />
                {isOpen && (
                  <span className="ml-3 text-sm font-medium transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        {isOpen ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
              U
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
