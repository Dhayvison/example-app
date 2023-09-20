<?php

namespace App\Events;

use App\Models\Product;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductRegistered
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    const ACTION = 'registered';

    public $product;
    public $user;

    /**
     * Create a new event instance.
     */
    public function __construct(Product $product, User $user)
    {
        $this->product = $product;
        $this->user = $user;
    }
}
