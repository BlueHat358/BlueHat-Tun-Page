// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {
//       colors: {
//         dark: {
//           bg: "#0D1117", // Background
//           text: "#E5E5E5", // Teks utama
//         },
//         cold: {
//           primary: "#3B82F6", // Biru (Primary)
//           accent: "#38BDF8", // Cyan (Accent)
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html"], // Sesuaikan dengan lokasi file HTML Anda
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#1C1B17", // Background utama
          text: "#F5F3F0", // Teks utama
        },
        accent: {
          primary: "#E63946", // Merah (Aksi penting)
          secondary: "#FFC857", // Emas (Sorotan/Tombol info)
          success: "#83C5BE", // Hijau mint (Indikator berhasil)
        },
        neutral: {
          odd: "#2A2925", // Baris ganjil tabel
          even: "#1C1B17", // Baris genap tabel
          border: "#FFC857", // Warna border
        },
        muted: {
          bg: "#4E4B41", // Background tombol nonaktif
          text: "#B8B5AD", // Teks nonaktif
        },
      },
    },
  },
  plugins: [],
};
