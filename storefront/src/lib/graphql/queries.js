import { gql } from 'graphql-request'

export const GET_TOP_SELLERS = gql`
  query GetTopSellers {
    search(
      input: { take: 8, groupByProduct: true, sort: { price: ASC } }
    ) {
      items {
        productId
        slug
        productAsset {
          id
          preview
        }
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        productName
      }
    }
  }
`

export const GET_COLLECTIONS = gql`
  query GetCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        parent {
          id
          slug
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        slug
        productName
        description
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
      }
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`

export const ASSET_FRAGMENT = gql`
  fragment Asset on Asset {
    id
    width
    height
    name
    preview
    focalPoint {
      x
      y
    }
  }
`

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      variants {
        id
        name
        options {
          code
          name
        }
        price
        priceWithTax
        sku
      }
      featuredAsset {
        ...Asset
      }
      assets {
        ...Asset
      }
      collections {
        id
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`
