# Assignment

## Routes
- [/signup](#signup)
- [/signin](#signin)
- [/add](#add)
- [/getQuestions](#getQuestions)

## /signup

This route is used to register new user as in below format;
```
name: "",
email: "",
password: "",
role: Admin/User
```
## /signin

This route is used to login user using their email and password by passing accessToken in headers and email and password in body of request.

## /add

This route is used to add new quizzes by passing accessToken in headers and body in below format;
```
userId: User ID,
name: User Name,
email: User Email,
link: Quiz Link,
Question: Array of Questions,
```

Array of Questions can be like this;
```
[
    {
        Question: "Question Here",
        Option1: "Option1 Here",
        Option2: "Option2 Here",
        Option3: "Option3 Here",
        Option4: "Option4 Here",
        Answer: "Correct Answer"
    },
    {
        Question: "Question Here",
        Option1: "Option1 Here",
        Option2: "Option2 Here",
        Option3: "Option3 Here",
        Option4: "Option4 Here",
        Answer: "Correct Answer"
    },
    more...
]
```

## getQuestions

This route is used to get quiz by passing quiz link in body of request and accessToken is headers.