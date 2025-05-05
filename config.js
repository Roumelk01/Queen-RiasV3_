const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZrYXpuV0k2eGZTVUUrQjd1M2xZNFNETVVQUTZUbnJYMjgyOEp6RlFVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREVJejZ5ejBYUUtEaEVNVWVwdVJhd09XUkFDNlBIeVVwL3hvUlBGaTFBbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSldaY1dUNFo0TmRZS1lreXdsdTYwU0lkKzVIbCtYSERlYmZDUzdxd1hRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3UFY2Q1p3eWY2UEhIckVCSThBWUtOaWsyNk5hbllWcmFjY3d1NlhjMHhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBHVmVWcEh0QWRRL3YxQnR4d3c4R256eXF4RTZEeHBHU0xNajNGdlgwMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFjM2N3SmptOVB2Z1A0RzlnaHl1d1crcTQ1cmNzc0pxMFZVOENZWTJqVXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEVyMFQxQW0vNGFUSXdRcFArbnJNYmZHSUJFMUR0WE8yT3Q5eExWSFMyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEEzUWtGSS9Cc3pHdE41a20zYmZpdlpjRWFXTW1DQVdZaER6dm5IelNnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldVR3NBODZUeVZnM1c0YmVXYkVIMXJOVzEwMWxiNWg3aFJnZ1BXWXlkQU1BaTkxdDkzUDcrcXdtS2ZNMXJwTGU4WnR4elNWMk9mTHAzMzFXWHRzNkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiJhNDlFTkZEall1VHo4NUtwb2xFYVBiLzY0by80d1cvQjFndHBxTm5uNE5rPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJYMTdOQ0Q2MyIsIm1lIjp7ImlkIjoiMjI1NzM1NDg0OTY6MzNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjA4NDc3NzIwMjQ4NjI6MzNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQdlgwVVVRMUk3bHdBWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlMG5uczJocUNwRjlrcjh3TTdycmhKZ3B5V2FMb0dYMENCU3podUNYZzNFPSIsImFjY291bnRTaWduYXR1cmUiOiJoRXYzWUd4SlN0Z3VKeXNWbEk5TzF3TjhRR3hEQ3ZVa0MzZDB6cVZXc202WTBScE15eHFhY3RCblNhalBWSmY2bWtEa2lrTFdRWmQySGJPN09lRkVCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSWgvSEtaQnQ1ZmpINWpZM1BNZXI0WURqT0xqTDJnM1AxQnhOVFBWYXlCRExMTmJZdXRTNmNCQnF3d2V5MWU2cEZ3dWdJYW9MT1ZyTlRvYmhYU04xQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjU3MzU0ODQ5NjozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYdEo1N05vYWdxUmZaSy9NRE82NjRTWUtjbG1pNkJsOUFnVXM0YmdsNE54In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY0ODcxMzgsImxhc3RQcm9wSGFzaCI6IjJQMVloZiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
