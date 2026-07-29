/* ============================================================
   MathSphere AI - shared configuration
   ============================================================
   1. Follow SETUP.md to create your Google Sheet + Apps Script.
   2. Paste the Apps Script Web App URL below (for logging results).
   3. Paste the published CSV URL below (for the admin dashboard).
   4. Upload this file alongside the grade quizzes in your repo -
      you only ever need to edit it in ONE place.
   ============================================================ */

const MATHSPHERE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLd1BlHW5Mb-emQ9_tMsTcB-U2Gji1Iu30ZASuV7g_Duv7tDF2D1pFpSzmgx7YtxMK0w/exec";
const MATHSPHERE_DASHBOARD_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQH5a2TAZk-5N2Z-EK0ICk--y6lNA3wk-3GnvHTPND_IGmVwKABZmgtk07LH6K4RMsa-P7QTcHA_U3W/pub?gid=1616354092&single=true&output=csv";
const MATHSPHERE_ADMIN_PASSCODE = "N3+w0rk5@)@^";

function logResult(record){
    if(!MATHSPHERE_SCRIPT_URL || MATHSPHERE_SCRIPT_URL.indexOf("PASTE_YOUR") === 0){
        return; // not configured yet - results just won't be logged centrally
    }
    try{
        fetch(MATHSPHERE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type':'text/plain'},
            body: JSON.stringify(record)
        });
    }catch(e){
        /* fail silently - never break the quiz experience for the student */
    }
}
