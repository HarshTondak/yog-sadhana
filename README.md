
# Yog-Sadhana

Problem Statement:
Assume that you are the CTO of an outsourcing firm which has been chosen to build an
admission form for the Yoga Classes which happen every month.
Requirements for the admission form are:
- Only people within the age limit of 18-65 can enroll for the monthly classes and they will be paying the fees on a month on month basis. I.e. an individual will have to pay the fees every month and he can pay it any time of the month.
- They can enroll any day but they will have to pay for the entire month. The monthly fee is 500/- Rs INR.
- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM. The participants can choose any batch in a month and can move to any other batch next month. I.e. participants can shift from one batch to another in different months but in the same month they need to be in the same batch.
## Entity Relationship Diagram:


[User]

*_id [ ObjectId ]

*username [ String, not null, Index ]

firstname [ String, not null, Index ]

lastname [ String, Index ]

*email [ String, not null, Index ]

password [ String, not null ]

picture [ String ]

gender [ String, not null ]

bYear [ Number, not null ]

bMonth [ Number, not null ]

bDay [ Number, not null ]

sYear [ Number, not null ]

sMonth [ Number, not null ]

batch [ String, not null ]

*created [ Date ]

*updated [ Date ]


## Installation

Install my-project with npm

For Backend:
```bash
$ cd backend   // go to server folder
$ npm i       // npm install packages
$ npm run server // run it locally
```

For Frontend:
```bash
$ cd frontend   // go to client folder
$ npm i       // npm install packages
$ npm start // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` MongoDB Database URL

`BASE_URL` Frontend URL

`PORT` PORT Number of Server

`TOKEN_SECRET` JWT Secret

Cloudinary Variables for Profile Picture Storage
`CLOUD_NAME`
`CLOUD_API_KEY`
`CLOUD_API_SECRET`

Stripe Variable
`STRIPE_SECRET_KEY`

Frontend
`ANOTHER_API_KEY`
`ANOTHER_API_KEY`


## Deployment

Backend is deployed on Render.
Frontend is deployed on Netlify.
## DEMO VIDEO

https://drive.google.com/file/d/13gWc_FJLHuaDiLjEG88Rmi7-5DIGzyDd/view?usp=drive_link

