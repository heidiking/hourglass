
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AdminContextType = {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<boolean>;
  makeUserAdmin: (userId: string) => Promise<boolean>;
  removeAdminRole: (userId: string) => Promise<boolean>;
  getUsers: () => Promise<any[]>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const checkAdmin = async () => {
      await checkAdminStatus();
    };
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await checkAdminStatus();
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });
    
    checkAdmin();
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const checkAdminStatus = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        return false;
      }
      
      // Call the is_admin function without any arguments
      const { data, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        return false;
      }
      
      setIsAdmin(!!data);
      return !!data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const getUsers = async (): Promise<any[]> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { action: 'getUsers' },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        throw error;
      }
      
      return data.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
      return [];
    }
  };
  
  const makeUserAdmin = async (userId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { 
          action: 'makeAdmin',
          data: { userId }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.success) {
        toast.success('Admin role assigned successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error making user admin:', error);
      toast.error('Failed to assign admin role');
      return false;
    }
  };
  
  const removeAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }
      
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { 
          action: 'removeAdmin',
          data: { userId }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.success) {
        toast.success('Admin role removed successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error removing admin role:', error);
      toast.error('Failed to remove admin role');
      return false;
    }
  };
  
  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoading,
        checkAdminStatus,
        makeUserAdmin,
        removeAdminRole,
        getUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
