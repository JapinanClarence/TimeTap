<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location');

            // Dates and Times
            $table->date('start_date');
            $table->date('end_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status', ['active', 'inactive'])
                ->default('active');
            $table->geometry('area'); // This stores the Polygon
            $table->spatialIndex('area'); // Critical for speed
            $table->timestamps();
            $table->foreignUlid('organization_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
