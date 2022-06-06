<?php

namespace App\Enums;

abstract class eRespCode
{
  // Common
  const _403_NOT_AUTHORIZED = ['403_00' => 'Not Authorized'];
  const _400_BAD_REQUEST = ['400_00' => 'Bad Request'];
  const _500_INTERNAL_ERROR = ['500_00' => 'Internal Error'];
  const _520_UNKNOWN_ERROR = ['520_00' => 'Unknown Error'];
  const _200_OK = ['200_00' => 'OK'];
  const _404_NOT_FOUND = ['404_00' => 'Not Found'];

  // Product

  // 200
  const C_LISTED_200_00 = ['C200_00' => 'Products succesfully listed !'];
  const C_UPDATED_200_01 = ['C200_01' => 'Product succesfully updated !'];
  const C_DELETED_200_02 = ['C200_02' => 'Product succesfully deleted !'];
  const C_GET_200_03 = ['C200_03' => 'Product succesfully retreived !'];
  // 201
  const C_CREATED_201_00 = ['C201_00' => 'Product succesfully created !'];
  // 404
  const C_NOT_FOUND_404_00 = ['C404_00' => 'Product not found !'];

  // Category

  // 200
  const EMP_LISTED_200_00 = ['EMP200_00' => 'Categories succesfully listed !'];
  const EMP_UPDATED_200_01 = ['EMP200_01' => 'Category succesfully updated !'];
  const EMP_DELETED_200_02 = ['EMP200_02' => 'Category succesfully deleted !'];
  const EMP_GET_200_03 = ['EMP200_03' => 'Category succesfully retreived !'];
  // 201
  const EMP_CREATED_201_00 = ['EMP201_00' => 'Category succesfully created !'];


  //Users
  const U_GET_200_03 = ['U200_03' => 'User succesfully retreived !'];
}
