export interface Distributor {
  id: string;
  // Não achei necessário mapear todos os campos :)
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
