export type Submission = {
  id: string
  groupName: string
  effectiveDate: string
  ProducerID: string
  productAssoc: string
  consultantID?: string
}

export type Producer = {
  id: string
  name: string
  email: string
  phone: string
}

export type Consultant = {
  id: string
  name: string
  producerIds: string[]
}
