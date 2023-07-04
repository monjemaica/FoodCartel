function validate() {
    var mail = document.getElementById("text").value;
    var regex = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/

    if(!regex.text(mail)) {
        alert("Invalid Email")
        return false;
    }
}