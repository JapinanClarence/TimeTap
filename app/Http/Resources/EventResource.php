<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Decode the GeoJSON from the database
        // Note: Make sure your model/query selects the GeoJSON string
        $geoJson = json_decode($this->area_geojson, true);

        $coordinates = [];

        if ($geoJson && isset($geoJson['coordinates'])) {
            // Check if it's a Polygon (nested array) or a Point
            $rawCoords = $geoJson['type'] === 'Polygon'
                ? $geoJson['coordinates'][0]
                : [$geoJson['coordinates']];

            $coordinates = collect($rawCoords)->map(fn($point) => [
                'long' => $point[0],
                'lat' => $point[1],
            ])->toArray();
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'status' => $this->status,
            'coordinates' => $coordinates, // Matches EventType { long: number, lat: number }[]
        ];
    }
}
