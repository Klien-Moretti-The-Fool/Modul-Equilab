# EQUILAB V8 — Makmal interaktif

V8 meneruskan projek React/Vite V7. Lima makmal mempunyai pemilih kad berwarna, tulisan berkontras, kawalan radas, bacaan langsung dan penerangan yang diletakkan berdekatan. Aktiviti berpandu serta graf/perbandingan boleh dibuka apabila diperlukan. Nota enam modul V7 masih tersedia.

## Kemudahan makmal

| Makmal | Tindakan pelajar | Pemerhatian utama |
|---|---|---|
| Pengionan dalam air | Pilih asid/bes, kuat/lemah, kepekatan dan pencairan 10× | Bezakan peratus pengionan dengan kepekatan ion dan pH |
| Hidrolisis garam, dalam makmal pengionan | Tukar NaCl, NH₄Cl atau CH₃COONa pada kepekatan sama | Garam boleh bersifat neutral, asid atau bes |
| Studio titrasi | Buka/tutup pili buret, tambah 0.1/1 mL, pilih penunjuk atau titik rujukan | Warna, pH dan perbezaan titik akhir/kesetaraan |
| Penimbal | Pipet HCl/NaOH, pilih dos, hidup/henti pengacau | HA/A⁻, ΔpH, perbandingan air dan kapasiti terhad |
| Keseimbangan dinamik | Sediakan campuran awal A/B, main/jeda masa model | Kadar menjadi sama tetapi tidak sifar; komposisi tidak semestinya sama |
| Le Chatelier | Panas/sejuk, tekan/tarik omboh, tambah gas atau mangkin | Peralihan, perubahan K dan tiga peringkat respons |

Pada telefon, gunakan **Radas & penerangan** atau **Kawalan eksperimen**. Bacaan langsung tersedia semasa mengubah kawalan. Pada komputer, kedua-duanya dipaparkan bersebelahan.

## Masukkan ke projek V7 sedia ada melalui terminal

1. Muat turun `EquiLab-v8-makmal-interaktif.zip` ke folder **Downloads**. Jangan buka ZIP sebagai folder projek.
2. Buka projek EQUILAB V7 sedia ada dalam VS Code. Buka **Terminal → New Terminal**. Hentikan pelayan lama dengan **Ctrl+C** jika sedang berjalan.
3. Tampal keseluruhan blok PowerShell ini:

```powershell
& {
  $zipEquiLab = Join-Path $env:USERPROFILE 'Downloads\EquiLab-v8-makmal-interaktif.zip'
  if (!(Test-Path -LiteralPath $zipEquiLab)) { throw 'ZIP belum dijumpai dalam Downloads. Tukar laluan $zipEquiLab jika fail disimpan di tempat lain.' }
  $updateEquiLab = Join-Path $env:TEMP ('EquiLab-v8-' + [guid]::NewGuid().ToString('N'))
  Expand-Archive -LiteralPath $zipEquiLab -DestinationPath $updateEquiLab
  node (Join-Path $updateEquiLab 'EquiLab-v8\install.mjs')
  if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dihentikan. Baca mesej terminal sebelum meneruskan.' }
  if (!(Test-Path -LiteralPath '.\node_modules\vite\bin\vite.js')) {
    npm.cmd install
    if ($LASTEXITCODE -ne 0) { throw 'Pemasangan dependency gagal. Semak mesej npm.' }
  }
  npm.cmd run dev
}
```

Pemasang menyemak fail sebelum menulis dan menyediakan folder `backup-v8-...` untuk fail yang diubah. Fail yang mempunyai suntingan tersendiri menyebabkan pemasangan dihentikan untuk mengelakkan kehilangan kod. Pemasangan ulangan tidak menghasilkan sandaran baharu jika semua fail sudah terkini. Pakej penuh V8 boleh dibuka secara berasingan jika projek asas berbeza.

Pemasang hanya mengemas kini fail makmal dan panduannya. Konfigurasi akaun `.env`, pautan dalam `moduleVideos.js`, gambar kad modul dan data kemajuan tidak termasuk dalam senarai fail kemas kini.

## Jika mahu guna sebagai projek lengkap

Ekstrak ZIP → **File → Open Folder** dalam VS Code → pilih folder **EquiLab-v8** yang mengandungi `package.json`.

```powershell
npm.cmd install
npm.cmd run dev
```

Untuk akaun online, salin konfigurasi `.env` projek anda ke folder baharu. Mod tetamu boleh digunakan tanpa konfigurasi akaun.

## Buka dalam Chrome

Selepas pelayan berjalan, klik atau salin **alamat Local yang dipaparkan oleh Vite**, termasuk `/Equilab/`. Biasanya `http://localhost:5173/Equilab/`, tetapi port boleh berbeza jika sedang digunakan. Tampal alamat itu pada bar alamat Chrome. Terminal perlu terus berjalan. Ini projek Vite; jangan buka `index.html` terus atau gunakan Live Server.

Jika paparan lama masih muncul, pastikan tab Chrome menggunakan alamat pelayan projek yang betul, kemudian tekan **Ctrl+Shift+R**.

## Video YouTube dan kesinambungan projek

Butang video dalam nota V7 kekal. Rujuk `docs/VIDEO-YOUTUBE-V7.md` dan jalankan `node set-video.mjs` dengan ID modul serta URL video. Tiada pautan rawak dimasukkan.

Untuk sambung dalam chat baharu, lampirkan ZIP terkini dan minta pembantu membaca `README-V8.md`, `docs/PELAN-MAKMAL-V8.md` serta `docs/VALIDATION-V8.md`. Pembantu perlu melihat fail sebenar; jangan anggap kod atau keseluruhan chat lama tersedia secara automatik.

## Semakan setempat

```powershell
npm.cmd test
npm.cmd run build
```

Lihat `docs/VALIDATION-V8.md` untuk semakan versi yang dihantar.
