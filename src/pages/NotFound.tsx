
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-noovimo-50 to-white p-4">
      <div className="glass-card rounded-2xl p-12 text-center max-w-md animate-scale-in">
        <h1 className="text-7xl font-bold text-noovimo-500 mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-6">Page introuvable</p>
        <p className="text-muted-foreground mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-5 py-3 bg-noovimo-500 text-white rounded-xl hover:bg-noovimo-600 transition-colors"
        >
          <Home size={18} className="mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
