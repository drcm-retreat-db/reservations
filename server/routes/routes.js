const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const adminData = require("../models/adminModel.js");
const roomData = require("../models/room.js");
const NYRformData = require("../models/booking/NYRformModel.js");
const IYRformData = require("../models/booking/IYRformModel.js");

// router.post("/signUpData", async (request, response) => {
//   const saltPassword = await bcrypt.genSalt(10);
//   const securePassword = await bcrypt.hash(request.body.password, saltPassword);

//   const signedUpUser = new userData({
//     fullName: request.body.fullName,
//     mobile: request.body.mobile,
//     password: securePassword,
//     gender: request.body.gender,
//     dob: request.body.dob,
//     email: request.body.email,
//   });
//   const doesExist = await userData.exists({ mobile: signedUpUser.mobile });
//   if (!doesExist) {
//     signedUpUser
//       .save()
//       .then(
//         response.send({
//           message: `account_created`,
//           fullName: request.body.fullName,
//           isSuccess: true,
//         })
//       )
//       .catch((error) => console.log(error));
//   } else {
//     response.send({
//       message: `mobile_already_used`,
//       isSuccess: false,
//       fullName: request.body.fullName,
//     });
//   }
// });

// router.post("/resetpasscode", async (request, response) => {
//   const doesExist = await userData.findOne({
//     mobile: request.body.loginId,
//   });
//   if (doesExist) {
//     const passwordCheck = await bcrypt.compareSync(
//       request.body.password,
//       doesExist.password
//     );
//     if (!passwordCheck) {
//       const saltPassword = await bcrypt.genSalt(10);
//       const securePassword = await bcrypt.hash(
//         request.body.password,
//         saltPassword
//       );

//       await userData.findOneAndUpdate(
//         { mobile: request.body.loginId },
//         { $set: { password: securePassword } },
//         (err, doc) => {
//           if (err) {
//             response.send({
//               message: `unknown_error`,
//             });
//           }
//           if (![null, undefined].includes(doc)) {
//             response.send({
//               message: `password_changed`,
//             });
//           } else {
//             response.send({
//               message: `user_not_found`,
//             });
//           }
//         }
//       );
//     } else {
//       response.send({
//         message: `same_password`,
//       });
//     }
//   } else {
//     response.send({
//       message: `user_not_found`,
//     });
//   }
// });

// router.post("/createapp", async (request, response) => {
//   const type = request.body.applicationType === "provider" ? "PRO" : "SEE";

//   if (type === "SEE") {
//     const reqs = await seekerData.find({});
//     const reqId = reqs && `REQ${type}${reqs.length + 1}`;
//     const FiledApplication = new seekerData({
//       applicationType: request.body.applicationType,
//       applicantName: request.body.applicantName,
//       applicantMobile: request.body.applicantMobile,
//       age: request.body.age,
//       address: request.body.address,
//       qualification: request.body.qualification,
//       preferenceOne: request.body.preferenceOne,
//       preferenceTwo: request.body.preferenceTwo,
//       bookedBy: request.body.bookedBy,
//       requestId: reqId,
//     });
//     FiledApplication.save()
//       .then(() => {
//         response.send({
//           message: `form_submitted`,
//           reqId: reqId,
//           isSuccess: true,
//         });
//       })
//       .catch((error) => {
//         response.send({
//           message: error?._message || "form_not_submitted",
//           isSuccess: false,
//         });
//         console.log(error?._message || error);
//       });
//   }
//   if (type === "PRO") {
//     const reqs = await providerData.find({});
//     const reqId = reqs && `REQ${type}${reqs.length + 1}`;
//     const FiledApplication = new providerData({
//       applicationType: request.body.applicationType,
//       applicantName: request.body.applicantName,
//       applicantMobile: request.body.applicantMobile,
//       companyDetails: request.body.companyDetails,
//       vacancyCount: request.body.vacancyCount,
//       workDetails: request.body.workDetails,
//       qualifications: request.body.qualifications,
//       bookedBy: request.body.bookedBy,
//       requestId: reqId,
//     });
//     FiledApplication.save()
//       .then(() => {
//         response.send({
//           message: `form_submitted`,
//           reqId: reqId,
//           isSuccess: true,
//         });
//       })
//       .catch((error) => {
//         response.send({
//           message: error?._message || "form_not_submitted",
//           isSuccess: false,
//         });
//         console.log(error?._message || error);
//       });
//   }
// });

