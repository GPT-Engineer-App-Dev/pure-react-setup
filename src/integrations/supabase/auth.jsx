import { useState, useEffect, createContext, useContext } from 'react';
import { SupabaseProvider } from './index.js';
import { useQueryClient } from '@tanstack/react-query';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  return (
    <SupabaseProvider>
      <SupabaseAuthProviderInner>
        {children}
      </SupabaseAuthProviderInner>
    </SupabaseProvider>
  );
}

export const SupabaseAuthProviderInner = ({ children }) => {
  const [session, setSession] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const getSession = async () => {
      // Mock session retrieval
      const session = { user: { email: 'mockuser@example.com' } };
      setSession(session);
    };

    getSession();

    return () => {
      // Mock cleanup
    };
  }, [queryClient]);

  const logout = async () => {
    // Mock logout
    setSession(null);
    queryClient.invalidateQueries('user');
  };

  return (
    <SupabaseAuthContext.Provider value={{ session, logout }}>
    {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  return useContext(SupabaseAuthContext);
};

export const SupabaseAuthUI = () => (
  <div>
    <p>Mock Auth UI</p>
    <button onClick={() => alert('Mock login')}>Login</button>
  </div>
);

/* example usage (do not remove)

// assumed MyComponent is used within SupabaseAuthProvider
import { useSupabaseAuth, SupabaseAuthUI } from './path/to/integrations/supabase/auth.jsx';
const MyComponent = () => {
  const {session, logout} = useSupabaseAuth();
  const [showLogin, setShowLogin] = useState(false);
  if (!session) return (showLogin?<SupabaseAuthUI />:<button onClick={() => setShowLogin(true)}>Login</button>);
  return (<button onClick={() => {setShowLogin(false); logout()}}>Logout {session.user.email}</button>);
};

*/