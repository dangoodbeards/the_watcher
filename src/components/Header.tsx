import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

type Persona = {
  role: 'producer' | 'provider' | 'consultant' | 'none'
  producerId?: string
  consultantId?: string
}

export default function Header({ persona, setPersona }: { persona: Persona; setPersona: (p: Persona) => void }) {
  const setProducer = (id: string) => {
    const p: Persona = { role: 'producer', producerId: id }
    sessionStorage.setItem('persona', JSON.stringify(p))
    setPersona(p)
  }

  const setProvider = () => {
    const p: Persona = { role: 'provider' }
    sessionStorage.setItem('persona', JSON.stringify(p))
    setPersona(p)
  }

  const setConsultant = (id: string) => {
    const p: Persona = { role: 'consultant', consultantId: id }
    sessionStorage.setItem('persona', JSON.stringify(p))
    setPersona(p)
  }

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          The Watcher - Demo
        </Typography>
        <Box>
          <Button color={persona.role === 'producer' && persona.producerId === '1' ? 'secondary' : 'inherit'} onClick={() => setProducer('1')} sx={{ ml: 1 }}>
            Producer ONE
          </Button>
          <Button color={persona.role === 'producer' && persona.producerId === '2' ? 'secondary' : 'inherit'} onClick={() => setProducer('2')} sx={{ ml: 1 }}>
            Producer TWO
          </Button>
          <Button color={persona.role === 'provider' ? 'secondary' : 'inherit'} onClick={() => setProvider()} sx={{ ml: 1 }}>
            Provider
          </Button>
          <Button color={persona.role === 'consultant' ? 'secondary' : 'inherit'} onClick={() => setConsultant('C3')} sx={{ ml: 1 }}>
            Consultant
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
