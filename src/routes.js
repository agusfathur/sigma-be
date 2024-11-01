//@ts-nocheck
import express from "express";
import routesUser from "./User/user.controller.js";
import routesAppSetting from "./AppSetting/appSetting.controller.js";
import routesKategoriLibur from "./KategoriLibur/kategoriLibur.controller.js";
import routesLibur from "./DataLibur/libur.controller.js";
import routesJenisIzin from "./JenisIzin/jenisIzin.controller.js";
import routesIdentitasSekolah from "./IdentitasSekolah/identitasSekolah.controller.js";
import routesPajak from "./Pajak/pajak.controller.js";
import routesJabatan from "./Jabatan/jabatan.controller.js";
import routesJabatanFungsionalController from "./JabatanFungsional/jabatanFungsional.controller.js";
import routesStatusKepegawaian from "./StatusKepegawaian/statusKepegawaian.controler.js";
import routesTunjanganTetap from "./TunjanganTetap/tunjanganTetap.controller.js";
import routesTunjanganKehadiran from "./TunjanganKehadiran/tunjanganKehadiran.controller.js";
import routesShiftKerja from "./ShiftKerja/shitKerja.controller.js";
import routesDataLokasi from "./DataLokasi/dataLokasi.controller.js";
import cobaCloud from "./utils/CobaCloudinary/cobaCloud.js";
import routesPegawai from "./Pegawai/pegawai.controller.js";
import routesTunjanganTetapPegawai from "./TunjanganTetapPegawai/tunjanganTetapPegawai.controller.js";
import routesTunjanganBonus from "./TunjanganBonus/tunjanganBonus.controller.js";
import routesPinjaman from "./Pinjaman/pinjaman.controller.js";
import routesPotongGaji from "./PotongGaji/potongGaji.controller.js";
import routesTHR from "./TunjanganHariRaya/tunjanganHariRaya.controller.js";
import routesPermohonanIzin from "./PermohonanIzin/permohonanIzin.controller.js";
import routesJadwalPegawai from "./JadwalPegawai/jadwalPegawai.controller.js";
import routesAbsensi from "./Absensi/absensi.controller.js";
import routesLembur from "./Lembur/lembur.controller.js";
import routesSettingGaji from "./SettingGaji/settingGaji.controller.js";
import routesSlipGaji from "./SlipGaji/slipGaji.controller.js";
import routesPembayaranGaji from "./PembayaranGaji/pembayaranGaji.controller.js";
import routesLogin from "./Auth/auth.controller.js";
import { VerifyToken } from "./Auth/auth.service.js";

const router = express.Router();

router.use("/api/auth", routesLogin);
router.use("/api/user", VerifyToken, routesUser);
router.use("/api/app-setting", VerifyToken, routesAppSetting);
router.use("/api/libur", VerifyToken, routesLibur);
router.use("/api/kategori-libur", VerifyToken, routesKategoriLibur);
router.use("/api/jenis-izin", VerifyToken, routesJenisIzin);
router.use("/api/identitas-sekolah", routesIdentitasSekolah);
router.use("/api/pajak", VerifyToken, routesPajak);
router.use("/api/jabatan", VerifyToken, routesJabatan);
router.use("/api/jabatan-fungsional", VerifyToken, routesJabatanFungsionalController);
router.use("/api/status-kepegawaian", VerifyToken, routesStatusKepegawaian);
router.use("/api/tunjangan-tetap", VerifyToken, routesTunjanganTetap);
router.use("/api/tunjangan-kehadiran", VerifyToken, routesTunjanganKehadiran);
router.use("/api/shift-kerja", VerifyToken, routesShiftKerja);
router.use("/api/data-lokasi", VerifyToken, routesDataLokasi);
router.use("/api/pegawai", VerifyToken, routesPegawai);
router.use("/api/tunjangan-tetap-pegawai", VerifyToken, routesTunjanganTetapPegawai);
router.use("/api/tunjangan-bonus", VerifyToken, routesTunjanganBonus);
router.use("/api/pinjaman", routesPinjaman);
router.use("/api/potong-gaji", VerifyToken, routesPotongGaji);
router.use("/api/thr", VerifyToken, routesTHR);
router.use("/api/permohonan-izin", VerifyToken, routesPermohonanIzin);
router.use("/api/jadwal-pegawai", VerifyToken, routesJadwalPegawai);
router.use("/api/absensi", VerifyToken, routesAbsensi);
router.use("/api/lembur", VerifyToken, routesLembur);
router.use("/api/setting-gaji", VerifyToken, routesSettingGaji);
router.use("/api/slip-gaji", VerifyToken, routesSlipGaji);
router.use("/api/pembayaran-gaji", VerifyToken, routesPembayaranGaji);

// coba
router.use("/api/cloud", cobaCloud);

const routes = router;
export default routes;
