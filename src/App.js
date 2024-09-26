import React from "react";

import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PatientRegister from "./pages/PatientRegister";
import SuperadminLogin from "./pages/SuperadminLogin";
import SuperAdminRegister from "./pages/SuperAdminRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import StaffRegister from "./pages/StaffRegister";
import StaffLogin from "./pages/StaffLogin";
import Home from "./pages/Home";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Provider from "./util/Provider";
import AuthRoute from "./util/AuthRoute";
import LabInvoice from "./pages/LabInvoice";
import LabInvoices from "./pages/LabInvoices";
import ViewInvoice from "./pages/ViewInvoice";
import UploadCBP from "./pages/UploadCBP";
import UploadLFR from "./pages/UploadLFR";
import UploadUrineRoutine from "./pages/UploadUrineRoutine";
import Ehrs from "./pages/Ehrs";
import SingleEHR from "./pages/SingleEHR";
import PatientLogin from "./pages/PatientLogin";
import PatientActivation from "./pages/PatientActivation";
import KycVerification from "./pages/KycVerification";
import PatientOTP from "./pages/PatientOTP";
import EhrRetrive from "./pages/EhrRetrive";

// import { init } from "./Web3Client";
import CreateHospital from "./pages/CreateHospital";
import PatientRequests from "./pages/PatientRequests";
import PatientRequest from "./pages/PatientRequest";
import CbpReport from "./pages/CbpReport";
import VerifyReport from "./pages/VerifyReport";
import Welcome from "./pages/Welcome";
import PasswordCreate from "./pages/PasswordCreate";
import LabReports from "./pages/LabReports";
import NewEHR from "./pages/NewEHR";
import PastEHR from "./pages/PastEHR";
import EhrList from "./pages/EhrList";

//  YXbHebHIai5pMSW
// depend speak shed example again coffee used riot connect put dilemma pig

const theme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: "AirbnbCerealMedium",
    },
    h2: {
      fontFamily: "AirbnbCerealMedium",
    },
    h3: {
      fontFamily: "AirbnbCerealMedium",
    },
    h4: {
      fontFamily: "AirbnbCerealMedium",
    },
    h5: {
      fontFamily: "AirbnbCerealMedium",
    },
    h6: {
      fontFamily: "AirbnbCerealBook",
    },
    body1: {
      fontFamily: "AirbnbCerealBook",
    },
    body2: {
      fontFamily: "AirbnbCerealBook",
    },
    p: {
      fontFamily: "AirbnbCerealBook",
    },
    overline: {
      fontFamily: "AirbnbCerealMedium",
    },
    button: { fontFamily: "AirbnbCerealBook" },
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#0f172a",
    },
    secondary: {
      main: "#D339A0",
    },
    error: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Provider>
            <BrowserRouter>
              <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                {/* <Route path="/login" component={Login} /> */}
                <AuthRoute
                  path="/superadmin-register"
                  component={SuperAdminRegister}
                  roles={["Neuromed"]}
                />
                <Route path="/superadmin-login" component={SuperadminLogin} />
                <AuthRoute
                  path="/admin-register"
                  component={AdminRegister}
                  roles={["Neuromed"]}
                />
                <Route path="/admin-login" component={AdminLogin} />
                <AuthRoute
                  path="/staff-register"
                  component={StaffRegister}
                  roles={["Hospital Admin"]}
                />
                <Route path="/staff-login" component={StaffLogin} />
                <AuthRoute
                  path="/patient-register"
                  component={PatientRegister}
                  roles={["Hospital Staff", "Lab Assistant"]}
                />

                {/* medical rep */}

                <AuthRoute
                  path="/patient-requests"
                  component={PatientRequests}
                  roles={["Medical Rep"]}
                />
                <AuthRoute
                  path="/patient-request/:id"
                  component={PatientRequest}
                  roles={["Medical Rep"]}
                />

                {/* doctor */}
                <AuthRoute
                  path="/past-ehr"
                  component={PastEHR}
                  roles={["Medical Rep"]}
                />
                <AuthRoute
                  path="/new-ehr"
                  component={NewEHR}
                  roles={["Doctor"]}
                />
                <AuthRoute
                  path="/ehr-retrieve"
                  component={EhrRetrive}
                  roles={["Doctor"]}
                />

                <AuthRoute path="/ehrs" component={Ehrs} roles={["Doctor"]} />
                <AuthRoute
                  path="/ehr/:id"
                  component={SingleEHR}
                  roles={["Doctor"]}
                />

                {/* lab assistant */}
                <AuthRoute
                  path="/lab-invoice"
                  component={LabInvoice}
                  roles={["Lab Assistant"]}
                />
                <AuthRoute
                  path="/lab-invoices"
                  component={LabInvoices}
                  roles={["Lab Assistant"]}
                />
                <AuthRoute
                  path="/view-invoice/:id"
                  component={ViewInvoice}
                  roles={["Lab Assistant"]}
                />
                <AuthRoute
                  path="/upload-cbp"
                  component={UploadCBP}
                  roles={["Lab Assistant"]}
                />
                <AuthRoute
                  path="/upload-urine-routine"
                  component={UploadUrineRoutine}
                  roles={["Lab Assistant"]}
                />
                <AuthRoute
                  path="/upload-lfr"
                  component={UploadLFR}
                  roles={["Lab Assistant"]}
                />

                <Route path="/patient-login" component={PatientLogin} />
                <Route path="/patient-otp" component={PatientOTP} />
                <Route
                  path="/patient-activation"
                  component={PatientActivation}
                />
                <Route
                  path="/kyc-verification/:id"
                  component={KycVerification}
                />
                <AuthRoute
                  path="/create-hospital"
                  component={CreateHospital}
                  roles={["Neuromed"]}
                />

                <AuthRoute
                  exact
                  path="/"
                  component={Home}
                  roles={[
                    "Lab Assistant",
                    "Medical Rep",
                    "Hospital Staff",
                    "Hospital Admin",
                    "Neuromed",
                    "Doctor",
                    "Patient",
                  ]}
                />

                <AuthRoute
                  path="/lab-reports"
                  component={LabReports}
                  roles={["Patient"]}
                />
                <AuthRoute
                  path="/ehr-list"
                  component={EhrList}
                  roles={["Patient"]}
                />

                <Route path="/password-create/:id" component={PasswordCreate} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/cbp-report" component={CbpReport} />
                <Route path="/verify/:id" component={VerifyReport} />
              </Switch>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