// router.post("/getmyrequests", async (request, response) => {
//   const doesExist = await userData.findOne({
//     mobile: request.body.loginId,
//   });
//   if (doesExist) {
//     const seekerReqs = await seekerData.find({
//       bookedBy: request.body.loginId,
//     });
//     const providerReqs = await providerData.find({
//       bookedBy: request.body.loginId,
//     });
//     response.send({ seekerReqs, providerReqs });
//   }
// });
// router.post("/getallrequests", async (request, response) => {
//   const doesExist = await adminData.findOne({
//     adminId: request.body.loginId,
//   });
//   if (doesExist) {
//     const seekerReqs = await seekerData.find({});
//     const providerReqs = await providerData.find({});
//     response.send({ seekerReqs, providerReqs });
//   } else response.send({ message: "no_admin_rights" });
// });

router.post("/newResponse", async (request, response) => {
  if (request.body.data.isNYR) {
    const FilledNYRApplication = new NYRformData({
      name: request.body.data.name,
      mobile: request.body.data.mobile,
      email: request.body.data.email,
      profession: request.body.data.profession,
      address: request.body.data.address,
      country: request.body.data.country,
      count: request.body.data.count,
      participants: request.body.data.participants,
      roomType: request.body.data.roomType,
      cuisine: request.body.data.cuisine,
      eta: request.body.data.eta,
      sponsorName: request.body.data.sponsorName,
      sponsorCard: request.body.data.sponsorCard,
      sponsorRelation: request.body.data.sponsorRelation,
    });
    // const isAdmin = await adminData.findOne({ adminId: request.body.loginId });
    FilledNYRApplication.save()
      .then(
        response.send({
          message: `data_created`,
          // fullName: request.body.adminName,
          isSuccess: true,
          isNYR: true
        })
      )
      .catch((error) => {
        response.send({
          message: `data_not_created`,
          isSuccess: false,
          isNYR: true
          // fullName: request.body.adminName,
        });
        console.log(error);
      });
  } else if (request.body.data.isIYR) {
    const FilledIYRApplication = new IYRformData({
      name: request.body.data.name,
      mobile: request.body.data.mobile,
      email: request.body.data.email,
      profession: request.body.data.profession,
      address: request.body.data.address,
      country: request.body.data.country,
      count: request.body.data.count,
      participants: request.body.data.participants,
      roomType: request.body.data.roomType,
      cuisine: request.body.data.cuisine,
      eta: request.body.data.eta,
      sponsorName: request.body.data.sponsorName,
      sponsorCard: request.body.data.sponsorCard,
      sponsorRelation: request.body.data.sponsorRelation,
    });
    // const isAdmin = await adminData.findOne({ adminId: request.body.loginId });
    FilledIYRApplication.save()
      .then(
        response.send({
          message: `data_created`,
          // fullName: request.body.adminName,
          isSuccess: true,
          isIYR: true
        })
      )
      .catch((error) => {
        response.send({
          message: `data_not_created`,
          isSuccess: false,
          isIYR: true
          // fullName: request.body.adminName,
        });
        console.log(error);
      });
  }
});
router.post("/createadmin", async (request, response) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.adminPwd, saltPassword);

  const signedUpAdmin = new adminData({
    adminName: request.body.adminName,
    adminId: request.body.adminId,
    adminPwd: securePassword,
  });
  const doesExist = await adminData.exists({ adminId: signedUpAdmin.adminId });
  if (!doesExist) {
    signedUpAdmin
      .save()
      .then(
        response.send({
          message: `account_created`,
          fullName: request.body.adminName,
          isSuccess: true,
        })
      )
      .catch((error) => console.log(error));
  } else {
    response.send({
      message: `mobile_already_used`,
      isSuccess: false,
      fullName: request.body.adminName,
    });
  }
});
router.post("/loginData", async (request, response) => {
  const adminUser = await adminData.findOne({
    adminId: request.body.loginId,
  });
  if (adminUser) {
    const passwordCheck = await bcrypt.compareSync(
      request.body.loginPassword,
      adminUser.adminPwd
    );
    if (passwordCheck) {
      response.send({
        message: `admin_login_success`,
        adminName: adminUser.adminName,
        adminId: adminUser.adminId,
      });
    } else {
      response.send({
        message: `admin_incorrect_password`,
        adminName: adminUser.adminName,
      });
    }
  } else {
    // const doesExist = await userData.findOne({
    //   mobile: request.body.loginId,
    // });
    // if (doesExist) {
    //   // const password = request.body.loginPassword;
    //   const passwordCheck = await bcrypt.compareSync(
    //     request.body.loginPassword,
    //     doesExist.password
    //   );
    //   if (passwordCheck) {
    //     response.send({
    //       message: `login_success`,
    //       fullName: doesExist.fullName,
    //       mobile: doesExist.mobile,
    //     });
    //   } else {
    //     response.send({
    //       message: `incorrect_password`,
    //       fullName: doesExist.fullName,
    //     });
    //   }
    // } else {
    response.send({ message: `incorrect_mobile_no` });
    // }
  }
});

