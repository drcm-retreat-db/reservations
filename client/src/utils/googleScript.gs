// function generateDoc(e) {
//   const utcDate = new Date(`${e.values[0]} UTC`);
//   const data = {};
//   data.timestamp = `${utcDate.getDate()}/${utcDate.getMonth()+1}/${utcDate.getFullYear()}-${utcDate.getHours()}:${utcDate.getMinutes() < 10 ? '0'+utcDate.getMinutes() : utcDate.getMinutes()} hrs`;
//   data.email = e.values[1];
//   data.name = e.values[2];
//   data.mobile = e.values[3];
//   data.address = e.values[4];
//   data.country = e.values[5];
//   data.profession = e.values[6];
//   data.count = e.values[7];
//   data.pList = e.values[8];
//   data.roomType = e.values[9];
//   data.cuisine = e.values[10];
//   data.eta = e.values[11];
//   // data.hasSponsor = e.values[12];
//   data.sponsorName = e.values[13] || "";
//   data.sponsorCard = e.values[14] || "";
//   data.sponsorRelation = e.values[15] || "";

//   const templateFile=DriveApp.getFileById("1VEz7JCWd73yySfAEu6updzuwt3JW0jVggTG-FowOQ4c")
//   const destinationFolder=DriveApp.getFolderById("1YGdkO067SFeCJGoVRW3J6wX7bCoHRwaP")
//   const copy = templateFile.makeCopy(`${data.name}-${data.timestamp}`,destinationFolder)
//   const doc = DocumentApp.openById(copy.getId())
//   const body = doc.getBody()

//   body.replaceText("<<Timestamp>>",data.timestamp)
//   body.replaceText("<<Name>>",data.name)
//   body.replaceText("<<Mobile>>",data.mobile)
//   body.replaceText("<<Email>>",data.email)
//   body.replaceText("<<Profession>>",data.profession)
//   body.replaceText("<<Address>>",data.address)
//   body.replaceText("<<Country>>",data.country)
//   body.replaceText("<<Participants_count>>",data.count)
//   body.replaceText("<<Participants_list>>",data.pList)
//   body.replaceText("<<Room_type>>",data.roomType)
//   body.replaceText("<<cuisine>>",data.cuisine)
//   body.replaceText("<<eta>>",data.eta)
//   body.replaceText("<<SponsorName>>",data.sponsorName)
//   body.replaceText("<<SponsorCard>>",data.sponsorCard)
//   body.replaceText("<<SponsorRelation>>",data.sponsorRelation)

//   doc.saveAndClose()
// }

