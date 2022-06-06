<?php

namespace App\Http\Resources\Categories\Base;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoriesResources extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'products' => $this->whenLoaded('products'),
      'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
    ];
  }
}
