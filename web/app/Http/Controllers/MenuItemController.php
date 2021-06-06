<?php

namespace App\Http\Controllers;

use App\Models\menu_item;
use Illuminate\Http\Request;
use Image;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $menu_items = menu_item::all();
        // return view('menus.index',[
        //     'menu_categories' => $menu_categories,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->ajax()) {
            $fields = $request->validate([
                'name' => 'required|unique:menu_items|string|max:255',
                'price' => 'required|numeric|between:0,99.99',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'category_id' =>'required|int',
                'stock' =>'required|int',
                'description' => 'required|string'
            ]);

            $image = $request->file('image');
            $filename = time(). '.' . $image->getClientOriginalExtension();
            Image::make($image)->save(public_path('/Images/MenuItem/' . $filename));
            $image = $filename;

            $data = menu_item::create([
                'name' =>$request->input('name'),
                'price' =>$request->input('price'),
                'image' => $image,
                'category_id' =>$request->input('category_id'),
                'stock' =>$request->input('stock'),
                'description' => $request->input('description')
            ]);
            $menu_item = menu_item::find($data->id);
            return response()->json(['success' =>true,'id'=>$menu_item->id, 'name'=>$menu_item->name,'image'=>$menu_item->image,'price'=>$menu_item->price,'stock'=>$menu_item->stock,'description'=>$menu_item->description],200);
            }
            abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\menu_item  $menu_item
     * @return \Illuminate\Http\Response
     */
    public function show(menu_item $menu_item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\menu_item  $menu_item
     * @return \Illuminate\Http\Response
     */
    public function edit(menu_item $menu_item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\menu_item  $menu_item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if ($request->ajax()) {
            $id = $request->input(('id'));
            if ($request->hasFile('image')) {
                $fields = $request->validate([
                    'name' => "required|string|max:255|unique:menu_items,name,$id,id",
                    'price' => 'required|numeric|between:0,99.99',
                    'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                    'stock' =>'required|int',
                    'description' => 'required|string'
                ]);
                $image = $request->file('image');
                $filename = time(). '.' . $image->getClientOriginalExtension();
                Image::make($image)->save(public_path('/Images/MenuItem/' . $filename));
                $image = $filename;
                $update_item = [
                    'name' =>$request->input('name'),
                    'price' =>$request->input('price'),
                    'image' => $image,
                    'stock' =>$request->input('stock'),
                    'description' => $request->input('description')
                ];
            }
            else{
                $fields = $request->validate([
                    'name' => "required|string|max:255|unique:menu_items,name,$id,id",
                    'price' => 'required|numeric|between:0,99.99',
                    'stock' =>'required|int',
                    'description' => 'required|string'
                ]);
                $update_item = [
                    'name' =>$request->input('name'),
                    'price' =>$request->input('price'),
                    'stock' =>$request->input('stock'),
                    'description' => $request->input('description')
                ];
            }

            menu_item::where('id', $request->input('id'))
            ->update($update_item);
            $item = menu_item::find($id);
            return response()->json(['success' => 'true','id' =>$request->get('id'), 'item'=> $item], 200);
        }
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\menu_item  $menu_item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        if ($request->ajax()) {
            $data = menu_item::find($request->get('id'));
            menu_item::where('id', $request->get('id'))
                ->delete();
            $image = $data->image;
            unlink(public_path('/Images/MenuItem/' . $image));
            return response()->json(['success' => 'true','id' =>$request->get('id') ], 200);
            }
            abort(404);
    }
}
