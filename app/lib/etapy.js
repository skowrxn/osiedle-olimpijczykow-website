// Arkusze Google z cennikami - jeden na etap.
//
// Identyfikator arkusza nie jest sekretem (dostęp daje udostępnienie arkusza
// koncie serwisowemu), więc etapy mogą mieć wartość domyślną w kodzie.
// Zmienna środowiskowa, jeśli ustawiona, ma pierwszeństwo.
export const ETAP_SHEETS = {
  etap2: {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID_ETAP2,
    gid: 1101068206,
  },
  etap3: {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID_ETAP3,
    gid: 905977375,
  },
  etap4: {
    spreadsheetId:
      process.env.GOOGLE_SPREADSHEET_ID_ETAP4 ||
      "18fXFXJzFSvITVmtnxzFXWujLXoNLQiRKs_B7_HjXDvQ",
    gid: null, // pierwsza zakładka arkusza
  },
};

// Kolejność etapów w panelu i na listach - od najnowszego.
export const ETAPY = ["etap4", "etap3", "etap2"];

export const etapLabel = (etap) => `Etap ${etap.replace("etap", "")}`;
