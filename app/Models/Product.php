<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function (Builder $query, string $search) {
            $query->where('name', 'ilike', '%' . $search . '%')
                ->orWhere('description', 'ilike', '%' . $search . '%');
        });
    }

    public function changePrice(float $price)
    {
        if ($price < 0) {
            throw new \Exception("Price cannot be less than zero ");
        }

        DB::beginTransaction();

        try {
            $newProduct = $this->replicate(['price', 'createdAt', 'updatedAt']);
            $newProduct->price = $price;

            $saved = $newProduct->save();

            $this->delete();

            DB::commit();

            return $saved;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
