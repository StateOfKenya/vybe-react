import React from "react"

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Welcome to your dashboard! Here you can view your activities, manage your profile, and access exclusive features.
      </p>
    </div>
  )
}

export { Dashboard } 