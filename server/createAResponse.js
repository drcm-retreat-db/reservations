// This function is the endpoint's request handler.
exports = function ({ query, headers, body }, response) {
    // This is a binary object that can be accessed as a string using .text()
    // Raw request body (if the client sent one).
    if (Object.keys(body?.data || {}).length > 0) {
        const doc = context.services.get("data-axdpy").db("DRC").collection("nyrForms").insertOne({
            Timestamp: body.data.timestamp,
            Name: body.data.name,
            Mobile: body.data.mobile,
            Email: body.data.email,
            Profession: body.data.profession,
            Address: body.data.address,
            Country: body.data.country,
            Participants_count: body.data.count,
            Participants_list: body.data.pList,
            Room_type: body.data.roomType,
            cuisine: body.data.cuisine,
            eta: body.data.eta,
            SponsorName: body.data.sponsorName,
            SponsorCard: body.data.sponsorCard,
            SponsorRelation: body.data.sponsorRelation

        });
        return doc;

    }

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Querying a mongodb service:
    // const doc = context.services.get("mongodb-atlas").db("dbname").collection("coll_name").findOne();

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
};

createAResponse({
    body: {
        data: {
            timestamp: '21Jan',
            name: 'abc',
            mobile: '123123111',
            email: 'abc@gmail.com',
            profession: 'dev',
            address: 'tuty',
            country: 'India',
            count: '3',
            pList: [
                {
                    name: 'one',
                    age: '22',
                    gender: 'Male',
                    MarriageDate: ''
                },
                {
                    name: 'two',
                    age: '25',
                    gender: 'Female',
                    MarriageDate: '12/12/2000'
                }
            ],
            roomType: 'A/C',
            cuisine: 'No',
            eta: '11 May',
            sponsorName: 'def',
            sponsorCard: 'drc112',
            sponsorRelation: 'Mother'
        }
    }
})
//////////////////////////////

exports = async function(payload, response) {
    // Convert the request body from BSON to a JSON object and then pull out relevant fields
    const { someField } = JSON.parse(payload.body.text());
    // If the request is missing required fields or something else is wrong, respond with an error
    if (!someField) {
      response.setStatusCode(400)
      response.setBody(`Could not find "someField" in the endpoint request body.`);
    }
    // Execute application logic, such as working with MongoDB
    const cluster = context.services.get('mongodb-atlas');
    const requests = cluster.db("demo").collection("requests");
    try {
      const { insertedId } = await requests.insertOne({ someField });
      // Respond with an affirmative result
      response.setStatusCode(200)
      response.setBody(`Successfully created a document for the request with _id: ${insertedId}.`);
    } catch (err) {
      // If the insert fails for some reason, respond with an error
      response.setStatusCode(500)
      response.setBody(`Failed to create a document for the request. ${err}`)
    }
  }
  

