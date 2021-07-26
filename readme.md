# Crud app using node js & Express js

### App Builder

1. Node Js
2. Express Js
3. MySql

### Feature


> PRODUCT

>> Create
POST > http://localhost:4000/v1/product/

| Field | Type | Rules |
| ----------- | ----------- | ----------- |
| ProductName | Text | Required
| store_id | Number | Required
| category | Number | Required
| color | Text | Required
| size | Enum | XS, S, M, L, XL
| price | Number | Required
| quantity | Number | Required
| status | Enum | NEW, FORMER
| description | Text | Required
| image | File | Image, maxSize 5mb
>> Read
GET > http://localhost:4000/v1/product/
>> Update
PUT > http://localhost:4000/v1/product/idProduct

| Field | Type | Rules |
| ----------- | ----------- | ----------- |
| ProductName | Text | Optional
| store_id | Number | Optional
| category | Number | Optional
| color | Text | Optional
| size | Enum | XS, S, M, L, XL
| price | Number | Optional
| quantity | Number | Optional
| status | Enum | NEW, FORMER
| description | Text | Optional
| image | File | Image, maxSize 5mb
>> Delete
DELETE > http://localhost:4000/v1/product/idProduct
>> URL Parameter
GET > http://localhost:4000/product?order=DESC&keyword=jaket
> Order, Keyword, Limit, Page

> USERS

>> Sign up seller
POST > http://localhost:4000/v1/store/

| Field | Type | Rules |
| ----------- | ----------- | ----------- |
| Owner | Text | Required
| Email | Email | Required
| PhoneNumber | Text | Required
| Storename | Text | Required
| password | Password | Required
>> Sign in seller
POST > http://localhost:4000/v1/store/

>> Sign up customer
POST > http://localhost:4000/v1/users/

| Field | Type | Rules |
| ----------- | ----------- | ----------- |
| Name | Text | Required
| Email | Email | Required
| password | Password | Required
>> Sign in customer
POST > http://localhost:4000/v1/users/