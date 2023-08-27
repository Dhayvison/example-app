<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return redirect('product');
    }

    public function index(): Response
    {
        return Inertia::render('Product/Index', [
            'products' => new ProductCollection(Product::orderBy('name')->paginate())
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

    public function update(Request $request, $id): RedirectResponse
    {
        $product = Product::find($id);

        if (is_null($product)) {
            throw new HttpException(404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);
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
