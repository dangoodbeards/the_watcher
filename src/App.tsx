import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SubmissionTable from './components/SubmissionTable'
import { INITIAL_SUBMISSIONS } from './mockData'

type Persona = {
  role: 'producer' | 'provider' | 'consultant' | 'none'
  producerId?: string
  consultantId?: string
}

const STORAGE_KEY = 'the_watcher_submissions'

function bootstrapSubmissions() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS))
  }
}

export default function App() {
  const [persona, setPersona] = useState<Persona>({ role: 'none' })

  useEffect(() => {
    bootstrapSubmissions()
    const raw = sessionStorage.getItem('persona')
    if (raw) {
      try {
        setPersona(JSON.parse(raw))
      } catch {}
    }
  }, [])

  return (
    <div className="app">
      <Header persona={persona} setPersona={setPersona} />
      <main className="container">
        <p>Current persona: <strong>{persona.role}{persona.producerId ? ` (Producer ${persona.producerId})` : ''}{persona.consultantId ? ` (${persona.consultantId})` : ''}</strong></p>
        <SubmissionTable persona={persona} />
      </main>
    </div>
  )
}
