import { getAllSlipGaji, getSlipGajiById, insertSlipGaji, updateSlipGaji } from "./slipGaJi.repository.js";

import { GetAllAbsensiByBulanTahunPegawai } from "../Absensi/absensi.service.js";
import { GetAllPegawaiByStatus } from "../Pegawai/pegawai.service.js";
import { GetALemburByPegawaiAndBulanTahunStatus } from "../Lembur/lembur.service.js";
import { StatusTerima } from "@prisma/client";
import { getTunjanganTetapById } from "../TunjanganTetap/tunjanganTetap.repository.js";
import { GetSettingGaji } from "../SettingGaji/settingGaji.service.js";
import { GetTunjanganKehadiranById } from "../TunjanganKehadiran/tunjanganKehadiran.service.js";
import { GetPajakById } from "../Pajak/pajak.service.js";
import { GetPinjamanPegawaibyTahunBulan } from "../Pinjaman/pinjaman.service.js";
import { GetPotonGajiPegawaibyTahunBulan } from "../PotongGaji/potongGaji.service.js";
import { GetAllTunjanganBonusByBulanTahunPegawai } from "../TunjanganBonus/tunjanganBonus.service.js";
import {
  createSlipGajiDetailGajiPokok,
  getSlipGajiDetailGajiPokokbyBulanTahun,
  updateSlipGajiDetailGajiPokok
} from "../SlipGajiDetail/SGJ.gajiPokok.controller.js";
import {
  createSlipGajiDetailTetap,
  deleteSlipGajiDetailTetap,
  getSlipGajiDetailTjTetapByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.tunjanganTetap.controller.js";
import {
  createSlipGajiDetailPotongGaji,
  deleteSlipGajiDetailPotongGaji,
  getSlipGajiDetailPotongGajiByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.potongGaji.controller.js";
import {
  createSlipGajiDetailPinjaman,
  deleteSlipGajiDetailPinjaman,
  getSlipGajiDetailPinjamanByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.pinjaman.controller.js";
import {
  createSlipGajiDetailKehadiran,
  deleteSlipGajiDetailKehadiran,
  getSlipGajiDetailKehadiranByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.kehadiran.controller.js";
import {
  createSlipGajiDetailFungsional,
  deleteSlipGajiDetailFungsional,
  getSlipGajiDetailFungsionalByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.fungsional.controller.js";
import {
  createSlipGajiDetailBonus,
  deleteSlipGajiDetailBonus,
  getSlipGajiDetailBonusByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.bonus.controller.js";
import {
  createSlipGajiDetailPajak,
  deleteSlipGajiDetailPajak,
  getSlipGajiDetailPajakByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.pajak.controller.js";
import {
  createSlipGajiDetailLembur,
  deleteSlipGajiDetailLembur,
  getSlipGajiDetailLemburByPegawaiBulanTahun
} from "../SlipGajiDetail/SGJ.lembur.controller.js";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
import { GetTunjanganTetapPegawaiById } from "../TunjanganTetapPegawai/tunjanganTetapPegawai.service.js";

export const GetAllSlipGaji = async () => {
  const data = await getAllSlipGaji();
  return data;
};

export const GetAllSlipGajiByBulanTahun = async (bulan, tahun) => {
  const data = await getAllSlipGaji({ bulan, tahun });
  return data;
};

export const GetAllSlipGajiByBulanTahunPegawai = async (bulan, tahun, pegawai_id) => {
  const data = await getAllSlipGaji({ bulan, tahun, pegawai_id });
  return data;
};

export const GetAllSlipGajiByTahunPegawai = async (tahun, pegawai_id) => {
  const data = await getAllSlipGaji({ tahun, pegawai_id });
  return data;
};

export const GetSlipGajiById = async (id) => {
  const data = await getSlipGajiById(id);
  return data;
};

export const GetAllSlipGajiByPegawai = async (id) => {
  const data = await getAllSlipGaji({ pegawai_id: id });
  return data;
};

export const GetRekapGajiByTahun = async (tahun) => {
  const slipGaji = await getAllSlipGaji({ tahun });

  // Group by month number
  const rekapByBulan = slipGaji.reduce((acc, slip) => {
    if (!acc[slip.bulan]) {
      acc[slip.bulan] = {
        bulan: slip.bulan,
        totalGajiPokok: 0,
        totalTunjangan: 0,
        totalPotongan: 0,
        totalPengeluaran: 0
      };
    }

    // Sum up base salary
    acc[slip.bulan].totalGajiPokok += slip.gaji_pokok;

    // Sum up all allowances
    const totalTunjangan =
      slip.tunjangan_tetap +
      slip.tunjangan_kehadiran +
      slip.tunjangan_fungsional +
      slip.tunjangan_bonus +
      slip.tunjangan_lembur;
    acc[slip.bulan].totalTunjangan += totalTunjangan;

    // Sum up all deductions
    const totalPotongan = slip.pajak + slip.pinjaman + slip.potong_gaji;
    acc[slip.bulan].totalPotongan += totalPotongan;

    // Calculate total expenditure
    acc[slip.bulan].totalPengeluaran = acc[slip.bulan].totalGajiPokok + acc[slip.bulan].totalTunjangan;
    acc[slip.bulan].tahun = slip.tahun;
    return acc;
  }, {});

  // Convert to array and sort by month number
  const rekapArray = Object.values(rekapByBulan).sort((a, b) => a.bulan - b.bulan);

  return rekapArray;
};
export const CreateManySlipGaji = async (bulan, tahun) => {
  const checkSlipGaji = await getAllSlipGaji({ bulan, tahun });
  if (checkSlipGaji.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Slip Gaji Already Exists",
      data: {}
    };
  }
  const now = new Date(
    new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-") + "T00:00:00.000Z"
  );
  const allPegawai = await GetAllPegawaiByStatus("aktif");
  const settingGaji = await GetSettingGaji();
  let tunjanganKehadiran;
  if (settingGaji.tunjangan_kehadiran_id !== null) {
    tunjanganKehadiran = await GetTunjanganKehadiranById(settingGaji.tunjangan_kehadiran_id);
  }
  let pajak = [];
  if (settingGaji.pajak_id.length > 0) {
    for (const pjk of settingGaji.pajak_id) {
      const getPajak = await GetPajakById(pjk);
      pajak.push(getPajak);
    }
  }
  const slipGajiPegawai = [];
  for (const pge of allPegawai) {
    const insertGaji = await insertSlipGaji({
      pegawai_id: pge.id_pegawai,
      gaji_pokok: 0,
      tunjangan_tetap: 0,
      tunjangan_kehadiran: 0,
      tunjangan_fungsional: 0,
      tunjangan_bonus: 0,
      tunjangan_lembur: 0,
      pajak: 0,
      pinjaman: 0,
      potong_gaji: 0,
      total_gaji_kotor: 0,
      total_gaji_bersih: 0,
      tanggal: now,
      bulan,
      tahun
    });
    // Gaji Pokok
    const gajiPokok = pge.jabatan.gaji || 0;
    const createGajiPokokDetail = await createSlipGajiDetailGajiPokok({
      slip_gaji_id: insertGaji.id_slip_gaji,
      jabatan_id: pge.jabatan.id_jabatan,
      total_gaji_pokok: gajiPokok,
      tanggal: insertGaji.tanggal,
      bulan: insertGaji.bulan,
      tahun: insertGaji.tahun
    });

    // Tunjangan Tetap
    let tunjanganTetap = 0;
    if (settingGaji.tunjangan_tetap) {
      if (pge.tunjangan_tetap_pegawai.length > 0) {
        for await (const tjTetap of pge.tunjangan_tetap_pegawai) {
          const tjNominal = await getTunjanganTetapById(tjTetap.tunjangan_tetap_id);
          tunjanganTetap += tjNominal.nominal;
          const createDetailTetap = await createSlipGajiDetailTetap({
            slip_gaji_id: insertGaji.id_slip_gaji,
            tunjangan_tetap_id: tjNominal.id_tunjangan_tetap,
            tunjangan_tetap_pegawai_id: tjTetap.id_tunjangan_tetap_pegawai,
            total_tetap: tjNominal.nominal,
            tanggal: insertGaji.tanggal,
            bulan: insertGaji.bulan,
            tahun: insertGaji.tahun
          });
        }
      }
    }

    // kehadiran
    let totalKehadiran = 0;
    if (settingGaji.tunjangan_kehadiran_id) {
      const absensi = await GetAllAbsensiByBulanTahunPegawai(pge.id_pegawai, bulan, tahun);

      if (absensi.length > 0) {
        totalKehadiran = absensi.length * tunjanganKehadiran.nominal;
        const createDetailKehadiran = await createSlipGajiDetailKehadiran({
          slip_gaji_id: insertGaji.id_slip_gaji,
          tunjangan_kehadiran_id: tunjanganKehadiran.id_tunjangan_kehadiran,
          total_kehadiran: absensi.length,
          upah_per_hadir: tunjanganKehadiran.nominal,
          total: totalKehadiran,
          tanggal: insertGaji.tanggal,
          bulan: insertGaji.bulan,
          tahun: insertGaji.tahun
        });
      }
    }

    // jabatan fungsional
    let totalJabatanFungsional = 0;
    if (settingGaji.tunjangan_fungsional) {
      if (pge.jabatanFungsional.length > 0) {
        for await (const jbf of pge.jabatanFungsional) {
          totalJabatanFungsional += jbf.jabatanFungsional.tunjangan;
          // Call the function to create slip gaji detail
          const createDetailFungsional = await createSlipGajiDetailFungsional({
            total_fungsional: jbf.jabatanFungsional.tunjangan,
            tanggal: insertGaji.tanggal,
            bulan: insertGaji.bulan,
            tahun: insertGaji.tahun,
            slip_gaji: {
              connect: {
                id_slip_gaji: insertGaji.id_slip_gaji
              }
            },
            jabatan_fungsional: {
              connect: {
                id_jabatan_fungsional: jbf.jabatanFungsional.id_jabatan_fungsional
              }
            }
          });
        }
      }
    }

    let totalTunjanganBonus = 0;
    if (settingGaji.tunjangan_bonus) {
      const bonus = await GetAllTunjanganBonusByBulanTahunPegawai(pge.id_pegawai, bulan, tahun);
      if (bonus.length > 0) {
        for await (const bns of bonus) {
          totalTunjanganBonus += bns.nominal;
          const createDetailBonus = await createSlipGajiDetailBonus({
            slip_gaji_id: insertGaji.id_slip_gaji,
            bonus_id: bns.id_tunjangan_bonus,
            total_bonus: bns.nominal,
            tanggal: insertGaji.tanggal,
            bulan: insertGaji.bulan,
            tahun: insertGaji.tahun
          });
          console.log({ totalTunjanganBonus, createDetailBonus });
        }
      }
    }

    // Lembur
    let totalUpahLembur = 0;
    if (settingGaji.tunjangan_lembur) {
      const lembur = await GetALemburByPegawaiAndBulanTahunStatus(pge.id_pegawai, StatusTerima.diterima, bulan, tahun);

      for await (const lmb of lembur) {
        totalUpahLembur += lmb.total_upah;
        const createDetailLembur = await createSlipGajiDetailLembur({
          slip_gaji_id: insertGaji.id_slip_gaji,
          absen_id: lmb.absensi_id,
          lembur_id: lmb.id_lembur,
          total_upah: lmb.total_upah,
          tanggal: insertGaji.tanggal,
          bulan: insertGaji.bulan,
          tahun: insertGaji.tahun
        });
      }
    }

    // pinjaman
    let totalPinjaman = 0;
    if (settingGaji.pinjaman) {
      const pinjaman = await GetPinjamanPegawaibyTahunBulan(pge.id_pegawai, bulan, tahun);
      if (pinjaman.length > 0) {
        for await (const pjm of pinjaman) {
          totalPinjaman += pjm.nominal;
          const createDetailPinjaman = await createSlipGajiDetailPinjaman({
            slip_gaji_id: insertGaji.id_slip_gaji,
            pinjaman_id: pjm.id_pinjaman,
            total_pinjaman: pjm.nominal,
            tanggal: insertGaji.tanggal,
            bulan: insertGaji.bulan,
            tahun: insertGaji.tahun
          });
        }
      }
    }

    // potong gaji
    let totalPotongGaji = 0;
    if (settingGaji.potong_gaji) {
      const potongGaji = await GetPotonGajiPegawaibyTahunBulan(pge.id_pegawai, bulan, tahun);

      if (potongGaji.length > 0) {
        // Hitung total potongan gaji dengan reduce

        // Loop untuk setiap potongan gaji
        for await (const pg of potongGaji) {
          totalPotongGaji += pg.nominal;
          const insertDetailPotongGaji = await createSlipGajiDetailPotongGaji({
            slip_gaji_id: insertGaji.id_slip_gaji,
            potong_gaji_id: pg.id_potong_gaji,
            total_potong_gaji: pg.nominal,
            tanggal: insertGaji.tanggal,
            bulan: insertGaji.bulan,
            tahun: insertGaji.tahun
          });
        }
      }
    }

    // total gaji
    const totalGajiKotor =
      gajiPokok +
      tunjanganTetap +
      totalKehadiran +
      totalJabatanFungsional +
      totalTunjanganBonus +
      totalUpahLembur -
      totalPinjaman -
      totalPotongGaji;

    // pajak
    // pajak.reduce((a, b) => a + b.persen, 0) || 0;
    let totalPajak = 0;
    if (pajak.length > 0) {
      for await (const pjk of pajak) {
        totalPajak += pjk.persen;
        const insertDetailPajak = await createSlipGajiDetailPajak({
          slip_gaji_id: insertGaji.id_slip_gaji,
          pajak_id: pjk.id_pajak,
          total_pajak_persen: pjk.persen,
          total_pajak_rupiah: (pjk.persen * totalGajiKotor) / 100,
          tanggal: insertGaji.tanggal,
          bulan: insertGaji.bulan,
          tahun: insertGaji.tahun
        });
      }
    }
    const pajakPengurang = totalGajiKotor * (totalPajak / 100);
    const totalGaji = totalGajiKotor - pajakPengurang;

    const updateGaji = await updateSlipGaji(insertGaji.id_slip_gaji, {
      pegawai_id: pge.id_pegawai,
      gaji_pokok: gajiPokok,
      tunjangan_tetap: tunjanganTetap,
      tunjangan_kehadiran: totalKehadiran,
      tunjangan_fungsional: totalJabatanFungsional,
      tunjangan_bonus: totalTunjanganBonus,
      tunjangan_lembur: totalUpahLembur,
      pajak: pajakPengurang,
      pinjaman: totalPinjaman,
      potong_gaji: totalPotongGaji,
      total_gaji_kotor: totalGajiKotor,
      total_gaji_bersih: totalGaji,
      tanggal: now,
      bulan,
      tahun
    });
    slipGajiPegawai.push(updateGaji);
  }

  return {
    status: true,
    statusCode: 200,
    message: "succes",
    data: slipGajiPegawai
  };
};

export const CreateSlipGaji = async (data) => {
  const create = await insertSlipGaji(data);
  return create;
};

export const UpdateManySlipGaji = async (bulan, tahun) => {
  const getSlipGaji = await getAllSlipGaji({ bulan, tahun });

  if (getSlipGaji.length < 1) {
    return {
      status: true,
      statusCode: 200,
      message: "Data not found, please create slip gaji first",
      data: []
    };
  }
  const now = new Date(
    new Date()
      .toLocaleDateString("id-ID")
      .split("/")
      .map((part) => part.padStart(2, "0"))
      .reverse()
      .join("-") + "T00:00:00.000Z"
  );
  const settingGaji = await GetSettingGaji();
  const slipGajiPegawai = [];
  for await (const slipGaji of getSlipGaji) {
    let pajak = [];
    if (settingGaji.pajak_id.length > 0) {
      for (const pjk of settingGaji.pajak_id) {
        const getPajak = await GetPajakById(pjk);
        pajak.push(getPajak);
      }
    }
    const pge = await getPegawaiById(slipGaji.pegawai_id);

    // Gaji Pokok
    const gajiPokok = pge.jabatan.gaji || 0;
    const getGajiPokok = await getSlipGajiDetailGajiPokokbyBulanTahun(
      slipGaji.pegawai_id,
      slipGaji.bulan,
      slipGaji.tahun
    );
    const createGajiPokokDetail = await updateSlipGajiDetailGajiPokok(getGajiPokok.id_slip_gaji_detail_gaji_pokok, {
      total_gaji_pokok: gajiPokok
    });

    // Tunjangan Tetap
    let tunjanganTetap = 0;
    if (settingGaji.tunjangan_tetap) {
      const getTJDetail = await getSlipGajiDetailTjTetapByPegawaiBulanTahun(
        slipGaji.pegawai_id,
        slipGaji.bulan,
        slipGaji.tahun
      );
      if (getTJDetail.length > 0) {
        for await (const detail of getTJDetail) {
          await deleteSlipGajiDetailTetap(detail.id_slip_gaji_detail_tetap);
        }
      }
      // Mendapatkan detail tunjangan tetap berdasarkan pegawai, bulan, dan tahun
      const getTunjanganTetap = await GetTunjanganTetapPegawaiById(slipGaji.pegawai_id);
      if (getTunjanganTetap.length > 0) {
        for await (const tjTetap of getTunjanganTetap) {
          const tjNominal = await getTunjanganTetapById(tjTetap.tunjangan_tetap_id);
          tunjanganTetap += tjNominal.nominal;
          const createDetailTetap = await createSlipGajiDetailTetap({
            slip_gaji_id: slipGaji.id_slip_gaji,
            tunjangan_tetap_id: tjNominal.id_tunjangan_tetap,
            tunjangan_tetap_pegawai_id: tjTetap.id_tunjangan_tetap_pegawai,
            total_tetap: tjNominal.nominal,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun
          });
        }
      }

      // if (getTunjanganTetap.length > 0) {
      //   for await (const gtt of getTunjanganTetap) {
      //     await deleteSlipGajiDetailTetap(gtt.id_slip_gaji_detail_tetap);
      //   }
      //   // buat ulang
      //   const getTunjanganTetapPge = await getTunjanganBonusByPegawaiId(pge.id_pegawai);
      //   for await (const tjTetap of getTunjanganTetapPge) {
      //     const tjNominal = await getTunjanganTetapById(tjTetap.tunjangan_tetap_id);
      //     tunjanganTetap += tjNominal.nominal;
      //     const createDetailTetap = await createSlipGajiDetailTetap({
      //       slip_gaji_id: slipGaji.id_slip_gaji,
      //       tunjangan_tetap_id: tjNominal.id_tunjangan_tetap,
      //       tunjangan_tetap_pegawai_id: tjTetap.id_tunjangan_tetap_pegawai,
      //       total_tetap: tjNominal.nominal,
      //       tanggal: slipGaji.tanggal,
      //       bulan: slipGaji.bulan,
      //       tahun: slipGaji.tahun
      //     });
      //   }
      // }
    }

    // kehadiran
    let totalKehadiran = 0;

    if (settingGaji.tunjangan_kehadiran_id !== null) {
      const tunjanganKehadiran = await GetTunjanganKehadiranById(settingGaji.tunjangan_kehadiran_id);

      const absensi = await GetAllAbsensiByBulanTahunPegawai(pge.id_pegawai, bulan, tahun);

      totalKehadiran = absensi.length * tunjanganKehadiran.nominal;
      const getDetailKehadiran = await getSlipGajiDetailKehadiranByPegawaiBulanTahun(
        slipGaji.pegawai_id,
        slipGaji.bulan,
        slipGaji.tahun
      );
      if (getDetailKehadiran.length > 0) {
        for await (const gtk of getDetailKehadiran) {
          await deleteSlipGajiDetailKehadiran(gtk.id_slip_gaji_detail_kehadiran);
          const createDetailKehadiran = await createSlipGajiDetailKehadiran({
            slip_gaji_id: slipGaji.id_slip_gaji,
            tunjangan_kehadiran_id: tunjanganKehadiran.id_tunjangan_kehadiran,
            total_kehadiran: absensi.length,
            upah_per_hadir: tunjanganKehadiran.nominal,
            total: totalKehadiran,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun
          });
        }
      }
    }

    // jabatan fungsional
    let totalJabatanFungsional = 0;
    if (settingGaji.tunjangan_fungsional) {
      const getTjFungsional = await getSlipGajiDetailFungsionalByPegawaiBulanTahun(
        pge.id_pegawai,
        slipGaji.bulan,
        slipGaji.tahun
      );
      if (getTjFungsional.length > 0) {
        for await (const gtf of getTjFungsional) {
          await deleteSlipGajiDetailFungsional(gtf.id_slip_gaji_detail_fungsional);
        }
      }

      if (pge.jabatanFungsional.length > 0) {
        for await (const jbf of pge.jabatanFungsional) {
          totalJabatanFungsional += jbf.jabatanFungsional.tunjangan;

          // Call the function to create slip gaji detail
          const createDetailFungsional = await createSlipGajiDetailFungsional({
            total_fungsional: jbf.jabatanFungsional.tunjangan,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun,
            slip_gaji: {
              connect: {
                id_slip_gaji: slipGaji.id_slip_gaji
              }
            },
            jabatan_fungsional: {
              connect: {
                id_jabatan_fungsional: jbf.jabatanFungsional.id_jabatan_fungsional
              }
            }
          });
        }
      }
    }

    let totalTunjanganBonus = 0;
    if (settingGaji.tunjangan_bonus) {
      const getDetailBonus = await getSlipGajiDetailBonusByPegawaiBulanTahun(
        slipGaji.pegawai_id,
        slipGaji.bulan,
        slipGaji.tahun
      );
      if (getDetailBonus.length > 0) {
        for await (const bonus of getDetailBonus) {
          await deleteSlipGajiDetailBonus(bonus.id_slip_gaji_detail_bonus);
        }
      }
      const bonus = await GetAllTunjanganBonusByBulanTahunPegawai(pge.id_pegawai, slipGaji.bulan, slipGaji.tahun);
      if (bonus.length > 0) {
        for await (const bns of bonus) {
          totalTunjanganBonus += bns.nominal;
          const createDetailBonus = await createSlipGajiDetailBonus({
            slip_gaji_id: slipGaji.id_slip_gaji,
            bonus_id: bns.id_tunjangan_bonus,
            total_bonus: bns.nominal,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun
          });
        }
      }
    }

    // Lembur
    let totalUpahLembur = 0;
    if (settingGaji.tunjangan_lembur) {
      const getDetailLembur = await getSlipGajiDetailLemburByPegawaiBulanTahun(
        pge.id_pegawai,
        slipGaji.bulan,
        slipGaji.tahun
      );

      if (getDetailLembur.length > 0) {
        for await (const lmb of getDetailLembur) {
          await deleteSlipGajiDetailLembur(lmb.id_slip_gaji_detail_lembur);
        }
      }
      const lembur = await GetALemburByPegawaiAndBulanTahunStatus(
        pge.id_pegawai,
        StatusTerima.diterima,
        slipGaji.bulan,
        slipGaji.tahun
      );

      for await (const lmb of lembur) {
        totalUpahLembur += lmb.total_upah;
        const createDetailLembur = await createSlipGajiDetailLembur({
          slip_gaji_id: slipGaji.id_slip_gaji,
          absen_id: lmb.absensi_id,
          lembur_id: lmb.id_lembur,
          total_upah: lmb.total_upah,
          tanggal: slipGaji.tanggal,
          bulan: slipGaji.bulan,
          tahun: slipGaji.tahun
        });
      }
    }

    // pinjaman
    let totalPinjaman = 0;
    if (settingGaji.pinjaman) {
      const getDetailPinjaman = await getSlipGajiDetailPinjamanByPegawaiBulanTahun(
        pge.id_pegawai,
        slipGaji.bulan,
        slipGaji.tahun
      );

      if (getDetailPinjaman.length > 0) {
        for await (const pjm of getDetailPinjaman) {
          await deleteSlipGajiDetailPinjaman(pjm.id_slip_gaji_detail_pinjaman);
        }
      }
      const pinjaman = await GetPinjamanPegawaibyTahunBulan(pge.id_pegawai, bulan, tahun);
      if (pinjaman.length > 0) {
        for await (const pjm of pinjaman) {
          totalPinjaman += pjm.nominal;
          const createDetailPinjaman = await createSlipGajiDetailPinjaman({
            slip_gaji_id: slipGaji.id_slip_gaji,
            pinjaman_id: pjm.id_pinjaman,
            total_pinjaman: pjm.nominal,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun
          });
        }
      }
    }

    // potong gaji
    let totalPotongGaji = 0;
    if (settingGaji.potong_gaji) {
      const getDetailPotongGaji = await getSlipGajiDetailPotongGajiByPegawaiBulanTahun(
        pge.id_pegawai,
        slipGaji.bulan,
        slipGaji.tahun
      );

      if (getDetailPotongGaji.length > 0) {
        for await (const pg of getDetailPotongGaji) {
          await deleteSlipGajiDetailPotongGaji(pg.id_slip_gaji_detail_potong_gaji);
        }
      }
      const potongGaji = await GetPotonGajiPegawaibyTahunBulan(pge.id_pegawai, bulan, tahun);

      if (potongGaji.length > 0) {
        // Loop untuk setiap potongan gaji
        for await (const pg of potongGaji) {
          totalPotongGaji += pg.nominal;
          const insertDetailPotongGaji = await createSlipGajiDetailPotongGaji({
            slip_gaji_id: slipGaji.id_slip_gaji,
            potong_gaji_id: pg.id_potong_gaji,
            total_potong_gaji: pg.nominal,
            tanggal: slipGaji.tanggal,
            bulan: slipGaji.bulan,
            tahun: slipGaji.tahun
          });
        }
      }
    }

    // total gaji
    const totalGajiKotor =
      gajiPokok +
      tunjanganTetap +
      totalKehadiran +
      totalJabatanFungsional +
      totalTunjanganBonus +
      totalUpahLembur -
      totalPinjaman -
      totalPotongGaji;

    // pajak
    // pajak.reduce((a, b) => a + b.persen, 0) || 0;
    let totalPajak = 0;
    if (pajak.length > 0) {
      const getDetailPajak = await getSlipGajiDetailPajakByPegawaiBulanTahun(
        pge.id_pegawai,
        slipGaji.bulan,
        slipGaji.tahun
      );

      if (getDetailPajak.length > 0) {
        for await (const pjk of getDetailPajak) {
          await deleteSlipGajiDetailPajak(pjk.id_slip_gaji_detail_pajak);
        }
      }
      for await (const pjk of pajak) {
        totalPajak += pjk.persen;
        const insertDetailPajak = await createSlipGajiDetailPajak({
          slip_gaji_id: slipGaji.id_slip_gaji,
          pajak_id: pjk.id_pajak,
          total_pajak_persen: pjk.persen,
          total_pajak_rupiah: (pjk.persen * totalGajiKotor) / 100,
          tanggal: slipGaji.tanggal,
          bulan: slipGaji.bulan,
          tahun: slipGaji.tahun
        });
      }
    }
    const pajakPengurang = totalGajiKotor * (totalPajak / 100);
    const totalGaji = totalGajiKotor - pajakPengurang;

    const updateGaji = await updateSlipGaji(slipGaji.id_slip_gaji, {
      gaji_pokok: gajiPokok,
      tunjangan_tetap: tunjanganTetap,
      tunjangan_kehadiran: totalKehadiran,
      tunjangan_fungsional: totalJabatanFungsional,
      tunjangan_bonus: totalTunjanganBonus,
      tunjangan_lembur: totalUpahLembur,
      pajak: pajakPengurang,
      pinjaman: totalPinjaman,
      potong_gaji: totalPotongGaji,
      total_gaji_kotor: totalGajiKotor,
      total_gaji_bersih: totalGaji,
      tanggal: slipGaji.tanggal,
      bulan: slipGaji.bulan,
      tahun: slipGaji.tahun
    });
    slipGajiPegawai.push(updateGaji);
  }
  return {
    status: true,
    statusCode: 200,
    message: "succes",
    data: slipGajiPegawai
  };
};

export const UpdateSlipGaji = async (id, data) => {
  const update = await updateSlipGaji(id, data);
  return update;
};

export const DeleteSlipGaji = async (id) => {
  const deleteSlipGaji = await deleteSlipGaji(id);
  return deleteSlipGaji;
};
