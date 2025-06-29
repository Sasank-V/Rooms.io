export interface StaffData {
  id: string
  name: string
  phone: string
  email: string
  aadhaar: string
  role: string
  status: string
}

export const initialStaffList: StaffData[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1 234-567-8901",
    email: "john.smith@hotel.com",
    aadhaar: "1234-5678-9012",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1 234-567-8902",
    email: "sarah.johnson@hotel.com",
    aadhaar: "2345-6789-0123",
    role: "Housekeeping",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    phone: "+1 234-567-8903",
    email: "mike.wilson@hotel.com",
    aadhaar: "3456-7890-1234",
    role: "Maintenance",
    status: "On Leave",
  },
  {
    id: "4",
    name: "Emily Davis",
    phone: "+1 234-567-8904",
    email: "emily.davis@hotel.com",
    aadhaar: "4567-8901-2345",
    role: "Receptionist",
    status: "Active",
  },
  {
    id: "5",
    name: "David Brown",
    phone: "+1 234-567-8905",
    email: "david.brown@hotel.com",
    aadhaar: "5678-9012-3456",
    role: "Cleaner",
    status: "Active",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    phone: "+1 234-567-8906",
    email: "lisa.anderson@hotel.com",
    aadhaar: "6789-0123-4567",
    role: "Staff",
    status: "Inactive",
  },
]

// Export current staff list for file updates
export const staffList = [...initialStaffList]

// Function to update the staff list (this will be called by the context)
export const updateStaffList = (newStaffList: StaffData[]) => {
  staffList.splice(0, staffList.length, ...newStaffList)
}
