import { Injectable } from '@angular/core';
import { ProductsResponse } from '@shared/interfaces/product';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductsQuery extends Query<ProductsResponse> {
  document = gql`
    query poc($id: ID!, $categoryId: Int, $search: String) {
      poc(id: $id) {
        id
        products(categoryId: $categoryId, search: $search) {
          id
          title
          rgb
          images {
            url
          }
          productVariants {
            availableDate
            productVariantId
            price
            inventoryItemId
            shortDescription
            title
            published
            volume
            volumeUnit
            description
            subtitle
            components {
              id
              productVariantId
              productVariant {
                id
                title
                description
                shortDescription
              }
            }
          }
        }
      }
    }
  `;
}
