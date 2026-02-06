"use server";

import { google } from "googleapis";

export async function appendToSheet(values: string[]) {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!keyJson || !spreadsheetId) {
    console.warn(
      "Google Sheets env vars not set — skipping sheet append",
    );
    return;
  }

  const credentials = JSON.parse(keyJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}
