// import Web3 from "web3";
// import NeuromedAccessBuild from "contracts/NeuromedAccess.json";
// import NeuromedTasksBuild from "contracts/NeuromedTasks.json";
// import HospitalBuild from "contracts/Hospital.json";

// import { sha256 } from "js-sha256";

// const NO_HS =
//   "0x39349db958ca58bbd5da126bd654d05d8d0c93f86805918f236dc076194e1955";

// let userCreateContract;
// let hospitalContract;
// let neuromedTasksContract;
// let initialied = false;
// let account;

// export const init = async () => {
//   let provider = window.ethereum;

//   if (typeof provider != "undefined") {
//     provider
//       .request({ method: "eth_requestAccounts" })
//       .then((accounts) => {
//         console.log(accounts);
//         account = accounts[0];
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     window.ethereum.on("accountsChanged", function (accounts) {
//       console.log(accounts);
//       account = accounts[0];
//     });
//   }

//   const web3 = new Web3(provider);
//   const networkId = await web3.eth.net.getId();

//   userCreateContract = new web3.eth.Contract(
//     NeuromedAccessBuild.abi,
//     NeuromedAccessBuild.networks[networkId].address
//   );
//   console.log(HospitalBuild);

//   hospitalContract = new web3.eth.Contract(
//     HospitalBuild.abi,
//     HospitalBuild.networks[networkId].address
//   );

//   neuromedTasksContract = new web3.eth.Contract(
//     NeuromedTasksBuild.abi,
//     NeuromedTasksBuild.networks[networkId].address
//   );
// };

// export const adduser = async (medicareId, userRole, walletID, hospitalName) => {
//   if (!initialied) {
//     await init();
//   }
//   console.log(medicareId, userRole, walletID, hospitalName);
//   let mid = "0x".concat(sha256(medicareId));
//   // let wid = "0x".concat(walletID);
//   console.log(mid, userRole, walletID, hospitalName);

//   // console.log(Web3.utils.asciiToHex("MR"));

//   return userCreateContract.methods
//     .addUser(mid, userRole, account, hospitalName)
//     .send({ from: account });
// };

// export const addAdmin = async (medicareId, userRole, hospitalName) => {
//   if (!initialied) {
//     await init();
//   }
//   console.log(medicareId, userRole, hospitalName);
//   let mid = "0x".concat(sha256(medicareId));

//   console.log(Web3.utils.asciiToHex(hospitalName));

//   return userCreateContract.methods
//     .addUser(mid, userRole, account, Web3.utils.asciiToHex(hospitalName))
//     .send({ from: account });
// };

// export const addHospital = async (hid) => {
//   if (!initialied) {
//     await init();
//   }

//   // console.log(hid);
//   let hospitalId = "0x".concat(sha256(hid));
//   // console.log(hospitalId);

//   return hospitalContract.methods
//     .addHospital(hospitalId)
//     .send({ from: account });
// };

// export const addPii = async (pid, pnic, filepath) => {
//   if (!initialied) {
//     await init();
//   }

//   let paid = "0x".concat(sha256(pid));

//   return neuromedTasksContract.methods
//     .registerPatient(paid, pnic, filepath)
//     .send({ from: account });
// };

// export const addLabReport = async (ref, path, pid) => {
//   if (!initialied) {
//     await init();
//   }

//   let reff = "0x".concat(sha256(ref));
//   let pidd = "0x".concat(sha256(pid));

//   return neuromedTasksContract.methods
//     .addLabReport(reff, path, pidd)
//     .send({ from: account });
// };
