using { bookshop } from './db/schema';

service CatalogService @(path:'/browse') {

  @readonly entity Books as projection on bookshop.Books;
}

@protocol: 'rest'
service AdminService {

  entity Books as projection on bookshop.Books;
  entity Authors as projection on bookshop.Authors;
  entity Orders as projection on bookshop.Orders;

}