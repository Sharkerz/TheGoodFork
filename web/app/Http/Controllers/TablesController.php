<?php

namespace App\Http\Controllers;

use App\Models\Tables;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Redirect;

class TablesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tables = Tables::all();
        return view('tables.index',[
            'tables' => $tables,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('tables.create');
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
            'TableN' => 'required|unique:tables|int|min:1',
            'NbPersons' => 'required|int|min:1|max:10',
        ]);
        $nbPersons = $request->get('NbPersons');
        $tableNumber = $request->get('TableN');
        $data = Tables::create([
            'TableN' =>$tableNumber,
            "NbPersons" => $nbPersons,
        ]);
        $table = Tables::find($data->id);
        return response()->json(['success' =>true,'id'=>$table->id, 'TableN'=>$table->TableN, 'NbPersons'=>$table->NbPersons],200);
        }
        abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tables  $tables
     * @return \Illuminate\Http\Response
     */
    public function show(Tables $tables)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tables  $tables
     * @return \Illuminate\Http\Response
     */
    public function edit(Tables $tables)
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
            $fields = $request->validate([
                'NbPersons' => 'required|int|min:1|max:10',
            ]);
        $table_update = [
            "NbPersons" => $request->get('NbPersons'),
        ];
        Tables::where('id', $request->get('id'))
            ->update($table_update);
            return response()->json(['success' => 'true','id' =>$request->get('id') ], 200);
        }
        abort(404);
        
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        if ($request->ajax()) {
        Booking::where('tableId' ,'=',$request->get('id'))->delete();
        Tables::where('id', $request->get('id'))
            ->delete();
            return response()->json(['success' => 'true','id' =>$request->get('id') ], 200);
        }
        abort(404);
    }
}
