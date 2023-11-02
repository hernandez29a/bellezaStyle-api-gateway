/* eslint-disable prettier/prettier */
export enum RabbitMQ {
  UserQueue = 'users',
  ProductQueue = 'products',
  CategoryQueue = 'categories',
  ImageQueue = 'images',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  REGISTER = 'REGISTER_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
}

export enum ProductMSG {
  CREATE = 'CREATE_PRODUCT',
  REGISTER = 'REGISTER_PRODUCT',
  FIND_ALL = 'FIND_PRODUCTS',
  FIND_ONE = 'FIND_PRODUCT',
  UPDATE = 'UPDATE_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
}

export enum CategoryMSG {
  CREATE = 'CREATE_CATEGORY',
  REGISTER = 'REGISTER_CATEGORY',
  FIND_ALL = 'FIND_CATEGORIES',
  FIND_ONE = 'FIND_CATEGORY',
  UPDATE = 'UPDATE_CATEGORY',
  DELETE = 'DELETE_CATEGORY',
  ADD_PRODUCT = 'ADD_PRODUCT'
}

export enum AuthMSG {
  VALID_USER = 'VALID_USER',
}

export enum ImgMSG {
  GET_IMAGE = 'GET_IMAGE',
  UPDATE = 'UPDATE_IMAGE',
}

/*export enum PassengerMSG {
  CREATE = 'CREATE_PASSENGER',
  FIND_ALL = 'FIND_PASSENGERS',
  FIND_ONE = 'FIND_PASSENGER',
  UPDATE = 'UPDATE_PASSENGER',
  DELETE = 'DELETE_PASSENGER',
}

export enum FlightMSG {
  CREATE = 'CREATE_FLIGHT',
  FIND_ALL = 'FIND_FLIGHTS',
  FIND_ONE = 'FIND_FLIGHT',
  UPDATE = 'UPDATE_FLIGHT',
  DELETE = 'DELETE_FLIGHT',
  ADD_PASSENGER = 'ADD_PASSENGER',
}*/

