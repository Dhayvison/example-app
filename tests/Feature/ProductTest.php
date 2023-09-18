<?php

use App\Models\Product;
use App\Models\User;


test('products page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('product'));

    $response->assertOk();
});


test('create product page can be rendered', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get(route('product.create'));

    $response->assertOk();
});

test('product validate name and price', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('product.create'))
        ->post(route('product.create'));

    $response->assertSessionHasErrors(['name', 'price']);
});

test('product can be registered', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('product.create'))
        ->post(route('product.create'), [
            'name' => 'product',
            'description' => 'description',
            'price' => 1.23
        ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect(route('product'));

    $this->assertDatabaseCount('products', 1);
});

test('product information can be updated', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('product.edit', ['id' => $product->id]))
        ->put(route('product.update', ['id' => $product->id]), [
            'id' => $product->id,
            'name' => 'product-name',
            'description' => 'product-description',
            'price' => 3.14,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/product');

    $product->refresh();

    $this->assertSame('product-name', $product->name);
    $this->assertSame('product-description', $product->description);
    $this->assertSame(3.14, $product->price);
});


test('product uses soft delete', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('product.edit', ['id' => $product->id]))
        ->delete(route('product.destroy', ['id' => $product->id]));

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/product');

    $product->refresh();

    $this->assertSoftDeleted('products', ['id' => $product->id]);
});
