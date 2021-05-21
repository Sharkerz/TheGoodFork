<?php

namespace App\Http\Controllers;

use App\Models\menu_category;
use Illuminate\Http\Request;

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
        return view('menus.index',[
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
            $fields = $request->validate([
                'name' => 'required|unique:menu_categories|string|max:255',
            ]);
            $categoryName = $request->get('name');
           
            $data = menu_category::create([
                'name' =>$categoryName,
            ]);
            $menu_category = menu_category::find($data->id);
            return response()->json(['success' =>true,'id'=>$menu_category->id, 'name'=>$menu_category->name],200);
            }
            abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\menu_category  $menu_category
     * @return \Illuminate\Http\Response
     */
    public function show(menu_category $menu_category)
    {
        //
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
     * @param  \App\Models\menu_category  $menu_category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, menu_category $menu_category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if ($request->ajax()) {
            menu_category::where('id', $request->get('id'))
                ->delete();
                return response()->json(['success' => 'true','id' =>$request->get('id') ], 200);
            }
            abort(404);
    }
}
