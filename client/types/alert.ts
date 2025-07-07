import { Alert } from '~/database/types';

export interface AlertListResponse {
  alerts: Alert[];
}

export interface AlertDetailResponse {
  alert: Alert;
} 