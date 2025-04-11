<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];

    protected function getTokenFromRequest($request)
    {
        $token = $request->header('X-CSRF-TOKEN');
        if (!$token && $request->header('X-XSRF-TOKEN')) {
            $token = $request->header('X-XSRF-TOKEN');
        }
        return $token;
    }
}
