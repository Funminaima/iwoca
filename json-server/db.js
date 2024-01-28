"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb = void 0;
var config_js_1 = require("./config.js");
var faker_1 = require("@faker-js/faker");
faker_1.faker.seed(config_js_1.FAKER_SEED);
var LOAN_TYPES = [
    "Flexi-Loan",
    "Business Loan",
    "Cash Advance",
    "RLS",
    "CBILS",
];
function createDb() {
    var data = {
        applications: [],
    };
    for (var i = 1; i <= 100; i++) {
        var application = {
            id: i,
            first_name: faker_1.faker.person.firstName(),
            last_name: faker_1.faker.person.lastName(),
            loan_amount: parseInt(faker_1.faker.finance.amount(1000, 150000, 0)),
            loan_type: fakeLoanType(),
            email: faker_1.faker.internet.email(),
            company: faker_1.faker.company.name(),
            date_created: faker_1.faker.date.between({ from: "01/01/2021", to: new Date() }),
            expiry_date: faker_1.faker.date.between({ from: "01/01/2021", to: new Date() }),
            avatar: faker_1.faker.image.avatar(),
            loan_history: fakeLoanHistory(),
        };
        data.applications.push(application);
    }
    return data;
}
exports.createDb = createDb;
function fakeLoanType() {
    return LOAN_TYPES[faker_1.faker.number.int(LOAN_TYPES.length - 1)];
}
function fakeLoanHistory() {
    var history = [];
    for (var index = 0; index < faker_1.faker.number.int(10); index++) {
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var yearForHistory = year - (index + 1);
        var principle = faker_1.faker.finance.amount(1000, 150000, 0);
        var interestRate = faker_1.faker.finance.amount(1, 10, 0);
        var interest = (parseInt(interestRate) / 100) * parseInt(principle);
        var singleYear = {
            loan_started: faker_1.faker.date.between({
                from: "".concat(yearForHistory, "-01-01"),
                to: "".concat(yearForHistory, "-06-30"),
            }),
            loan_ended: faker_1.faker.date.between({
                from: "".concat(yearForHistory, "-07-01"),
                to: "".concat(yearForHistory, "-12-31"),
            }),
            principle: parseInt(principle),
            interest_rate: parseInt(interestRate) / 100,
            interest: Math.trunc(interest),
        };
        history.push(singleYear);
    }
    return history;
}
