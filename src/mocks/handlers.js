/* v8 ignore start */

// mocks/handlers.js
import { http } from 'msw'
import { HttpResponse } from 'msw'

export const handlers = [
    // By calling "http.get()" we're instructing MSW
    // to capture all outgoing "GET /posts" requests
    // and execute the given response resolver when they
    // happen.
    http.get('https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/createtemplate', () => {
        return HttpResponse.json({
            firstName: 'John',
            lastName: 'Maverick',
        })
    }),
    http.get('https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/dcms/filler/all-model', () => {
        return HttpResponse.json({
            data: [
                {
                    name: 'Model1',
                    editedBy: 'User1',
                    editedOn: '2022-01-01',
                    totalBlocks: 5,
                    type: 'Type1',
                    sentToFillBy: 'PMG1',
                    sentOn: '2022-01-02',
                    chart: 'Chart1',
                    rowStateFlag: 2,
                },

                // Add more mock data as needed
            ],
        })
    }),

    http.get('*/all-blocks', () => {
        return HttpResponse.json({
            block: 'any',
        })
    }),

    http.get('*/summary', () => {
        return HttpResponse.json({
            content: 'any',
        })
    }),

    //login test
    http.get('https://www.cf.marutisuzukisubscribe.com/api/partner/v1/sdk-details?apiKey=3ltd5pa3k574vbblodke8ofd5c', () => {
        return HttpResponse.json({
            region: "ap-south-1",
            userPoolId: "ap-south-1_8Vwf5ABPq",
            userPoolWebClientId: "3ltd5pa3k574vbblodke8ofd5c",
            gatewayUrl: "https://www.cf.marutisuzukisubscribe.com/",
            authenticationFlowType: "USER_SRP_AUTH",
            authServerUrl: "https://www.cf.marutisuzukisubscribe.com/",
            authServer: "msil-adfs-auth-server.auth.ap-south-1.amazoncognito.com",
            domain: "MSIL-COMMON-AD",
        })
    }),

    //header.test
    http.post('https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/employee/details', (req, res, ctx) => {
        // You can customize the response data here
        return res(
            ctx.status(200),
            ctx.json({
                employeeDetails: {
                    id: 1,
                    name: 'John Doe',
                    role: 'Developer',
                },
            })
        );
    }),

    http.post(
        "https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/employee/details",
        (req, res, ctx) => {
            // Extract the email from the request body
            const { email } = req.body;
            console.log(email + "email in msw post")
            return HttpResponse.json({
                results: {
                    name: "NIkhil Prakash",
                    email: "kpmg_prakash.nikhil@maruti.co.in",
                    division: "ERD-BD",
                    department: "ERD-BD",
                    vertical: "Engg",
                    filler: true,
                    checker1: true,
                    checker2: true,
                    checker3: true,
                    approver: true,
                    divisionalPMG: true,
                    verticalPMG: true,
                    token:
                        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcG1nX25lZWxhbnNodS5wYXJuYW1pQG1hcnV0aS5jby5pbiIsInVuaXF1ZV9pZCI6ImU1MzQyZTJiLWY5MWItNDFjMC04YjUzLWIwZWU2MTUwZDdjNyIsImV4cCI6MTcwODUxODc1MywiaWF0IjoxNzA4NTE4MTUzLCJlbWFpbCI6ImtwbWdfbmVlbGFuc2h1LnBhcm5hbWlAbWFydXRpLmNvLmluIn0.I0j787kdNQw-XPVep1_e9JEVn9fWARxqAWeKJKU-aFfJop_ob8gv8jE4izF2uJs7ITqfJaaZ3ri2SR6k7QEJaA",
                },
            })

        }
    ),


    //viewtimeline

    http.post("https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/create", (req, res, ctx) => {
        // Mock the response for the POST request
        return res(ctx.status(200), ctx.json({ data: "mocked data" }));
    }),

    //fillercomment
    http.put("https://k723fsvii1.execute-api.ap-south-1.amazonaws.com/msil-dcms/dcms/filler/send-for-approval", (req, res, ctx) => {
        // Extract the required data from the request body
        const { useremail, modelId, comments } = req.body;

        // You can customize the response data here based on the provided data
        return res(
            ctx.status(200),
            ctx.json({
                status: "Success",
                results: {
                    useremail,
                    modelId,
                    comments,
                    message: "Comments sent for approval successfully",
                },
            })
        );
    }),

]


/* v8 ignore stop */
