// Import hal-hal yang diperlukan
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Membuat interface untuk membaca input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi untuk meminta input kepada pengguna
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Fungsi utama
async function main() {
  console.log('=== Sistem Pembuatan Motivation Letter ===\n');
  
  // Meminta input dari pengguna
  const nama = await askQuestion('Nama Anda: ');
  const email = await askQuestion('Email Anda: ');
  const tanggal = await askQuestion('Tanggal (format DD-MM-YYYY): ');
  const penerima = await askQuestion('Penerima Motivation Letter: ');
  console.log('Isi Motivation Letter (tekan ENTER 2 kali untuk mengakhiri):');
  
  // Membaca isi motivation letter
  let isiLetter = '';
  while (true) {
    const line = await askQuestion('');
    if (line === '' && isiLetter.endsWith('\n')) {
      break;
    }
    isiLetter += line + '\n\n';
  }
  
  // Membuat folder letters jika belum ada
  const folderPath = path.join(__dirname, 'letters');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  
  // Membuat nama file
  const namaFile = `${nama}_${tanggal}.txt`;
  const filePath = path.join(folderPath, namaFile);
  
  // Konten yang akan disimpan
  const content = `
${tanggal}

${nama}
${email}

Kepada Yth. ${penerima}

Dengan Hormat,

${isiLetter}Salam Hormat,
${nama}
`;
  
  // Menyimpan ke file
  fs.writeFileSync(filePath, content.trim());
  console.log(`\nMotivation Letter telah berhasil disimpan di: ${filePath}`);
  
  rl.close();
}

// Menjalankan program
main().catch(err => {
  console.error('Terjadi error:', err);
  rl.close();
});