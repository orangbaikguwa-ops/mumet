const daftarSoal = [
  {
    pertanyaan: "f(x) = x^3 + 4,5x + 8^2, nilai dari f(4) adalah? ",
    pilihan: ["144", "148", "146", "142"],
    jawabanBenar: "146"
  },
  {
    pertanyaan: "diketahui dua fungsi f(x)=2x+3, dan g(x)=3x+2, berapakah nilai dari f(g(3))?",
    pilihan: ["18", "26", "25", "21"],
    jawabanBenar: "25"
  },
  {
    pertanyaan: "12x+4<=y-12+x, jika nilai x adalah 3, maka berapakah nilai minimum untuk y?",
    pilihan: ["28", "49", "31", "47"],
    jawabanBenar: "49"
  },
  {
    pertanyaan: "apabila terdapat suatu lengkungan dengan titik pusat berada di y dan -x serta x seimbang dari titik 0 yang menyebabkan cekungan menghadap bawah, manakah pernyataan berikut yang benar?",
    pilihan: ["x^-2", "y^2", "x^2", "y^-2"],
    jawabanBenar: "x^2"
  },
  {
    pertanyaan: "manakah yang termasuk bilangan rasional?",
    pilihan: ["3,14..", "0,1010..", "0,214567", "1,414.."],
    jawabanBenar: "0,214567"
  }
];

const nomorSoal = document.getElementById("nomor-soal");
const pertanyaan = document.getElementById("pertanyaan");
const pilihanJawaban = document.getElementById("pilihan-jawaban");
const btnSelanjutnya = document.getElementById("btn-selanjutnya");
const quizBox = document.getElementById("quiz-box");
const hasilBox = document.getElementById("hasil-box");
const skorAkhir = document.getElementById("skor-akhir");
const btnUlang = document.getElementById("btn-ulang");

// Elemen baru untuk amplop dan surat
const completionMessage = document.getElementById("completionMessage");
const buttonGroup = document.getElementById("buttonGroup");
const btnLanjutkan = document.getElementById("btn-lanjutkan");
const btnSelesai = document.getElementById("btn-selesai");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const letterContainer = document.getElementById("letterContainer");
const letter = document.getElementById("letter");

let indeksSoal = 0;
let skor = 0;

function tampilkanSoal() {
  const soalSekarang = daftarSoal[indeksSoal];

  nomorSoal.textContent = `Soal ${indeksSoal + 1} dari ${daftarSoal.length}`;
  pertanyaan.textContent = soalSekarang.pertanyaan;

  pilihanJawaban.innerHTML = "";
  btnSelanjutnya.disabled = true;

  soalSekarang.pilihan.forEach(function(pilihan) {
    const tombol = document.createElement("button");

    tombol.textContent = pilihan;
    tombol.classList.add("btn-jawaban");

    tombol.addEventListener("click", function() {
      cekJawaban(tombol, pilihan);
    });

    pilihanJawaban.appendChild(tombol);
  });
}

function cekJawaban(tombolDipilih, jawabanUser) {
  const soalSekarang = daftarSoal[indeksSoal];
  const semuaTombol = document.querySelectorAll(".btn-jawaban");

  semuaTombol.forEach(function(tombol) {
    tombol.disabled = true;

    if (tombol.textContent === soalSekarang.jawabanBenar) {
      tombol.classList.add("benar");
    }
  });

  if (jawabanUser === soalSekarang.jawabanBenar) {
    skor++;
  } else {
    tombolDipilih.classList.add("salah");
  }

  btnSelanjutnya.disabled = false;
}

function tampilkanHasil() {
  quizBox.classList.add("hidden");
  hasilBox.classList.remove("hidden");

  skorAkhir.textContent = `Skor kamu: ${skor} dari ${daftarSoal.length}`;
  
  // Tampilkan pesan penyelesaian dan tombol
  completionMessage.style.display = "block";
  buttonGroup.style.display = "flex";
}

// Event listener untuk tombol Selanjutnya
btnSelanjutnya.addEventListener("click", function() {
  indeksSoal++;

  if (indeksSoal < daftarSoal.length) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
});

// Event listener untuk tombol Lanjutkan
btnLanjutkan.addEventListener("click", function() {
  // Sembunyikan hasil box dengan inline style untuk menghindari konflik class
  hasilBox.style.display = "none";
  
  // Tampilkan amplop
  envelopeContainer.style.display = "flex";
});

// Event listener untuk tombol Selesai
btnSelesai.addEventListener("click", function() {
  if (confirm("Yakin ingin keluar dari quiz?")) {
    window.close();
    // Alternatif jika window.close() tidak bekerja:
    // document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:50px;'>Terima kasih sudah mengerjakan quiz!</h1>";
    // document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  }
});

// Event listener untuk membuka amplop
envelope.addEventListener("click", function() {
  // Buka flap amplop
  envelope.classList.add("open");
  
  // Tampilkan surat setelah animasi amplop
  setTimeout(function() {
    letterContainer.style.display = "block";
    letter.classList.remove("folded");
    letter.classList.add("unfolded", "letter-appearing");
  }, 600);
});

// Event listener untuk tombol Ulang
btnUlang.addEventListener("click", function() {
  indeksSoal = 0;
  skor = 0;

  // Reset semua tampilan
  hasilBox.style.display = "";
  hasilBox.classList.remove("hidden");
  completionMessage.style.display = "none";
  buttonGroup.style.display = "none";
  envelopeContainer.style.display = "none";
  letterContainer.style.display = "none";
  envelope.classList.remove("open");
  letter.classList.remove("unfolded", "letter-appearing");
  letter.classList.add("folded");
  
  quizBox.classList.remove("hidden");
  hasilBox.classList.add("hidden");

  tampilkanSoal();
});

// Optional: Tekan ESC untuk keluar
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    if (envelopeContainer.style.display === "flex") {
      if (confirm("Yakin ingin keluar dari quiz?")) {
        window.close();
      }
    }
  }
});

tampilkanSoal();