<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->id();
            $table->string('name');
            $table->float('price');
            $table->string('image');
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('menu_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
    }
}
