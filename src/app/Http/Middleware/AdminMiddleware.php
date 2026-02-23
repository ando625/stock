<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // もしログインしてなかったらログイン画面へ
        if(!auth()->check()){
            return redirect('login');
        }

        // もしログインしていてroleが１(管理者)じゃなかったら
        if(auth()->user()->role !== 1){
            return redirect('/dashboard');
        }
        
        return $next($request);
    }
}
