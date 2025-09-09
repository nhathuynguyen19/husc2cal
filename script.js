(async () => {
  const table = (new DOMParser().parseFromString((await (await fetch("/TimeTable/Week")).text()), "text/html")).querySelector("table.table");
  const data = Array.from({length: 7}, () => []);
  const dateList = Array.from(table.querySelectorAll("thead > tr > th")).map(th => th.innerText.split("\n").map(s => s.trim()).filter(Boolean)[1]);
  [...table.querySelectorAll("tbody > tr > td")].forEach((td, i) => {
    if (i % 8 === 0 || td.innerText.trim() === "") return;
    const dds = td.querySelectorAll("dd");
    const [start, end] = dds[0].innerText.split(": ")[1].trim().split(" - ").map(n => parseInt(n,10));
    const summary = td.querySelector("dt > a").innerText.trim();
    const description = dds[2].innerText.split(": ")[1].trim();
    const location = dds[1].innerText.split(": ")[1].trim();
    const dayIndex = i % 8 - 1;
    const item = {
      DTSTART: toICSDate(dateList[dayIndex], periodStarts[start]),
      DTEND:   toICSDate(dateList[dayIndex], periodEnds[end]),
      SUMMARY: summary,
      DESCRIPTION: description,
      LOCATION: location,
      UID: generateUID(summary, description),
      RRULE: `RRULE:FREQ=WEEKLY;BYDAY=${["MO","TU","WE","TH","FR","SA","SU"][dayIndex]}`
    };
    data[dayIndex].push(item);
  });

  data.forEach(day => { day.forEach(item => {
    ics += `
BEGIN:VEVENT
UID:${item.UID}
SUMMARY:${item.SUMMARY}
DTSTART:${item.DTSTART}
DTEND:${item.DTEND}
DESCRIPTION:${item.DESCRIPTION}
LOCATION:${item.LOCATION}
${item.RRULE}
END:VEVENT
`
    });
  });
  ics += `END:VCALENDAR`;
  console.log(ics);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([ics], {type: "text/calendar;charset=utf-8"}));
  link.download = "timetable.ics";
  link.click();
})();

function toICSDate(dateStr, timeStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  const pad = n => n.toString().padStart(2, '0');
  return `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`;
}

function generateUID(summary, description) {
  const str = `${summary}|${description}`;
  const utf8Str = new TextEncoder().encode(str);
  let binary = '';
  utf8Str.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary) + "@student.husc.vn";
}

const periodStarts = [
  , 
  "07:00","08:00","09:00","10:00",
  "13:00","14:00","15:00","16:00",
  "17:30","18:25","19:25","20:25"
];

const periodEnds = [
  ,
  "08:00","09:00","10:00","11:00",
  "14:00","15:00","16:00","17:00",
  "18:25","19:25","20:25","21:25"
];

let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//husc.vn//TimeTable to ICS//EN
CALSCALE:GREGORIAN
`;