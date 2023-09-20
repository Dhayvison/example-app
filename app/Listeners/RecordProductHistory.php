<?php

namespace App\Listeners;

use App\Events\ProductRegistered;
use App\Models\ProductHistory;

class RecordProductHistory
{
    public function handle(ProductRegistered $event)
    {
        ProductHistory::create([
            'product_id' => $event->product->id,
            'user_id' => $event->user->id,
            'action' => ProductRegistered::ACTION,
            'previous_data' => null,
            'current_data' => json_encode([
                'name' => $event->product->name,
                'description' => $event->product->description,
                'price' => $event->product->price,
            ]),

        ]);
    }
}
