export interface Distributor {
  id: string;
}

export interface DistributorsResponse {
  pocSearch: Distributor[];
}

export interface DistributorsRequest {
  algorithm: string;
  lat: string;
  long: string;
  now: string;
}
