const axios = require("axios");
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { expect } = require("chai");
const FormData = require("form-data");
const baseURL = "https://vhealth-qa.suckhoevang.vn/api";

describe("Suite authenticate", async () => {
  it("Login with password", async () => {
    let body = new FormData();
    body.append("grant_type", "password");
    body.append("tenant", "global");
    body.append("username", "admin");
    body.append("password", "mCare2@2!");
    let header = {
      Authorization: "Basic YnJvd3NlcjpLM2s5U2FHa0hyM0dTeXJT",
      ...body.getHeaders(),
    };
    try {
      const res = await axios.post(baseURL + "/uaa/oauth/token", body, {
        headers: header,
      });
      expect(res.data.tenant).equal("global");
      global.TOKEN = "Bearer " + res.data.access_token;
      //console.log(global.TOKEN);
    } catch (err) {
      console.error(err);
    }
  });
  it("Get user profile", async () => {
    let header = {
      Accept: "application/json;charset=UTF-8",
      Authorization: TOKEN,
    };
    try {
      const res = await axios.get(baseURL + "/account/me/profile", {
        headers: header,
      });
      expect(res.data.user.username).equal("admin");
      //console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  });
});
