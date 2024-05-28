const baseUrl = "https://bcountdown.privify.me/"

async function getRequest(path) {
  const response = await fetch(baseUrl + path, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token'),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  const data = await response.text(); // parses JSON response into native JavaScript objects
  if(data[0] == "[") {
    const jsonData = JSON.parse(data);
    return jsonData;
  }
}

async function postRequest(path, payload) {
  const response = await fetch(baseUrl + path, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    body: JSON.stringify(payload),
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token'),
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin,
  });
  const data = await response.text();
    if(data[0] == "{") {
      const jsonData = JSON.parse(data);
      if (jsonData.status != 200) {
        throw new Error(jsonData.data);
      } else {
        return jsonData;
      }
    } 
    return data; // parses JSON response into native JavaScript objects
}



async function checkTokenValidity() {
  try {
      console.log("Checking token validity...")
      await getRequest("user/checkToken"); // If token is invalid, this will throw an error
      //so we don't need to check the response status cause it's already checked in getRequest
      console.log("Token is valid");

  } catch (error) {
      console.log(error);
      console.log("Token isn't valid");
      window.location.href = 'http://127.0.0.1:5500/';
      
  }
}

if(window.location != 'http://127.0.0.1:5500/') {
  setInterval(checkTokenValidity, 300000);
}