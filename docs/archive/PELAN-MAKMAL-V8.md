# Konteks pembangunan makmal EQUILAB V8

## Tujuan dan skop

E-modul FYP kimia SKU3073. V8 memfokuskan kebolehgunaan makmal, keterbacaan, hubungan tindakan-pemerhatian-penerangan dan model kimia yang konsisten. Ia tidak menambah 26 subtopik baharu atau mengubah soalan tesis. Hidrolisis garam menggunakan topik serta pengiraan yang sudah tersedia dalam nota V7.

## Susunan pembelajaran

- Pemilih lima makmal sentiasa tersedia; ikon dan warna membantu membezakan ruang.
- Aktiviti berpandu mengandungi ramalan, perbandingan dan semakan penjelasan. Jawapan latihan bukan markah kuiz.
- Penerokaan bebas memberi bacaan langsung. Pengiraan perbandingan berpandu ialah rekod tetap, tidak ditulis semula apabila kawalan bebas diubah.
- Graf tambahan dan andaian boleh dibuka. Ini mengurangkan panjang halaman utama tanpa membuang penerangan.
- Telefon menggunakan dua paparan: radas/penerangan dan kawalan dengan bacaan langsung.

## Fail dan model

`Lab.jsx` mengekalkan eksport Beaker untuk ilustrasi lama dan mengeksport makmal baharu. `LabWorkbench.jsx` mengurus keadaan eksperimen, `LabApparatus.jsx` melukis SVG, `labModels.js` mengurus dos dan model gas ilustrasi, `lab-workbench.css` menghadkan perubahan gaya kepada makmal. `chemistry.js`, kandungan modul dan pengiraan V7 tidak diubah.

Akueus: ideal, 25 °C, monoprotik; pH menyelesaikan imbangan cas dengan autoionisasi air. Model penimbal mengabaikan perubahan isi padu dan mengira jumlah tambahan bersih. Pengacau mempengaruhi animasi, bukan model keseimbangan campuran lengkap.

Dinamik: A ⇌ B tertutup, kf = 0.08 s⁻¹, kr = 0.04 s⁻¹; [A]+[B] = 1 M. Campuran awal boleh datang dari kedua-dua sisi. Masa model dipercepat; pada 80 s gerakan terus menunjukkan sifat dinamik.

Le Chatelier: model N₂O₄ ⇌ 2NO₂ ideal dalam unit ternormal. K awal = 2 dalam model ilustrasi, bukan nilai pemalar bahan pada suhu tertentu. Panas/sejuk menaik/menurunkan K model. Keadaan akhir memenuhi b²/(aV)=K, dan a+b/2 dikekalkan semasa relaksasi. Tiada nilai kepekatan atau suhu gas sebenar dipaparkan. Setiap tindakan ialah eksperimen baharu daripada keadaan awal. Gas lengai menggunakan suhu serta isi padu tetap. Mangkin mempercepat animasi tanpa mengubah komposisi akhir.

Warna gas mencerminkan kepekatan NO₂ secara ilustrasi. Selepas mampatan, jumlah NO₂ berkurang semasa peralihan ke kiri tetapi kepekatannya boleh masih lebih tinggi daripada keadaan awal. Warna tidak patut dianggap ukuran mol semata-mata.

## Cadangan seterusnya

Lima makmal dan pilihan hidrolisis garam mencukupi sebagai teras semasa. Jika penilaian pakar atau ujian kebolehgunaan menunjukkan keperluan, tambah eksperimen kesan ion sepunya pada asid lemah, atau penyediaan penimbal dengan nisbah HA/A⁻ berbeza. Kaitkan setiap tambahan kepada hasil pembelajaran dan instrumen FYP sebelum meluaskan skop.

Sistem akaun, analitik dan keberkesanan pembelajaran memerlukan pengujian pengguna berasingan. Versi ini tidak mendakwa meningkatkan keberkesanan tanpa bukti kajian.
