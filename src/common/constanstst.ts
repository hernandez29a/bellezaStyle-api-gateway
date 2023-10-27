/* eslint-disable prettier/prettier */
export enum RabbitMQ {
  UserQueue = 'users',
  ProductQueue = 'products',
  CategoryQueue = 'categories',
  ImageQueue = 'img',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  REGISTER = 'REGISTER_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
}

export enum AuthMSG {
  VALID_USER = 'VALID_USER',
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

