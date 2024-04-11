using { bookshop } from './db/schema';

service CatalogService @(path:'/browse') {

  @readonly entity Books as projection on bookshop.Books;
}

@protocol: 'rest'
@path: '/admin'
@requires: 'authenticated-user'
service AdminService {

  entity Books as projection on bookshop.Books;
  entity Authors as projection on bookshop.Authors;
  entity Orders as projection on bookshop.Orders;

}

/**
 * Auth info for swagger
 * @see https://cap.cloud.sap/docs/advanced/publishing-apis/openapi#authorization
 */
annotate AdminService with @(
  Authorization: {
    Authorizations: [
      { $Type : 'Auth.Http', Name : 'Basic', Scheme : 'basic' },
      { $Type : 'Auth.Http', Name : 'JWT',   Scheme : 'bearer', BearerFormat : 'JWT' },
    ],
    SecuritySchemes: [
      { Authorization : 'Basic' },
      { Authorization : 'JWT', RequiredScopes : [] },
    ]
  }
);