router.post("/createroom", async (request, response) => {
  const isAdmin = await adminData.findOne({ adminId: request.body.loginId });
  if (isAdmin) {
    const creatableRoom = new roomData({
      roomNo: request.body.roomNo,
      floor: request.body.floor,
      building: request.body.building,
      roomType: request.body.roomType,
      totalOccupancy: request.body.totalOccupancy,
      availableOccupancy: request.body.availableOccupancy,
      readyToUse: request.body.readyToUse,
      alloted: request.body.alloted,
      checkedIn: request.body.checkedIn,
      users: request.body.users,
      attributes: request.body.attributes,
      comments: request.body.comments,
    });
    const doesExist = await adminData.exists({
      roomNo: creatableRoom.roomNo,
      building: creatableRoom.building,
    });
    if (!doesExist) {
      creatableRoom
        .save()
        .then(
          response.send({
            message: `room_created`,
            isSuccess: true,
          })
        )
        .catch((error) => console.log(error));
    } else {
      response.send({
        message: `room_already_exists`,
        isSuccess: false,
      });
    }
  } else response.send({ message: "no_admin_rights" });
});
router.post("/updateroom", async (request, response) => {
  const isAdmin = await adminData.findOne({ adminId: request.body.loginId });
  if (isAdmin) {
    const updatableRoom = new roomData({
      roomNo: request.body.roomNo,
      floor: request.body.floor,
      building: request.body.building,
      roomType: request.body.roomType,
      totalOccupancy: request.body.totalOccupancy,
      availableOccupancy: request.body.availableOccupancy,
      readyToUse: request.body.readyToUse,
      alloted: request.body.alloted,
      checkedIn: request.body.checkedIn,
      users: request.body.users,
      attributes: request.body.attributes,
      comments: request.body.comments,
    });
    const { updateInfo = {} } = request.body;
    const updatedRoom = await roomData.findOneAndUpdate(
      { roomNo: updatableRoom.roomNo, building: updatableRoom.building },
      { ...updateInfo },
      { new: true }
    );
    if (updatedRoom) {
      response.send({
        message: `room_updated`,
        isSuccess: true,
      });
    } else {
      response.send({
        message: `unexpected_error_couldnt_update_room`,
        isSuccess: false,
      });
    }
  } else response.send({ message: "no_admin_rights" });
});
router.post("/getallrooms", async (request, response) => {
  const isAdmin = await adminData.findOne({ adminId: request.body.loginId });
  if (isAdmin) {
    const creatableRoom = new roomData({
      roomNo: request.body.roomNo,
      floor: request.body.floor,
      building: request.body.building,
      roomType: request.body.roomType,
      totalOccupancy: request.body.totalOccupancy,
      // availableOccupancy: request.body.availableOccupancy,
      readyToUse: request.body.readyToUse,
      alloted: request.body.alloted,
      checkedIn: request.body.checkedIn,
      users: request.body.users,
      attributes: request.body.attributes,
      comments: request.body.comments,
    });
    const doesExist = await adminData.exists({
      roomNo: creatableRoom.roomNo,
      building: creatableRoom.building,
    });
    if (!doesExist) {
      creatableRoom
        .save()
        .then(
          response.send({
            message: `room_created`,
            isSuccess: true,
          })
        )
        .catch((error) => console.log(error));
    } else {
      response.send({
        message: `room_already_exists`,
        isSuccess: false,
      });
    }
  } else response.send({ message: "no_admin_rights" });
});

module.exports = router;
