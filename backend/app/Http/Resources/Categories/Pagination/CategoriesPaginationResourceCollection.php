<?php

namespace App\Http\Resources\Categories\Pagination;

use App\Http\Resources\Categories\Base\CategoriesResources;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoriesPaginationResourceCollection extends ResourceCollection
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
      'categories' => CategoriesResources::collection($this->collection),
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
