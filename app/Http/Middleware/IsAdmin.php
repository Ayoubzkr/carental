<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->is_admin) {
            return $next($request);
        }

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        return redirect('/');
    }
}
