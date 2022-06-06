<?php

namespace App\Http\Controllers;

use App\Enums\eRespCode;
use App\Http\Requests\products\CreateOrUpdateProduct;
use App\Http\Resources\Products\Base\ProductsResources;
use App\Http\Resources\Products\Base\ProductsResourcesCollection;
use App\Http\Resources\Products\Pagination\ProductsPaginationResourceCollection;
use App\Models\Product;

class ProductController extends ResponseController
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
    $this->middleware('auth:api');
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $products = Product::with('category')->paginate();

    return $this->resp->ok(eRespCode::C_LISTED_200_00, new ProductsPaginationResourceCollection($products));
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function getAllProducts()
  {
    $products = Product::with('category')->all();

    return $this->resp->ok(eRespCode::C_LISTED_200_00, new ProductsResourcesCollection($products));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateOrUpdateProduct $request)
  {
    if ($product = Product::create($request->only(['name', 'description', 'price', 'category_id'])))
      return $this->resp->created(eRespCode::C_CREATED_201_00, new ProductsResources($product->load('category')));
    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  Product $Product
   * @return \Illuminate\Http\Response
   */
  public function update(CreateOrUpdateProduct $request, Product $product)
  {
    if ($product->update($request->only(['name', 'description', 'price', 'category_id'])))
      return $this->resp->ok(eRespCode::C_UPDATED_200_01, new ProductsResources($product->load('category')));

    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Product $product)
  {
    if ($product->delete())
      return $this->resp->ok(eRespCode::C_DELETED_200_02);


    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }
}
