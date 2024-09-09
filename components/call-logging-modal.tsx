'use client'

import { useState } from 'react'
import { X, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function CallLoggingModal({ isOpen, onClose, contact }) {
  const [callData, setCallData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    duration: '',
    notes: '',
    outcome: '',
    status: contact.status,
    nextFollowUp: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCallData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Call logged:', callData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-blue-500" />
            Log Call for {contact.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Call Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={callData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Call Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={callData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Call Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={callData.duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outcome">Call Outcome</Label>
            <RadioGroup name="outcome" onValueChange={(value) => handleChange({ target: { name: 'outcome', value } })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="successful" id="successful" />
                <Label htmlFor="successful">Successful</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-answer" id="no-answer" />
                <Label htmlFor="no-answer">No Answer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="voicemail" id="voicemail" />
                <Label htmlFor="voicemail">Left Voicemail</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Call Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={callData.notes}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Update Lead Status</Label>
            <Select name="status" onValueChange={(value) => handleChange({ target: { name: 'status', value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
            <Input
              id="nextFollowUp"
              name="nextFollowUp"
              type="date"
              value={callData.nextFollowUp}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}