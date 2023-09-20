<?php

namespace App\Http\Controllers;

use App\Events\ProductRegistered;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductCollection;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Product/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        event(new ProductRegistered($product, $request->user()));

        return redirect('product');
    }

    public function index(Request $request): Response
    {
        return Inertia::render('Product/Index', [
            'products' => new ProductCollection(
                Product::orderBy('name')
                    ->filter($request->only('search'))
                    ->paginate()
                    ->appends($request->all())
            )
        ]);
    }

    public function edit($id): Response
    {
        $product = Product::find($id);

        if (is_null($product)) {
            throw new HttpException(404);
        }

        return Inertia::render('Product/Edit', ['product' => $product]);
    }

    public function update(ProductRequest $request, $id): RedirectResponse
    {
        $request->validated();

        $product = Product::find($id);

        if (is_null($product)) {
            throw new HttpException(404);
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->save();

        return redirect('product');
    }

    public function delete($id): RedirectResponse
    {
        $product = Product::find($id);

        if (is_null($product)) {
            throw new HttpException(404);
        }

        $product->delete();
        return redirect('product');
    }
}
