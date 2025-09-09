(async () => {
  const response = await fetch("/TimeTable/Week")
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const table = doc.querySelector("table.table");
  // console.log(table.innerHTML);
  const data = []
  for (let i = 0; i < 7; i++) {
    data.push([]);
  }

  const dateList = [];
  for (const th of table.querySelectorAll("thead > tr > th")) {
    dateList.push(th.innerText.split("\n").map(s => s.trim()).filter(Boolean)[1]);
  }
  // console.log(dateList);
  
  let i = 0;
  for (const td of table.querySelectorAll("tbody > tr > td")) {
    if (i === 0 || i === 8 || i === 16 || td.innerText.trim() === "") {
      i++;
      continue;
    } else {
      const periodStarts = {
        "1": "07:00",
        "2": "08:00",
        "3": "09:00",
        "4": "10:00",
        "5": "13:00",
        "6": "14:00",
        "7": "15:00",
        "8": "16:00",
        "9": "17:30",
        "10": "18:25",
        "11": "19:25",
        "12": "20:25",
      };
      const periodEnds = {
        "1": "08:00",
        "2": "09:00",
        "3": "10:00",
        "4": "11:00",
        "5": "14:00",
        "6": "15:00",
        "7": "16:00",
        "8": "17:00",
        "9": "18:25",
        "10": "19:25",
        "11": "20:25",
        "12": "21:25",
      };
      const periodTimes = {
        "1": 60,
        "2": 120,
        "3": 180,
        "4": 240
      }
      const dds = td.querySelectorAll('dd');

      const period = dds[0].innerText.split(": ")[1].trim().split(" - ").map(s => parseInt(s.trim(), 10));
      
      const summary = td.querySelector('dt > a').innerText.trim();
      const description = dds[2].innerText.split(": ")[1].trim();
      const location = dds[1].innerText.split(": ")[1].trim();
      
      const item = {
        "DTSTART": toICSDate(dateList[i % 8 - 1], periodStarts[period[0].toString()]),
        "DTEND": toICSDate(dateList[i % 8 - 1], periodEnds[(period[1]).toString()]),
        "SUMMARY": summary,
        "DESCRIPTION": description,
        "LOCATION": location,
        "UID": generateUID(summary, description),
        "RRULE": `RRULE:FREQ=WEEKLY;BYDAY=${["MO","TU","WE","TH","FR","SA","SU"][i % 8 - 1]}`,
      }
      data.at(i % 8 - 1).push(item);
      i++;
    }
  }
  console.log(data);

  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//husc.vn//TimeTable to ICS//EN
CALSCALE:GREGORIAN
`;

  data.forEach(day => {
    day.forEach(item => {
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

  // console.log(ics);

  const blob = new Blob([ics], {type: "text/calendar;charset=utf-8"});

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
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