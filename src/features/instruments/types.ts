import type { Instrument } from '../../types/domain';

export interface CreateInstrumentPayload extends Omit<
  Instrument,
  'id' | 'created_at' | 'updated_at' | 'price' | 'status' | 'price_updated_at'
> {}
