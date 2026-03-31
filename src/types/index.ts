export interface ApiResponseError {
  message: string;
  code: string;
}

export interface ApiResponseBase {
  success: boolean;
  data: object;
  error: ApiResponseError;
  meta: object;
}

export interface InstrumentSummaryResponse extends ApiResponseBase {
  data: {
    status: string;
    count: number;
  }[]
}
export interface CreateInstrumentPayload {
  ticker: string;
  name: string;
}

export interface InstrumentResponse extends ApiResponseBase {
  data: {
    id: string; // Assuming standard fields
    ticker: string;
    name: string;
    status: string;
  }
}

// export type ExtractionStatus = 'pending' | 'processing' | 'completed' | 'failed';

// export interface Document {
//   id: string;
//   ticker: string;
//   year: number;
//   quarter: string;
//   filename: string;
//   original_name: string;
//   s3_key: string;
//   size_bytes: number;
//   uploaded_at: string;
//   status: ExtractionStatus;
//   extracted_at?: string;
//   error_message?: string;
//   presigned_url?: string;
// }

// export interface UploadMetadata {
//   ticker: string;
//   year: string;
//   period: string; // Q1, Q2, Q3, Q4, FY
// }

// export interface UploadResponse {
//   message: string;
//   ticker: string;
//   year: string;
//   period: string;
//   s3_key: string;
//   url: string;
// }

// export interface DocumentsResponse {
//   documents: Document[];
//   total: number;
// }

// export interface ApiError {
//   error: string;
//   message: string;
//   status_code: number;
// }

