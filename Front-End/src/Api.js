import axios from "axios";
import { GetCookie, jwtTokenCookie, userCookie } from "./Cookies";

const backendHost = "http://localhost:3001";
const logInPath = backendHost + "/api/auth/login";
const registerPath = backendHost + "/api/auth/register";
const resetPasswordPath = backendHost + "/api/auth/passwordreset";

const createTripPath = backendHost + "/api/trips/createTrip";
const getTripByIdPath = backendHost + "/api/trips/getTripById/";
const getAllTripByUser = backendHost + "/api/trips/getAllTripsForCurrentUser";
const getTripsByCollaborator =
  backendHost + "/api/trips/getTripsByCollaborator";
const updateTripPath = backendHost + "/api/trips/updateTrip/";
const addCollaboratorPath = backendHost + "/api/trips/addUserAsCollaborator/";
const downloadTripDataAsPDFPath =
  backendHost + "/api/trips/downloadTripDataAsPDF/";

const getAllDestinations = backendHost + "/api/destinations/getAllDestinations";

async function logIn(username, password) {
  if (username == "" || password == "") {
    return [false, "Username, Password cannot be empty"];
  }
  try {
    let response = await axios.post(
      logInPath,
      { email: username, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000,
      }
    );
    if (response.data.sucess) {
      return [true, response.data.userd];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function register(firstName, lastName, dob, email, password) {
  if (email == "" || password == "") {
    return [false, "Email/Password cannot be empty"];
  }
  if (firstName == "" || lastName == "") {
    return [false, "FirstName/LastName cannot be empty"];
  }
  if (dob == "") {
    return [false, "Invalid DOB"];
  }
  try {
    let response = await axios.post(
      registerPath,
      {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        dob: dob,
      },
      { headers: { "Content-Type": "application/json" }, timeout: 1000 }
    );
    if (response.data.sucess) {
      return [true, response.data.userd];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function createTrip(budget, startDate, user) {
  try {
    let response = await axios.post(
      createTripPath,
      {
        budget: parseInt(budget),
        tripDate: startDate,
        tripCreator: GetCookie(userCookie),
        placesToVisit: [],
        collaborators: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + GetCookie(jwtTokenCookie),
        },
        timeout: 1000,
      }
    );
    if (response.status == 201) {
      return [true, response.data._id];
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function getTripById(id) {
  try {
    let response = await axios.get(getTripByIdPath + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
      },
      timeout: 1000,
    });
    if (response.status == 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function getTripByUser() {
  try {
    let response = await axios.get(getAllTripByUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
      },
      timeout: 1000,
    });
    if (response.status == 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function getTripByCollaborator() {
  try {
    let response = await axios.get(getTripsByCollaborator, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
      },
      timeout: 1000,
    });
    if (response.status == 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function getDestinations() {
  try {
    let response = await axios.get(getAllDestinations, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
      },
      timeout: 1000,
    });
    if (response.status == 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function updateTrip(trip) {
  console.log("Updayte trip ", trip);
  try {
    let response = await axios.put(updateTripPath + trip._id, trip, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
      },
      timeout: 1000,
    });
    console.log(response);
    if (response.status == 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function addCollaboratorApi(trip, email) {
  console.log("Add collaborator ", trip, email);
  try {
    let response = await axios.post(
      addCollaboratorPath + trip._id + "?email=" + email,
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + GetCookie(jwtTokenCookie),
        },
        timeout: 1000,
      }
    );
    console.log(response);
    if (response.status == 200) {
      return [true, response.data];
    }
    return [false, response.data.error];
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function DownloadPDF(trip) {
  try {
    let response = await axios.get(downloadTripDataAsPDFPath + trip._id, {
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + GetCookie(jwtTokenCookie),
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
      timeout: 1000,
      responseType: "blob",
    });

    // console.log(response);
    return [true, response.data];
  } catch (err) {
    console.log(err);
    return [false, err.response?.data?.error || err.message];
  }
}

async function getDocumentNamesForUser() {
  try {

    const apiUrl = 'http://127.0.0.1:3001/api/documents/getDocsNamesForUser';

  
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + GetCookie(jwtTokenCookie), 
      },
      timeout: 1000, 
    });


    if (response.status === 200) {
  
      return [true, response.data.documentNames];
    }
  } catch (err) {

    console.error(err);

    return [false, err.response?.data?.error || err.message];
  }
}


async function downloadDocument(fileName) {
  const apiUrl = `http://127.0.0.1:3001/api/documents/fetchDocument/${fileName}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: 'Bearer ' + GetCookie(jwtTokenCookie),
      },
      responseType: 'blob',
      timeout: 1000,
    });
    if (response.status === 200) {
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
     //
    }
  } catch (err) {
    console.error(err);
    return [false, err.response?.data?.error || err.message];
  }
}



async function uploadDocument(file, additionalData = {}) {
  const apiUrl = 'http://127.0.0.1:3001/api/documents/uploadDocument';
  const formData = new FormData();
  
  // Append the file to the form data
  formData.append('file', file);
  
  // Append additional data to the form data (if any)
  for (const key in additionalData) {
    if (additionalData.hasOwnProperty(key)) {
      formData.append(key, additionalData[key]);
    }
  }

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization: 'Bearer ' + GetCookie(jwtTokenCookie),
        'Content-Type': 'multipart/form-data',
      },
      timeout: 1000,
    });
    
    if (response.status === 200) {
      return [true, response.data];
    }
  } catch (err) {
    console.error(err);
    return [false, err.response?.data?.error || err.message];
  }
}



export {
  logIn,
  register,
  createTrip,
  getTripById,
  getTripByUser,
  getDestinations,
  updateTrip,
  DownloadPDF,
  addCollaboratorApi,
  getTripByCollaborator,
  getDocumentNamesForUser,
  downloadDocument,
  uploadDocument
};
