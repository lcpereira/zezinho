import { Injectable } from '@angular/core';
import { CategoriesResponse } from '@shared/interfaces/category';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoriesQuery extends Query<CategoriesResponse> {
  document = gql`
    query allCategoriesSearch {
      allCategory {
        title
        id
      }
    }
  `;
}
