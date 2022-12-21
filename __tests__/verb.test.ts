import "@testing-library/jest-dom"
import {describe, expect, test} from '@jest/globals';
import falar from "../public/portuguese/content/f/falar.json"
import verb from "../utils/verb";

describe("verb object", () => {
    test("should have conjugations", ()=>{
        let v = verb(falar)
        expect(v.conjugations.length).toBeGreaterThan(1)
    })

    test("each conjugation should have a type of FINITE or NON-FINITE", () => {
        let v = verb(falar)
        v.conjugations.forEach(cc => {
            expect(cc.type).toMatch(/FINITE|NON\-FINITE/)
        })
    })
    
    describe("query function", () => {
        test("query for \"GERUND\" should return single result of form gerund", () => {
            let v = verb(falar)
            let gerund = v.query("GERUND")
            expect(gerund.length).toBe(1)
            expect(gerund[0].form).toBe("GERUND")
        })
        test("query for \"INDICATIVE\" \"PRESENT\" should return 6 results with tense \"PRESENT\"", () => {
            let v = verb(falar)
            let indPresent = v.query("INDICATIVE","PRESENT")
            expect(indPresent.length).toBe(6)
            indPresent.forEach(c => {
                expect(c.tense).toBe("PRESENT")
            })
        })
        test("query for \"PAST-PARTICIPLE\" should return single array masculine past participle", () => {
            let v = verb(falar)
            let pastP = v.query("PAST-PARTICIPLE")
            expect(pastP.length).toBe(1)
            expect(pastP[0].value).toBe("falado")
        })
        test("query for \"CONDITIONAL\" array with length of 6", () => {
            let v = verb(falar)
            let pastP = v.query("CONDITIONAL")
            expect(pastP.length).toBe(6)
        })
        test("query for \"IMPERATIVE\" array with length of 12", () => {
            let v = verb(falar)
            let pastP = v.query("IMPERATIVE")
            expect(pastP.length).toBe(12)
        })


    })
})