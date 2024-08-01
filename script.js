function sendEmail() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "tixander234@gmail.com",
        Password : "dammm234",
        To : 'tolubaki@udel.edu',
        From : document.getElementById("email").value,
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}