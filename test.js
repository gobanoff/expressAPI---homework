pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
pm.test("Content-Type is application/json", function () {
    pm.response.to.have.header("Content-Type", "application/json");
});
pm.test("Body should contain specific text", function () {
    pm.expect(pm.response.text()).to.include("expected_text");
});
pm.test("Response body should have specific properties", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("property_name");
    pm.expect(jsonData.property_name).to.eql("expected_value");
});
pm.test("Array length should be greater than 0", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.arrayProperty).to.be.an("array").that.is.not.empty;
});
pm.test("Response should have a specific header", function () {
    pm.expect(pm.response.headers.get("Header-Name")).to.equal("expected_value");
});
pm.test("Response time is within acceptable range", function () {
    pm.expect(pm.response.responseTime).to.be.within(200, 1000); // between 200ms and 1000ms
});



// HOMEWORK TESTS

// GET endpoint returns status code 200
pm.test("GET endpoint returns status code 200", function () {
    pm.response.to.have.status(200);
});

// GET endpoint returns non-empty response body
pm.test("GET endpoint returns non-empty response body", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("array").that.is.not.empty;
});
// POST endpoint returns status code 201
pm.test("POST endpoint returns status code 201", function () {
    pm.response.to.have.status(201);
});
// DELETE endpoint returns status code 204
pm.test("DELETE endpoint returns status code 204", function () {
    pm.response.to.have.status(204);
});

// DELETE endpoint response body is empty
pm.test("DELETE endpoint response body is empty", function () {
    pm.response.to.not.have.jsonBody();
});
// PUT endpoint returns status code 200 or 201 (assuming an update)
pm.test("PUT endpoint returns status code 200 or 201", function () {
    pm.response.to.have.status.oneOf([200, 201]);
});

// PUT endpoint response contains an object with at least 3 properties
pm.test("PUT endpoint response contains an object with at least 3 properties", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("object").with.property("property1");
    pm.expect(jsonData).to.be.an("object").with.property("property2");
    pm.expect(jsonData).to.be.an("object").with.property("property3");
});

// PUT endpoint response Id is not empty
pm.test("PUT endpoint response Id is not empty", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("Id").that.is.not.empty;
});
