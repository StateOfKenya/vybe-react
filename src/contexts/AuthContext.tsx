
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as apiLogin, register as apiRegister, getCurrentUser } from "../api/auth";

type User = {
  id: string;
  email: string;
  is_active: boolean;
};

type AuthResponse = {
  success: boolean;
  message: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string) => Promise<AuthResponse>;
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
      if (response.success) {
        localStorage.setItem("refreshToken", response.data.refresh_token);
        localStorage.setItem("accessToken", response.data.access_token);
        setIsAuthenticated(true);
        
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (userError) {
          console.error("Failed to fetch user data after login:", userError);
        }
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Login failed: Invalid response from server');
      }
    } catch (error) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return { success: false, message: errorMessage };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await apiRegister(email, password);
      if (response.success) {
        setUser({
          id: response.data.id,
          email: response.data.email,
          is_active: response.data.is_active
        });
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      return { success: false, message: errorMessage };
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
