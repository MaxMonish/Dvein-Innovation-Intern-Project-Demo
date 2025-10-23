const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGI4MmRhZmJjODBlZjhhNjkxYzcwMyIsInJvbGUiOiJIUiIsImlhdCI6MTc1OTQ5MDQ2NywiZXhwIjoxNzU5NTc2ODY3fQ.9sGEjwna5SiTSUKLRgFEn5XxCNMQEFXWJnVpa5SZoHM";

jwt.verify(token, "myverysecretkey", (err, decoded) => {
    if(err){
        console.log("Invalid Token", err.message);
    }else{
        console.log("Valid Token", decoded);
    }
});