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

export const ReportTrackStatus = {
  PENDING_COMPRESSION: 'PENDING_COMPRESSION',
  PENDING_ANALYSIS: 'PENDING_ANALYSIS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type ReportTrackStatus =
  (typeof ReportTrackStatus)[keyof typeof ReportTrackStatus];

export interface ReportProcessingTask {
  id: string;
  instrument_id: number;
  year: number;
  quarter: string;
  s3_key_raw: string;
  s3_key_optimized: string;
  file_size_raw: number;
  file_size_optimized: number;
  status: ReportTrackStatus;
  retry_count: number;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}
