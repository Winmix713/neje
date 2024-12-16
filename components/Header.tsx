'use client'

import { useState, useEffect } from 'react'
import LoginModal from './LoginModal'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setIsLoggedIn(true)
      setUsername(user.username)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#CCFF00]/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          winmix<span className="text-[#CCFF00]">.hu</span>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span>{username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors"
              >
                Kijelentkezés
              </button>
            </>
          ) : (
            <>
              <span>Vendég</span>
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-2 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors"
              >
                Bejelentkezés
              </button>
            </>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onLogin={(user) => {
          setIsLoggedIn(true)
          setUsername(user.username)
          setShowLoginModal(false)
        }} />
      )}
    </header>
  )
}

