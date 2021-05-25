<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\menu_category;
use App\Models\menu_item;
use Validator;

class MenuApiController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function getCategories() {
        $menu_categories = menu_category::all();
        if($menu_categories){
            return response()->json([
                'status' => 'success',
                'categories' => $menu_categories
            ]);
        }
        
    }

    public function getItems(Request $request) {
        $validator = Validator::make($request->all(),
        [
            'category_id' => 'required|int',
        ]);
        // dd($request['category_id']);return response()->json(['test'=>$request['category_id']]);
        $menu_items = menu_item::where('category_id',$request['category_id'])->get();
        if($menu_items){
            return response()->json([
                'status' => 'success',
                'menu_items' => $menu_items
            ]);
        }
        
    }
}
