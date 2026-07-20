import http from "k6/http";

export const options = {
  vus: 100,        // 100 virtual users
  duration: "30s", // Test for 30 seconds
};

export default function () {
  http.get("http://localhost:3001/api/products");
}