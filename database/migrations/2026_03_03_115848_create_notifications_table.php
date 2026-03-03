<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->ulid("id")->primary();
            $table->foreignUlid('user_id')->constrained()->cascadeOnDelete(); // The recipient

            // Polymorphic columns: subject_id and subject_type
            // This allows the notification to link to an 'Event' OR an 'Invitation'
            $table->ulidMorphs('subject');

            $table->string('type'); // e.g., 'event_created', 'org_invitation'
            $table->text('message');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
