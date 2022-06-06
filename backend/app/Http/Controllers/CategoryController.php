<?php

namespace App\Http\Controllers;

use App\Enums\eRespCode;
use App\Http\Requests\categories\CreateOrUpdateCategory;
use App\Http\Resources\Categories\Base\CategoriesResources;
use App\Http\Resources\Categories\Base\CategoriesResourcesCollection;
use App\Http\Resources\Categories\Pagination\CategoriesPaginationResourceCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends ResponseController
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
    $categorys = Category::paginate();
    return $this->resp->ok(eRespCode::EMP_LISTED_200_00, new CategoriesPaginationResourceCollection($categorys));
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function getAllCategories()
  {
    $categories = Category::all();

    return $this->resp->ok(eRespCode::C_LISTED_200_00, new CategoriesResourcesCollection($categories));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateOrUpdateCategory $request)
  {
    if ($category = Category::create($request->all()))
      return $this->resp->created(eRespCode::EMP_CREATED_201_00, new CategoriesResources($category));
    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function update(CreateOrUpdateCategory $request, Category $category)
  {
    if ($category->update($request->all()))
      return $this->resp->ok(eRespCode::EMP_UPDATED_200_01, new CategoriesResources($category));

    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Category  $category
   * @return \Illuminate\Http\Response
   */
  public function destroy(Category $category)
  {
    if ($category->delete())
      return $this->resp->ok(eRespCode::EMP_DELETED_200_02);
    return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
  }
}
