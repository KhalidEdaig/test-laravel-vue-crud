<?php

namespace App\Http\Resources\Products\Base;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsResources extends JsonResource
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
      'description' => $this->description,
      'price' => $this->price,
      'category_id' => $this->category_id,
      'category' => $this->whenLoaded('category'),
      'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
    ];
  }
}
