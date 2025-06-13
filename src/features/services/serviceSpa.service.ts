import { HttpClient } from '@/shared/types/httpClient';
import {
  Available,
  MethodPaymentData,
  ProfessionalData,
  Reserve,
  ReserveStatus,
  SpaInfoData,
} from '@features/types/serviceSpa.types';
import { ApiDataResponse } from '@/shared/types/api';

export class ServiceSpaService {
  constructor(private readonly http: HttpClient) {}

  listSpa() {
    return this.http.get<ApiDataResponse<SpaInfoData[]>>(
      `/api/service-spa/list`
    );
  }

  listProfessional() {
    return this.http.get<ApiDataResponse<ProfessionalData[]>>(
      `/api/professional/list`
    );
  }

  getService(id: number) {
    return this.http.get<ApiDataResponse<SpaInfoData>>(
      `/api/service-spa/${id}`
    );
  }

  availability(id: number, date: string, days: number) {
    return this.http.get<ApiDataResponse<Available[]>>(
      `/api/availability?serviceId=${id}&date=${date}&days=${days}`
    );
  }

  createReserve(dataSend: Reserve) {
    return this.http.post<ApiDataResponse<ReserveStatus>>(
      `/api/reserve/new`,
      dataSend
    );
  }

  methodPayment(dataSend: MethodPaymentData) {
    return this.http.get<ApiDataResponse<string>>(
      `/api/invoice?reserveId=${dataSend.reserveId}&method=${dataSend.method}`
    );
  }

  sendInvoice(id: number) {
    return this.http.get<ApiDataResponse<string>>(`/api/invoice/${id}`);
  }
}
