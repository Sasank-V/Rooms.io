export interface Stage {
  name: string;
  path: string;
}
export const SetupStages: Stage[] = [
  { name: 'Hotel Info', path: 'hotel-info' },
  { name: 'Room Config', path: 'room-config' },
  { name: 'Payment', path: 'payment' },
  { name: 'Admin', path: 'admin' },
  { name: 'Staff Roles', path: 'staff-roles' },
  { name: 'Add Staff', path: 'staff-add' },
  { name: 'Complete', path: 'complete' },
];

export const CheckInStages: Stage[] = [
  { name: 'ID Capture', path: '/guests/checkin/id-capture' },
  { name: 'Guest Info', path: '/guests/checkin/info' },
  { name: 'Room Selection', path: '/guests/checkin/room' },
  { name: 'Payment Setup', path: '/guests/checkin/payment' },
  { name: 'Confirmation', path: '/guests/checkin/confirm' },
];

export const CheckOutStages: Stage[] = [
  { name: 'Bill Summary', path: 'bill' },
  { name: 'Payment Collection', path: 'payment' },
  { name: 'Room Handover', path: 'handover' },
  { name: 'Feedback', path: 'feedback' },
];
