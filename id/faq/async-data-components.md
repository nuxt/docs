---
title: Data async di dalam komponen
description: Data async di dalam komponen?
---

# Data async di dalam komponen

Karena komponen sejatinya tidak memiliki metode `asyncData`, Anda tidak bisa langsung mengambil data async dari sisi-server di dalam sebuah komponen. Untuk mengatasi keterbatasan ini Anda memiliki dua pilihan dasar:

1. Melakukan pemanggilan API melalui `mounted` dan sajikan properti data ketika data selesai dimuat. *Kelemahan: Metode ini tidak akan bekerja dengan baik pada server side rendering (SSR).*
2. Melakukan pemanggilan API di metode `asyncData` atau `fetch` di komponen, kemudian lempar data sebagai props ke sub komponen. Maka server rendering akan bekerja dengan baik. *Kelemahan: `asyncData` atau `fetch` di komponen halaman mungkin akan sulit dibaca karena memuat data untuk komponen lainnya*.
