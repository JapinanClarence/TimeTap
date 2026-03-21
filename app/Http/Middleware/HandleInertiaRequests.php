<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $user ? new UserResource($user) : null,
                'current_org_id' => $user?->current_organization_id
            ],
            'owned_org' => $user?->ownedOrganization()->select('id', 'name','image')->first(),
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
            ],

            'notifications' => $user ? $user->notifications()->select("id", "name")
                ->with('subject')
                ->latest() : [],

            // Load organizations only if user is logged in
            "myOrganizations" => $user ? $user->organizations->select("id", "name") : [],

            // Logic for currentOrg
            "currentOrg" => function () use ($user) {
                if (!$user || !$user->current_organization_id) {
                    return null;
                }

                // Using find() returns the model or null automatically
                return Organization::select("id", "name")->find($user->current_organization_id);
            },
        ];
    }
}
