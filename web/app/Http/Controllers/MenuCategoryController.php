<?php

namespace App\Http\Controllers;

use App\Models\menu_category;
use App\Models\menu_item;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Image;
use Config;

class MenuCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menu_categories = menu_category::all();
        return view('Menus.index',[
            'menu_categories' => $menu_categories,
        ]);
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
            $roles = Config::get('users.roles');
            $fields = $request->validate([
                'name' => 'required|unique:menu_categories|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'role' => 'required',Rule::in($roles)
            ]);

            $image = $request->file('image');
            $filename = time(). '.' . $image->getClientOriginalExtension();
            Image::make($image)->resize(200, 200)->save(public_path('/Images/MenuCategory/' . $filename));
            $image = $filename;

            $data = menu_category::create([
                'name' =>$request->input('name'),
                'image' => $image,
                'role' => $request->input('role')
            ]);
            $menu_category = menu_category::find($data->id);
            return response()->json(['success' =>true,'item' =>$menu_category],200);
            }
            abort(404);
    }

    /**
     * Display the specified resource.
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = menu_category::find($id);
        $items = menu_item::where('category_id', $id)->get();
        return view('Menus.show',[
            'menu_items' => $items,
            'category' =>$category
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\menu_category  $menu_category
     * @return \Illuminate\Http\Response
     */
    public function edit(menu_category $menu_category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if ($request->ajax()) {
            $roles = Config::get('users.roles');
            $id = $request->input(('id'));
            $data = menu_category::find($id);
            if ($request->hasFile('image')) {
                $fields = $request->validate([
                    'name' => "required|string|max:255|unique:menu_categories,name,$id,id",
                    'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                    'role' => 'required',Rule::in($roles)
                ]);
                $image = $request->file('image');
                $filename = time(). '.' . $image->getClientOriginalExtension();
                Image::make($image)->resize(200, 200)->save(public_path('/Images/MenuCategory/' . $filename));
                $image = $filename;
                $imageToDelete = $data->image;
                unlink(public_path('/Images/MenuCategory/' . $imageToDelete));
                $update_item = [
                    'name' =>$request->input('name'),
                    'image' => $image,
                    'role' =>strtolower($request->input('role'))
                ];
            }
            else{
                $fields = $request->validate([
                    'name' => "required|string|max:255|unique:menu_categories,name,$id,id",
                    'role' =>'required',Rule::in($roles)
                ]);

                $update_item = [
                    'name' =>$request->input('name'),
                    'role' =>strtolower($request->input('role'))
                ];
            }

            menu_category::where('id', $request->input('id'))
            ->update($update_item);
            $item = menu_category::find($id);
            return response()->json(['item'=> $item], 200);
        }
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if ($request->ajax()) {
            $data = menu_category::find($request->get('id'));
            $items = menu_item::where('category_id', '=' , $request->get('id'))->get();
            if( count($items->toArray()) > 0 ){
                return response()->json(['error' => 'failed','id' =>$request->get('id'), 'message' =>'Category should be empty'], 404);
            }
            menu_category::where('id', $request->get('id'))
                ->delete();
            $image = $data->image;
            unlink(public_path('/Images/MenuCategory/' . $image));
            return response()->json(['success' => 'true','id' =>$request->get('id') ], 200);
            }
            abort(404);
    }
}
