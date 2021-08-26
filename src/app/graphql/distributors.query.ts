import { Injectable } from '@angular/core';
import { DistributorsResponse } from '@shared/interfaces/distributor';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DistributorsQuery extends Query<DistributorsResponse> {
  document = gql`
    query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
      pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
        __typename
        id
      }
    }
  `;
}
