
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRoleManager from './UserRoleManager';
import { Shield, Loader } from 'lucide-react';

const AdminPage = () => {
  const { isAdmin, isLoading } = useAdmin();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="p-6 text-center max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md">
        <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2 text-black">Admin Access Required</h2>
        <p className="text-gray-600">
          You don't have permission to access the admin panel. Please contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="text-black">User Management</TabsTrigger>
          <TabsTrigger value="system" className="text-black">System Settings</TabsTrigger>
          <TabsTrigger value="logs" className="text-black">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="bg-white rounded-lg shadow-md p-4">
          <UserRoleManager />
        </TabsContent>
        
        <TabsContent value="system" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-black">System Settings</h2>
          <p className="text-gray-600">
            This section is under development. Here you will be able to configure global application settings.
          </p>
        </TabsContent>
        
        <TabsContent value="logs" className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-black">Activity Logs</h2>
          <p className="text-gray-600">
            This section is under development. Here you will be able to view system-wide activity logs.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
