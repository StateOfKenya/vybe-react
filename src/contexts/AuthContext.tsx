
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as apiLogin, register as apiRegister, getCurrentUser } from "../api/auth";

type User = {
  id: string;
  email: string;
  is_active: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      if (response?.refreshToken || response?.accessToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        setIsAuthenticated(true);
        
        // After successful login, fetch user data
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (userError) {
          console.error("Failed to fetch user data after login:", userError);
        }
      } else {
        throw new Error('Login failed: Invalid response from server');
      }
    } catch (error) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      throw new Error(error?.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await apiRegister(email, password);
      // After successful registration, we can set the user data
      // but we don't automatically log them in
      setUser({
        id: response.id,
        email: response.email,
        is_active: response.is_active
      });
    } catch (error) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      throw new Error(error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };
  
  // Fetch user data when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && !user) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // If we can't get user data, we should log them out
          logout();
        }
      }
    };
    
    fetchUserData();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
