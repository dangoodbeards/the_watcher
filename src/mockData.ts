import type { Submission, Producer, Consultant } from './types'

export const PRODUCERS: Producer[] = [
  { id: '1', name: 'Producer One', email: 'one@example.com', phone: '555-0101' },
  { id: '2', name: 'Producer Two', email: 'two@example.com', phone: '555-0202' }
]

export const CONSULTANTS: Consultant[] = [
  { id: 'C1', name: 'Consultant A', producerIds: ['1'] },
  { id: 'C2', name: 'Consultant B', producerIds: ['2'] },
  { id: 'C3', name: 'Consultant All', producerIds: ['1', '2'] }
]

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 's1',
    groupName: 'Acme Corp',
    effectiveDate: '2025-01-01',
    ProducerID: '1',
    productAssoc: 'Plan A',
    consultantID: 'C1'
  },
  {
    id: 's2',
    groupName: 'Beta LLC',
    effectiveDate: '2025-03-01',
    ProducerID: '2',
    productAssoc: 'Plan B',
    consultantID: 'C2'
  }
]
