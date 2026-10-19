# EQUILAB V9 — Panduan & rujukan lengkap

V9 meneruskan V8.1 dan menyediakan akses **Panduan & rujukan** di bahagian atas Utama, Modul, Makmal, Kuiz, Kemajuan, Kelas dan nota setiap modul. Butang kembali pada panduan membawa pengguna ke halaman asal; bahagian nota dan jenis makmal dikekalkan. Nilai eksperimen bebas boleh dimulakan semula selepas berpindah halaman.

## Kandungan panduan

Lapan bahagian BM/English: Mula di sini; Modul & nota; Tutorial makmal; Kuiz & maklum balas; Kemajuan & akaun; Pelajar & pensyarah; Bantuan & soalan lazim; Rujukan pembelajaran.

Tutorial lima makmal menggunakan tangkapan paparan EQUILAB sendiri dengan nombor pada kawalan, tindakan radas, bacaan dan penerangan. Gambar boleh dibesarkan, dizoom sehingga 400% dan ditatal untuk melihat butiran. Tutorial aktiviti berpandu dan penggunaan telefon turut disediakan. Jumlah: 14 gambar setempat, masing-masing BM/English.

Rujukan utama: Flowers, Theopold, Langley dan Robinson (2019), *Chemistry 2e*, OpenStax. Dua belas pautan bahagian buku dipetakan kepada enam modul. Label sumber SKU A/B dalam nota dikekalkan; dokumen kuliah asal tidak disalin ke pakej ini. Semua pautan buku disemak pada 14 Oktober 2026.

## Kemas kini projek V8 atau V8.1 dalam VS Code

Simpan **EquiLab-v9-panduan-rujukan.zip** dalam **Downloads**. Buka terminal PowerShell dalam folder projek EQUILAB yang mengandungi `package.json`. Hentikan pelayan lama dengan **Ctrl+C**, kemudian tampal:

```powershell
& {
  $zipEquiLab = Join-Path $env:USERPROFILE 'Downloads\EquiLab-v9-panduan-rujukan.zip'
  $updateEquiLab = Join-Path $env:TEMP ('EquiLab-v9-' + [guid]::NewGuid().ToString('N'))
  Expand-Archive -LiteralPath $zipEquiLab -DestinationPath $updateEquiLab -ErrorAction Stop
  node (Join-Path $updateEquiLab 'EquiLab-v9\install.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dihentikan. Baca mesej terminal.' }
  if (!(Test-Path '.\node_modules\vite\bin\vite.js')) {
    npm.cmd install
    if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dependency gagal.' }
  }
  npm.cmd run dev
}
```

Pemasang menyemak fail dahulu dan membuat sandaran `backup-v9-...` sebelum menggantikannya. Fail yang mempunyai suntingan sendiri ditolak sebelum perubahan. `.env`, pautan video, data kemajuan, pengiraan kimia, kandungan modul dan gambar modul sedia ada tidak diganti.

## Buka projek penuh atau mula semula selepas laptop ditutup

Ekstrak ZIP dan buka folder **EquiLab-v9** dalam VS Code. Untuk pemasangan pertama:

```powershell
npm.cmd install
npm.cmd run dev
```

Selepas laptop dihidupkan semula, buka projek yang sama dan jalankan **`npm.cmd run dev`** sahaja. Buka alamat **Local** yang dipaparkan, termasuk `/Equilab/`; port boleh berubah. Terminal mesti terus berjalan. Tekan **Ctrl+Shift+R** jika Chrome masih memaparkan versi lama.

Untuk akaun online pada projek penuh, gunakan `.env` projek anda sendiri. Mod tetamu tersedia tanpa konfigurasi akaun. Akaun pensyarah dan perkhidmatan kelas perlu diaktifkan oleh pentadbir.

## Semakan dan sambungan kerja

`npm.cmd test` dan `npm.cmd run build` boleh dijalankan setempat. Lihat **docs/VALIDATION-V9.md** untuk hasil semakan, dan **docs/PANDUAN-V9.md** untuk peta kod. Dokumen V7/V8/V8.1 menerangkan versi terdahulu; dokumen V9 ialah rujukan perubahan terkini.
