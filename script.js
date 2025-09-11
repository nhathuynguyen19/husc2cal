const periodStarts = ["", "07:00","08:00","09:00","10:00","13:00","14:00","15:00","16:00","17:30","18:25","19:25","20:25"];
const periodEnds   = ["", "08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:25","19:25","20:25","21:25"];
const weekDays = ["MO","TU","WE","TH","FR","SA","SU"];
const pad = n => n.toString().padStart(2, '0');
const toICSDate = (dateStr, timeStr) => `${dateStr.split("/").map(Number)[2]}${pad(dateStr.split("/").map(Number)[1])}${pad(dateStr.split("/").map(Number)[0])}T${pad(timeStr.split(":").map(Number)[0])}${pad(timeStr.split(":").map(Number)[1])}00`;
const generateUID = (summary, description) => `${btoa(Array.from(new TextEncoder().encode(`${summary}|${description}`)).map(b => String.fromCharCode(b)).join(''))}@student.husc.vn`;
(async () => {
  const table = (new DOMParser().parseFromString(await (await fetch("/TimeTable/Week")).text(), "text/html")).querySelector("table.table");
  const dateList = Array.from(table.querySelectorAll("thead > tr > th")).map(th => th.innerText.split("\n").map(s => s.trim()).filter(Boolean)[1]);
  let ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//husc.vn//TimeTable to ICS//EN\nCALSCALE:GREGORIAN\n`;
  Array.from(table.querySelectorAll("tbody > tr > td")).forEach((td, i) => {
    if (i % 8 === 0 || !td.innerText.trim()) return;
    const dayIndex = i % 8 - 1;
    const [start, end] = td.querySelector("dd").innerText.split(": ")[1].trim().split(" - ").map(Number);
    const summary = td.querySelector("dt > a").innerText.trim();
    const dds = td.querySelectorAll("dd");
    const description = dds[2].innerText.split(": ")[1].trim();
    const location = dds[1].innerText.split(": ")[1].trim();
    ics += `\nBEGIN:VEVENT\nUID:${generateUID(summary, description)}\nSUMMARY:${summary}\nDTSTART:${toICSDate(dateList[dayIndex], periodStarts[start])}\nDTEND:${toICSDate(dateList[dayIndex], periodEnds[end])}\nDESCRIPTION:${description}\nLOCATION:${location}\nRRULE:FREQ=WEEKLY;BYDAY=${weekDays[dayIndex]}\n\nBEGIN:VALARM\nTRIGGER;RELATED=START:-PT5M\nACTION:DISPLAY\nDESCRIPTION:${description}\nEND:VALARM\n\nBEGIN:VALARM\nTRIGGER;RELATED=START:-PT30M\nACTION:DISPLAY\nDESCRIPTION:${description}\nEND:VALARM\nEND:VEVENT\n`;
  });
  const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" })); link.download = "timetable.ics"; link.click();
  console.log(ics += `END:VCALENDAR`);
})();