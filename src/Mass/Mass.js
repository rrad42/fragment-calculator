import { BigNumber } from 'mathjs';
import { elements } from './MassData';

export default class Mass {
    constructor(mass = 0, charge = 1) {
        this.mass = new BigNumber(mass);
        this.charge = charge;
    }

    /**
     * Increment mass
     *
     * @param {Mass} m
     * @returns {BigNumber}
     */
    add(m) {
        this.mass = this.mass.plus(m);
    }

    /**
     * Calculates the m/z for the given charge.
     *
     * @param {Mass} mass
     * @param {int} charge
     * @returns {BigNumber}
     */
    applyCharge(mass, charge) {
        const proton = new BigNumber(elements['proton']);
        return mass.plus(proton.times(charge - 1)).dividedBy(charge);
    }

    /**
     * Get result as string.
     *
     * @returns {string}
     */
    toString() {
        return this.applyCharge(this.mass, this.charge).toPrecision(12);
    }
}
