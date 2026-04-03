import type { ApiResponse } from "../../../types/api";
import type { Instrument, InstrumentSummary } from "../../../types/domain";
import { api } from "../../../api/apiClient";
import type { CreateInstrumentPayload } from "../types";

export async function getInstruments(
  page = 1,
  size = 10,
): Promise<ApiResponse<Instrument[]>> {
  const { data } = await api.get<ApiResponse<Instrument[]>>('/instruments/', {
    params: { page, size },
  });
  return data;
}

export async function createInstrument(
  payload: CreateInstrumentPayload,
): Promise<ApiResponse<Instrument>> {
  try {
    const { data } = await api.post<ApiResponse<Instrument>>(
    '/instruments/',
    payload,
  );
  return data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getInstrumentsSummary(): Promise<
  ApiResponse<InstrumentSummary[]>
> {
  const { data } = await api.get<ApiResponse<InstrumentSummary[]>>(
    '/instruments/stats/summary',
  );
  return data;
}

export async function updatePriceInstrument(instrument_id: string):Promise<ApiResponse<Instrument>>{
  try {
    const { data } = await api.post<ApiResponse<Instrument>>(
    `/market-data/sync?instrument_id=${instrument_id}`,
    );
  return data;
  } catch (error: any) {
    return error.response.data;
  }
}

