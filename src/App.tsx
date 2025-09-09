import { useState } from 'react'
import { Homepage } from './components/Homepage'
import { SignIn } from './components/SignIn'
import { Dashboard } from './components/Dashboard'
import { ThemeProvider } from './components/ThemeProvider'

type Page = 'homepage' | 'signin' | 'dashboard'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('homepage')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
  }

  const handleSignIn = () => {
    setIsAuthenticated(true)
    setCurrentPage('dashboard')
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setCurrentPage('homepage')
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        {currentPage === 'homepage' && (
          <Homepage 
            onNavigateToSignIn={() => navigateTo('signin')}
            onNavigateToDashboard={() => navigateTo('dashboard')}
            isAuthenticated={isAuthenticated}
          />
        )}
        {currentPage === 'signin' && (
          <SignIn 
            onSignIn={handleSignIn}
            onNavigateToHomepage={() => navigateTo('homepage')}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            onSignOut={handleSignOut}
            onNavigateToHomepage={() => navigateTo('homepage')}
          />
        )}
      </div>
    </ThemeProvider>
  )
}