export const InstrumentStatus = {
  ACTIVE: 'ACTIVE',
  PROCESSING: 'PROCESSING',
  PENDING: 'PENDING',
  ARCHIVED: 'ARCHIVED',
  ERROR: 'ERROR',
} as const;

export type InstrumentStatus =
  (typeof InstrumentStatus)[keyof typeof InstrumentStatus];

export interface Instrument {
  id: string;
  ticker: string;
  company_name: string;
  status: InstrumentStatus;
  created_at: string;
  updated_at: string;
  price: number;
  price_updated_at: string;
}

export interface InstrumentSummary {
  status: InstrumentStatus;
  count: number;
}
