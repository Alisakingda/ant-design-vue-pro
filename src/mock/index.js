const Mock = require("mockjs");

// Mock.mock("/test/get", "get", require("@/mock/json/testGet"));
// Mock.mock("/test/post", "post", require("@/mock/json/testPost"));
Mock.mock("/test/get", "get", require("./json/testGet"));
Mock.mock("/test/post", "post", require("./json/testPost"));
