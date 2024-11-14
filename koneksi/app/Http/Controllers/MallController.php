<?php

namespace App\Http\Controllers;

use App\Models\Mall;
use Illuminate\Http\Request;

class MallController extends Controller
{
    public function getMalls()
    {
        // Mengambil data mall dari tabel 'data_mall'
        $malls = Mall::all();

        // Mengembalikan data mall dalam bentuk JSON
        return response()->json($malls);
    }
}
