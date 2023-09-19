<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'price' => 'float',
    ];

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function (Builder $query, string $search) {
            $query->where('name', 'ilike', '%' . $search . '%')
                ->orWhere('description', 'ilike', '%' . $search . '%');
        });
    }

    public function history()
    {
        return $this->hasMany(ProductHistory::class, 'product_id');
    }
}
