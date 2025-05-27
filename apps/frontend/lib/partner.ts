export async function getPartnerData() {
  // In a real app, this would fetch data from your database based on the authenticated user
  return {
    profile: {
      name: "Sarah Johnson",
      email: "sarah@engineeringfirm.com",
      totalRevenue: 125000,
      totalCommission: 12500,
    },
    referrals: [
      {
        id: "ref-001",
        customerName: "Acme Robotics",
        status: "Paid",
        dateSubmitted: "2023-03-15T10:30:00Z",
        jobTotal: 35000,
        commissionEarned: 4200,
        commissionPaid: true,
      },
      {
        id: "ref-002",
        customerName: "TechStart Inc",
        status: "Won",
        dateSubmitted: "2023-05-22T14:45:00Z",
        jobTotal: 28500,
        commissionEarned: 2850,
        commissionPaid: false,
      },
      {
        id: "ref-003",
        customerName: "Quantum Devices",
        status: "Quoting",
        dateSubmitted: "2023-06-10T09:15:00Z",
        jobTotal: null,
        commissionEarned: null,
        commissionPaid: false,
      },
      {
        id: "ref-004",
        customerName: "Innovate Medical",
        status: "Submitted",
        dateSubmitted: "2023-06-28T16:20:00Z",
        jobTotal: null,
        commissionEarned: null,
        commissionPaid: false,
      },
      {
        id: "ref-005",
        customerName: "Precision Aerospace",
        status: "Lost",
        dateSubmitted: "2023-04-05T11:10:00Z",
        jobTotal: null,
        commissionEarned: null,
        commissionPaid: false,
      },
    ],
  }
}
