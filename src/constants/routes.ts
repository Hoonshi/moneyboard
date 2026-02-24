export const ROUTES = {
  HOME: '/dashboard',
  TRANSACTIONS: '/transactions',
  TRANSACTION_NEW: '/transactions/new',
  TRANSACTION_DETAIL: (id: string) => `/transactions/${id}`,
  BUDGET: '/budget',
  CALENDAR: '/calendar',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;
