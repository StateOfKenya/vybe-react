import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-yellow-50">
      <Header />
      <main className="pt-16 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}