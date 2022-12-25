const isValidFirstName = function(name){
    const regex =  /^[a-zA-Z]{1,10}$/;
    return regex.test(name)
}

const isValidLastName = function(name){
    const regex =  /^[a-zA-Z']{2,10}$/;
    return regex.test(name)
}

const isValidFullName = function (name) {
    const regex = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/
    return regex.test(name)
}

const isValidMail = function(email){
    const regex =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return regex.test(email)
}

const isValidDOB = function(dob){
    const regex =  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(dob)
}

const isValidMobile = function(mobile){
    const regex = /^[1-9]{10}$/
    return regex.test(mobile)
}

module.exports = {isValidFirstName, isValidLastName, isValidFullName, isValidMail, isValidDOB, isValidMobile}