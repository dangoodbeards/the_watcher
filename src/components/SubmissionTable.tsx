import React, { useEffect, useState } from 'react'
import type { Submission } from '../types'
import { PRODUCERS } from '../mockData'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type Persona = {
  role: 'producer' | 'provider' | 'consultant' | 'none'
  producerId?: string
  consultantId?: string
}

const STORAGE_KEY = 'the_watcher_submissions'

function loadSubmissions(): Submission[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Submission[]
  } catch {
    return []
  }
}

function saveSubmissions(items: Submission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export default function SubmissionTable({ persona }: { persona: Persona }) {
  const [items, setItems] = useState<Submission[]>(() => loadSubmissions())
  const [editing, setEditing] = useState<Submission | null>(null)
  const [newItem, setNewItem] = useState<Partial<Submission>>({})

  useEffect(() => {
    setItems(loadSubmissions())
  }, [])

  const canCreate = persona.role === 'producer'
  const canEdit = persona.role === 'producer' || persona.role === 'consultant'

  const visible = items.filter((s) => {
    if (persona.role === 'provider') return true
    if (persona.role === 'producer') return s.ProducerID === persona.producerId
    if (persona.role === 'consultant') {
      if (!persona.consultantId) return false
      if (persona.consultantId === 'C3') return true
      return s.consultantID === persona.consultantId
    }
    return false
  })

  const handleCreate = () => {
    if (!canCreate || !persona.producerId) return
    const id = 's' + Date.now()
    const created: Submission = {
      id,
      groupName: (newItem.groupName || '').trim(),
      effectiveDate: newItem.effectiveDate || '',
      ProducerID: persona.producerId,
      productAssoc: newItem.productAssoc || '',
      consultantID: newItem.consultantID || undefined
    }
    const next = [...items, created]
    saveSubmissions(next)
    setItems(next)
    setNewItem({})
  }

  const startEdit = (s: Submission) => setEditing(s)

  const saveEdit = () => {
    if (!editing) return
    const next = items.map((it) => (it.id === editing.id ? editing : it))
    saveSubmissions(next)
    setItems(next)
    setEditing(null)
  }

  const producerInfo = (id: string) => PRODUCERS.find((p) => p.id === id)

  const isProvider = persona.role === 'provider'

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Submissions
      </Typography>

      {canCreate && (
        <Stack direction="row" spacing={2} mb={2}>
          <TextField size="small" label="Group Name" value={newItem.groupName || ''} onChange={(e) => setNewItem({ ...newItem, groupName: e.target.value })} />
          <TextField size="small" label="Effective Date" value={newItem.effectiveDate || ''} onChange={(e) => setNewItem({ ...newItem, effectiveDate: e.target.value })} />
          <TextField size="small" label="Product" value={newItem.productAssoc || ''} onChange={(e) => setNewItem({ ...newItem, productAssoc: e.target.value })} />
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </Stack>
      )}

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Group</TableCell>
              <TableCell>Effective</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Producer</TableCell>
              {!isProvider && <TableCell>Consultant</TableCell>}
              {!isProvider && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((s) => (
              <TableRow key={s.id}>
                <TableCell>
                  {editing?.id === s.id ? (
                    <TextField size="small" value={editing.groupName} onChange={(e) => setEditing({ ...editing, groupName: e.target.value })} />
                  ) : (
                    s.groupName
                  )}
                </TableCell>
                <TableCell>
                  {editing?.id === s.id ? (
                    <TextField size="small" value={editing.effectiveDate} onChange={(e) => setEditing({ ...editing, effectiveDate: e.target.value })} />
                  ) : (
                    s.effectiveDate
                  )}
                </TableCell>
                <TableCell>
                  {editing?.id === s.id ? (
                    <TextField size="small" value={editing.productAssoc} onChange={(e) => setEditing({ ...editing, productAssoc: e.target.value })} />
                  ) : (
                    s.productAssoc
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{producerInfo(s.ProducerID)?.name}</Typography>
                  <Typography variant="caption" display="block">{producerInfo(s.ProducerID)?.email}</Typography>
                  <Typography variant="caption" display="block">{producerInfo(s.ProducerID)?.phone}</Typography>
                </TableCell>
                {!isProvider && <TableCell>{s.consultantID}</TableCell>}
                {!isProvider && (
                  <TableCell>
                    {canEdit && (persona.role === 'producer' ? s.ProducerID === persona.producerId : true) && (
                      editing?.id === s.id ? (
                        <Stack direction="row" spacing={1}>
                          <Button size="small" variant="contained" onClick={saveEdit}>Save</Button>
                          <Button size="small" variant="outlined" onClick={() => setEditing(null)}>Cancel</Button>
                        </Stack>
                      ) : (
                        <Button size="small" variant="outlined" onClick={() => startEdit(s)}>Edit</Button>
                      )
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
