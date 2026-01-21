<?php

namespace App\Exports;

use App\Models\Student;
use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StudentsExport implements FromQuery, WithHeadings, WithMapping
{
    public function __construct(
        protected array $filters = []
    ) {}

    public function query(): Builder
    {
        return Student::query()
            ->when($this->getFilterValue('program_pendidikan'), fn ($q, $v) =>
                $q->where('program_pendidikan', $v)
            )
            ->when($this->getFilterValue('jenis_kelamin'), fn ($q, $v) =>
                $q->where('jenis_kelamin', $v)
            );
    }

    protected function getFilterValue(string $key): mixed
    {
        $value = $this->filters[$key] ?? null;

        if (is_array($value) && array_key_exists('value', $value)) {
            return $value['value'];
        }

        return $value;
    }

    public function headings(): array
    {
        return [
            'ID',
            'Tanggal Pendaftaran',
            'NISN',
            'Nama',
            'Program Pendidikan',
            'NIK',
            'Nomor KK',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Jenis Kelamin',
            'Alamat',
            'Provinsi',
            'Kota',
            'Kecamatan',
            'Kelurahan',
            'Asal Sekolah',
            'Nama Ayah',
            'Nama Ibu',
            'No HP Orang Tua',
            'Nama Pengirim',
            'Image Bukti Transaksi URL',
            'Status Pendaftaran',
            'Created At',
            'Updated At',
        ];
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->created_at->format('d-m-Y H:i'),
            $row->nisn,
            $row->nama,
            $row->program_pendidikan,
            $row->nik,
            $row->nomor_kk,
            $row->tempat_lahir,
            $row->tanggal_lahir ? $row->tanggal_lahir->format('Y-m-d') : '',
            $row->jenis_kelamin,
            $row->alamat,
            $row->provinsi,
            $row->kota,
            $row->kecamatan,
            $row->kelurahan,
            $row->asal_sekolah,
            $row->nama_ayah,
            $row->nama_ibu,
            $row->no_hp_orangtua,
            $row->nama_pengirim,
            $row->image_bukti_transaksi_url,
            $row->status_pendaftaran,
            $row->created_at ? $row->created_at->format('Y-m-d H:i:s') : '',
            $row->updated_at ? $row->updated_at->format('Y-m-d H:i:s') : '',
        ];
    }
}
