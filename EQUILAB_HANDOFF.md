# EQUILAB — serahan SKU v4, 7 Oktober 2026

Projek React/Vite sedia ada untuk FYP UPSI SKU3073. Kekalkan tema navy/teal, BM/English, fungsi akaun, enam modul dan lima langkah kemajuan per modul. User memasang ZIP melalui PowerShell VS Code dan mahu kerja diteruskan topik demi topik.

## Perubahan v4

- Studio tiga teori dikekalkan; contoh Lewis Cl-/BCl3 dan kompleks K+/air ditambah.
- 26 subtopik tambahan dalam `src/redesign/skuTopics.js`, dipaparkan melalui `SkuExplorer.jsx` dan `sku-explorer.css`.
- Setiap topik: objektif, nota, formula, contoh berlangkah, tips, latihan nombor dengan maklum balas. Beberapa topik mempunyai kalkulator/penerokaan khusus.
- Liputan: konjugat, arah asid-bes, leveling, Kw/pH, dinamik, Q/K, perubahan K, Kp, ICE, Le Chatelier, van't Hoff, struktur, poliprotik, pencairan, asid/bes lemah, Ka daripada pH, garam, ion logam; pengayaan penimbal dan titrasi.
- `chemistry.js`: tambah weakRoot, polyproticFractions/polyproticPH (imbangan jisim/cas), kpFromKc, vanthoff, saltPH dan pilihan bahan lemah.
- `Lab.jsx`: pilihan bahan/Ka/Kb, nisbah pengionan berangka, komponen penimbal berasingan, dua graf dinamik termasuk kedua-dua arah, gas lengai pada V tetap.
- Bank kuiz 44 soalan. 18 ID soalan asal kekal. Penilaian keseluruhan 15 soalan merangkumi sekurang-kurangnya dua daripada setiap modul.
- Developer: `import.meta.env.DEV` dan `?review=1`; pautan terus topik, semua fungsi save progress/score dipintas dan kunci sesi kuiz berasingan. Bukan kawalan akses; tidak memberikan peranan pensyarah. URL biasa keluar mod selepas muat semula.
- Tajuk langkah nota dikemas kini supaya kandungan tambahan mudah dikenal pasti; bahan tambahan disusun di bawah langkah nota sedia ada. Peta tepat tersedia dalam PETA-KANDUNGAN.md.

## Had penting

Latihan tambahan dan catatan studio teori sementara; markah hanya daripada kuiz modul/penilaian. Kemajuan lama tidak direset, jadi bukan bukti bahan baharu dibaca. Penerokaan poliprotik hanya asid fosforik dan askorbik, bukan titrasi poliprotik. Makmal garam berangka hanya NaCl, asetat dan ammonium; kation logam dibincang secara konseptual. Keseluruhan skop matematik ialah larutan ideal dengan andaian diterangkan.

Ruang pelajar/pensyarah sedia ada diperiksa dalam kod tetapi akaun Supabase langsung belum dikonfigurasi atau diuji dalam kemas kini ini. Cadangan editor/tugasan/analisis item belum dibina. Jangan mendakwa semua ciri cadangan sudah aktif.

## Sumber dan pembetulan

PDF SKU A/B masing-masing 52 halaman digunakan untuk pemetaan. Jangan menyalin kesilapan: A30 0.500−0.020=0.480; A36 [PCl5] akhir 0.600+x; B36 pengionan kedua menambah H3O+; B47 ion pengiring Cr(NO3)3 ialah NO3-. Leveling dihuraikan menggunakan OpenStax kerana PDF hanya menyenaraikan tajuk. Nota penimbal/titrasi ialah pengayaan sedia ada, bukan kandungan dua fail SKU.

Rujukan tambahan: OpenStax Chemistry 2e 13.3, 14.3, 14.4, 14.5, 14.6, 14.7 dan 15.2. Rujuk panduan dalam aplikasi.

## Sambung kerja

Baca kod sebenar yang dimuat naik pengguna. Pakej ini ialah kemas kini, bukan projek npm penuh. Minta ZIP projek terkini jika perlu; kecualikan node_modules, dist, .git dan .env. Jangan menggantikan suntingan pengguna tanpa semakan. Laporan ujian dalam VALIDATION.md.
