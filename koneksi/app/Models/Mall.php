<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mall extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dari konvensi (data_malls)
    protected $table = 'data_mall';

    // Tentukan kolom yang boleh diisi (jika diperlukan)
    protected $fillable = ['id', 'name', 'location', 'other_columns'];
}
