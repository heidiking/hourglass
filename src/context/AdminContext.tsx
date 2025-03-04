import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

interface AdminContextType {
  isAdmin: boolean | null;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: null,
  isLoading: true,
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      if (session) {
        try {
          // Call the is_admin function without any arguments
          const { data, error } = await supabase.rpc('is_admin');

          if (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false); // Default to false in case of error
          } else {
            setIsAdmin(data);
          }
        } catch (error) {
          console.error("Unexpected error checking admin status:", error);
          setIsAdmin(false); // Default to false in case of error
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [session, supabase]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
