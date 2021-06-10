<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        // WEB guard
        if (!$request->expectsJson()) {
            return route('login');
        }
        // API guard
        else {
            abort(response()->json([
                'error' => 'Erreur lors de l\'authentification'
            ], 403));
        }

    }
}
