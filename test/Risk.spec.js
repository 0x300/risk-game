import {expect} from 'chai'
import Risk from '../js/Risk'

describe('Risk', () => {
    let risk

    beforeEach(() => {
        risk = new Risk()
    })

    it('should load territory data', () => {
        expect(risk.territories['alaska']).to.not.be.undefined
    })

    it('territories should have a name string property', () => {
        expect(risk.territories['alberta'].name).to.be.a('string').and.not.have.lengthOf(0)
    })

    // it('territories should be constructed from Territory func', () => {
        // console.log(risk.territories['iceland'].constructor);

        // Actually is "Function Territory".. how do I check that?
        // expect(risk.territories['iceland'].constructor).to.be('Territory')
    // })
})