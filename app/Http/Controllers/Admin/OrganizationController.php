<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
      public function upload(Request $request, Organization $organization)
    {
        $data = $request->validate([
            "image" => "string"
        ]);
     
        $organization->update([
            "image" => $data["image"]
        ]);
        return back()->with('message', 'Profile updated successfully!');
    }
    
}
