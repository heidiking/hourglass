
import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

interface AdminContextType {
  isAdmin: boolean | null;
  isLoading: boolean;
  makeUserAdmin: (userId: string) => Promise<boolean>;
  removeAdminRole: (userId: string) => Promise<boolean>;
  getUsers: () => Promise<any[]>;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: null,
  isLoading: true,
  makeUserAdmin: async () => false,
  removeAdminRole: async () => false,
  getUsers: async () => [],
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

  // Add the missing admin management functions
  const makeUserAdmin = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { action: 'makeAdmin', data: { userId } }
      });
      
      if (error) {
        console.error("Error making user admin:", error);
        return false;
      }
      
      return data?.success || false;
    } catch (error) {
      console.error("Unexpected error making user admin:", error);
      return false;
    }
  };

  const removeAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { action: 'removeAdmin', data: { userId } }
      });
      
      if (error) {
        console.error("Error removing admin role:", error);
        return false;
      }
      
      return data?.success || false;
    } catch (error) {
      console.error("Unexpected error removing admin role:", error);
      return false;
    }
  };

  const getUsers = async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { action: 'getUsers' }
      });
      
      if (error) {
        console.error("Error getting users:", error);
        return [];
      }
      
      return data?.users || [];
    } catch (error) {
      console.error("Unexpected error getting users:", error);
      return [];
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, makeUserAdmin, removeAdminRole, getUsers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
