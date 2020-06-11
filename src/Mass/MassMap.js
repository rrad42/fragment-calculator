import { BigNumber } from 'mathjs';

/**
 * Stores masses for amino acids and symbols.
 */
export default class MassMap {
    /**
     * @param {Object} masses
     */
    constructor(masses) {
        this.masses = masses;
    }

    /**
     * Merge another map of masses to this one.
     * Masses are summed if the key is present in both,
     * otherwise a new key can be added.
     *
     * @param {Object} merge
     */
    merge(merge) {
        for (let i in merge) {
            let mod = merge[i];
            if (!mod[0] || !mod[1]) {
                continue;
            }
            let key = mod[0];
            let value = new BigNumber(mod[1]);
            if (key in this.masses) {
                this.masses[key] = this.masses[key].plus(value);
            } else {
                this.masses[key] = value;
            }
        }
        return this.masses;
    }

    /**
     * Returns the mass associated with the key,
     * or returns zero if key not found.
     *
     * @param {string} key
     * @returns {BigNumber}
     */
    get(key) {
        if (!(key in this.masses)) {
            return new BigNumber(0);
        }
        return this.masses[key];
    }
}
