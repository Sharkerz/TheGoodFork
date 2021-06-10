<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('numOrder');
            $table->integer('numBooking')->nullable();
            $table->float('prixTotal');
            $table->integer('userId')->nullable();
            $table->string('userName')->nullable();
            $table->boolean('onSite')->default(0);
            $table->dateTime('hour')->nullable();
            $table->boolean('ready')->default(0);
            $table->boolean('validated')->default(0);
            $table->longText('comment')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
