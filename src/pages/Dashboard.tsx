import React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthApi } from "@/hooks/useAuthApi"
import { Loader2 } from "lucide-react"

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { useCurrentUser } = useAuthApi()
  const { data: userData, loading, error, refetch } = useCurrentUser()
  
  // Use userData if available, otherwise fall back to user from context
  const displayUser = userData || user

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Welcome to your dashboard! Here you can view your activities, manage your profile, and access exclusive features.
      </p>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Profile</CardTitle>
          {loading ? (
            <Button variant="ghost" size="sm" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              Refresh
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
              <p className="text-red-600 dark:text-red-400">{error.message}</p>
            </div>
          )}
          
          {loading && !displayUser ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : displayUser ? (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">User ID:</span> {displayUser.id}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {displayUser.email}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {displayUser.is_active ? (
                  <span className="text-green-600 dark:text-green-400">Active</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">Inactive</span>
                )}
              </div>
            </div>
          ) : (
            <p>No user information available. Please log in again.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { Dashboard }