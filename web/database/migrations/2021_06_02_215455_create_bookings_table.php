<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tableId');
            $table->foreign('tableId')->references('id')->on('tables');
            $table->integer('userId')->nullable();
            $table->string('userName')->nullable();
            $table->date('date');
            $table->time('hour')->date_format('H:i');
            $table->string('service');
            $table->integer('nbPersons');
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
        Schema::dropIfExists('bookings');
    }
}
