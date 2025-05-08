
import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = (email: string, password: string) => {
    // Mock authentication - just check if email and password are provided
    if (email && password) {
      // Mock user data
      const mockUser = {
        email,
        name: email.split('@')[0], // Use part of email as name
      };
      
      setUser(mockUser);
      
      // Save to localStorage for persistence
      localStorage.setItem('adScribeUser', JSON.stringify(mockUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Please provide both email and password",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adScribeUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Check for existing user in localStorage on mount
  useState(() => {
    const savedUser = localStorage.getItem('adScribeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
