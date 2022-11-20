"use client"

import NavigationBar from "../../components/layouts/navigation/Navigation"
import AuthRoute from "../../middlewares/authRoute"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthRoute>
      <NavigationBar />
      <main>
        <div className="container mx-auto">{children}</div>
      </main>
    </AuthRoute>
  )
}
