import {expect} from 'chai'
import Risk from '../js/Risk'
import Territory from '../js/Territory'

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

    it('territories should be constructed from Territory func', () => {
        expect(risk.territories['iceland'].constructor).to.equal(Territory)
    })
})