function generateDocIYR(e) {
  const data = {};
  data.isIYR = true;
  data.timestamp = e.values[0];
  data.email = e.values[1];
  data.name = e.values[2];
  data.mobile = e.values[3];
  data.address = e.values[4];
  data.country = e.values[5];
  data.profession = e.values[6];
  data.count = e.values[7];

  if (parseInt(data.count) === 1) {
    const name = e?.values[8];
    const age = e?.values[9];
    const gender = e?.values[10];
    const mDate = e?.values[11] || "";
    data.participants = [
      {
        name: name,
        age: age,
        gender: gender,
        marriageDate: mDate,
      },
    ];
    data.pList = `${name}-${age}-${gender}-${mDate}`;
  } else if (parseInt(data.count) === 2) {
    const p1name = e?.values[12];
    const p1age = e?.values[13];
    const p1gender = e?.values[14];
    const p1mDate = e?.values[15] || "";
    const p2name = e?.values[16];
    const p2age = e?.values[17];
    const p2gender = e?.values[18];
    const p2mDate = e?.values[19] || "";
    data.participants = [
      {
        name: p1name,
        age: p1age,
        gender: p1gender,
        marriageDate: p1mDate,
      },
      {
        name: p2name,
        age: p2age,
        gender: p2gender,
        marriageDate: p2mDate,
      },
    ];
    data.pList = `${p1name}-${p1age}-${p1gender}-${p1mDate}\n${p2name}-${p2age}-${p2gender}-${p2mDate}`;
  } else if (parseInt(data.count) === 3) {
    const p1name = e?.values[20];
    const p1age = e?.values[21];
    const p1gender = e?.values[22];
    const p1mDate = e?.values[23] || "";
    const p2name = e?.values[24];
    const p2age = e?.values[25];
    const p2gender = e?.values[26];
    const p2mDate = e?.values[27] || "";
    const p3name = e?.values[28];
    const p3age = e?.values[29];
    const p3gender = e?.values[30];
    const p3mDate = e?.values[31] || "";
    data.participants = [
      {
        name: p1name,
        age: p1age,
        gender: p1gender,
        marriageDate: p1mDate,
      },
      {
        name: p2name,
        age: p2age,
        gender: p2gender,
        marriageDate: p2mDate,
      },
      {
        name: p3name,
        age: p3age,
        gender: p3gender,
        marriageDate: p3mDate,
      },
    ];
    data.pList = `${p1name}-${p1age}-${p1gender}-${p1mDate}\n${p2name}-${p2age}-${p2gender}-${p2mDate}\n${p3name}-${p3age}-${p3gender}-${p3mDate}`;
  } else if (parseInt(data.count) === 4) {
    const p1name = e?.values[32];
    const p1age = e?.values[33];
    const p1gender = e?.values[34];
    const p1mDate = e?.values[35] || "";
    const p2name = e?.values[36];
    const p2age = e?.values[37];
    const p2gender = e?.values[38];
    const p2mDate = e?.values[39] || "";
    const p3name = e?.values[40];
    const p3age = e?.values[41];
    const p3gender = e?.values[42];
    const p3mDate = e?.values[43] || "";
    const p4name = e?.values[44];
    const p4age = e?.values[45];
    const p4gender = e?.values[46];
    const p4mDate = e?.values[47] || "";
    data.participants = [
      {
        name: p1name,
        age: p1age,
        gender: p1gender,
        marriageDate: p1mDate,
      },
      {
        name: p2name,
        age: p2age,
        gender: p2gender,
        marriageDate: p2mDate,
      },
      {
        name: p3name,
        age: p3age,
        gender: p3gender,
        marriageDate: p3mDate,
      },
      {
        name: p4name,
        age: p4age,
        gender: p4gender,
        marriageDate: p4mDate,
      },
    ];
    data.pList = `${p1name}-${p1age}-${p1gender}-${p1mDate}\n${p2name}-${p2age}-${p2gender}-${p2mDate}\n${p3name}-${p3age}-${p3gender}-${p3mDate}\n${p4name}-${p4age}-${p4gender}-${p4mDate}`;
  } else {
    data.participants = [
      {
        name: `${e.values[48]}`,
        age: "",
        gender: "",
      },
    ];
    data.pList = e.values[48];
  }

  data.roomType = e.values[49];
  data.cuisine = e.values[50];
  data.eta = e.values[51];
  // data.hasSponsor = e.values[52];
  data.sponsorName = e.values[53] || "";
  data.sponsorCard = e.values[54] || "";
  data.sponsorRelation = e.values[55] || "";

  const templateFile = DriveApp.getFileById(
    "1QKRBEW43-djJZ3BYJdPcUlSH-UOFzjzrIasfHwCmKuc"
  );
  const destinationFolder = DriveApp.getFolderById(
    "1V9S7czqGL5DkcFKp5087bf-HcmEEB-1J"
  );
  const copy = templateFile.makeCopy(
    `${data.name}-${data.timestamp}`,
    destinationFolder
  );
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();

  body.replaceText("<<Timestamp>>", data.timestamp);
  body.replaceText("<<Name>>", data.name);
  body.replaceText("<<Mobile>>", data.mobile);
  body.replaceText("<<Email>>", data.email);
  body.replaceText("<<Profession>>", data.profession);
  body.replaceText("<<Address>>", data.address);
  body.replaceText("<<Country>>", data.country);
  body.replaceText("<<Participants_count>>", data.count);
  body.replaceText("<<Participants_list>>", data.pList);
  body.replaceText("<<Room_type>>", data.roomType);
  body.replaceText("<<cuisine>>", data.cuisine);
  body.replaceText("<<eta>>", data.eta);
  body.replaceText("<<SponsorName>>", data.sponsorName);
  body.replaceText("<<SponsorCard>>", data.sponsorCard);
  body.replaceText("<<SponsorRelation>>", data.sponsorRelation);
  //Todo
  const feeObj = {
    regFee: "",
    roomFee: "",
    mcFee: "",
  };
  const totalFee = feeObj.regFee + feeObj.roomFee + feeObj.mcFee;
  body.replaceText("<<Reg_fee>>", feeObj.regFee);
  body.replaceText("<<Room_fee>>", feeObj.roomFee);
  body.replaceText("<<MC_fee>>", feeObj.mcFee);
  body.replaceText("<<Total_fee>>", totalFee);

  doc.saveAndClose();

  //MongoDB Service
  var options = {
    method: "post",
    contentType: "application/json",
    // Convert the JavaScript object to a JSON string.
    payload: JSON.stringify({ data }),
  };
  var response = UrlFetchApp.fetch(
    "https://drc-reservations.onrender.com/app/newResponse",
    options
  );
  const resData = JSON.parse(response.getContentText());

  //Mail Service
  // Send an email with two attachments: a file from Google Drive (as a PDF) and an HTML file.
  var file = [DriveApp.getFileById(copy.getId())?.getAs(MimeType.PDF)];
  MailApp.sendEmail(
    `divineretreat.reg@gmail.com,${data.email}`,
    `POWER - International Youth Retreat 2024 - Registration`,
    `Please find attachment.\n\n${
      data.name
    } has submitted a new response on ${new Date(
      data.timestamp
    ).toDateString()}.\n\nData written in DB - ${resData?.isSuccess}
    
    `,
    {
      attachments: file,
    }
  );
}
