'use client'

import { useState } from 'react'

interface LoginModalProps {
  onClose: () => void
  onLogin: (user: { username: string }) => void
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'takosadam@gmail.com' && password === 'takosadam') {
      const user = { username: 'takosadam' }
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      onLogin(user)
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#141414] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Bejelentkezés</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-[#1A1A1A] text-white border-[#CCFF00]/20 focus:ring focus:ring-[#CCFF00]/50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Jelszó</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md bg-[#1A1A1A] text-white border-[#CCFF00]/20 focus:ring focus:ring-[#CCFF00]/50"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full py-2 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors">
            Bejelentkezés
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white">Bezárás</button>
      </div>
    </div>
  )
}

