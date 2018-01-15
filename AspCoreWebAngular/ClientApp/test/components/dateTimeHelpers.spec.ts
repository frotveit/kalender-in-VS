import * as DateTimeHelpers from "../../app/components/calendar/model/dateTimeHelpers";

describe("dateTimeHelpers", () => {

    it("addDays should add days", () => {
        var date = DateTimeHelpers.AddDays(new Date(2018, 2, 23), 3);
        expect(date.getDate()).toBe(26);
        expect(date.getMonth()).toBe(2);
        expect(date.getFullYear()).toBe(2018);
    })
}); 