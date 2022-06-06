<?php

namespace App\Http\Resources\Products\Pagination;

use App\Http\Resources\Products\Base\ProductsResources;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductsPaginationResourceCollection extends ResourceCollection
{
  /**
   * Transform the resource collection into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'products' => ProductsResources::collection($this->collection),
      'meta' => [
        'total' => $this->total(),
        'count' => $this->count(),
        'per_page' => $this->perPage(),
        'current_page' => $this->currentPage(),
        'total_pages' => $this->lastPage()
      ]
    ];
  }
}
