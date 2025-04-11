<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class CorsMiddleware
{
public function handle(Request $request, Closure $next)
{
    if ($request->isMethod('OPTIONS')) {
        return response()
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Vary', 'Origin');
    }

    $response = $next($request);

    $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
    $response->headers->set('Access-Control-Allow-Credentials', 'true');
    $response->headers->set('Vary', 'Origin');

    return $response;
}
}
