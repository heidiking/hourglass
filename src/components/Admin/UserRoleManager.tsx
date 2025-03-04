
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Shield, ShieldX, Users, Loader } from 'lucide-react';

type UserWithRole = {
  id: string;
  email: string;
  created_at: string;
  isAdmin: boolean;
};

const UserRoleManager = () => {
  const { isAdmin, makeUserAdmin, removeAdminRole, getUsers } = useAdmin();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleAdmin = async (userId: string, currentIsAdmin: boolean) => {
    if (currentIsAdmin) {
      const success = await removeAdminRole(userId);
      if (success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isAdmin: false } : user
        ));
      }
    } else {
      const success = await makeUserAdmin(userId);
      if (success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, isAdmin: true } : user
        ));
      }
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="p-6 text-center">
        <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2 text-black">Admin Access Required</h2>
        <p className="text-gray-600">
          You don't have permission to view this page. Please contact an administrator if you believe this is an error.
        </p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-black">
          <Users className="h-6 w-6" />
          User Role Management
        </h2>
        <Button 
          onClick={fetchUsers} 
          variant="outline"
          disabled={loading}
          className="text-black bg-white hover:bg-white/90"
        >
          {loading ? <Loader className="h-4 w-4 animate-spin mr-2 text-black" /> : null}
          <span className="text-black">Refresh</span>
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.isAdmin ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Admin
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAdmin(user.id, user.isAdmin)}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      {user.isAdmin ? (
                        <>
                          <ShieldX className="h-4 w-4 mr-2 text-black" />
                          <span className="text-black">Remove Admin</span>
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2 text-black" />
                          <span className="text-black">Make Admin</span>
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRoleManager;
