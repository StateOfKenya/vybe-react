import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { JoinTrybe } from "./pages/JoinTrybe"
import { Events } from "./pages/Events"
import { ChechezaMtaani } from "./pages/ChechezaMtaani"
import { Projects } from "./pages/Projects"
import { ProjectDetail } from "./pages/ProjectDetail"
import { News } from "./pages/News"
import { NewsDetail } from "./pages/NewsDetail"
import { GetInvolved } from "./pages/GetInvolved"
import { Contact } from "./pages/Contact"
import { Dashboard } from "./pages/Dashboard"
import { BlankPage } from "./pages/BlankPage"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="join" element={<JoinTrybe />} />
              <Route path="events" element={<Events />} />
              <Route path="checheza-mtaani" element={<ChechezaMtaani />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="get-involved" element={<GetInvolved />} />
              <Route path="contact" element={<Contact />} />
              <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App