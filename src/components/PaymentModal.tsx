'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface PaymentModalProps {
  open: boolean
  handleOpenChange: (open: boolean) => void
}

const PaymentModal = ({ open, handleOpenChange }: PaymentModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        handleOpenChange(open)
      }}
    >
      <form>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">Name</label>
              <input id="name-1" name="name" defaultValue="" />
            </div>
            <div className="grid gap-3">
              <label htmlFor="username-1">Username</label>
              <input id="username-1" name="username" defaultValue="" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button>Cancel</button>
            </DialogClose>
            <button type="submit">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default PaymentModal
