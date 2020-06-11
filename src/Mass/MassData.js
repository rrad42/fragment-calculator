import { BigNumber } from 'mathjs';

/**
 * Monoisotopic element masses from NIST
 * https://www.nist.gov/pml/atomic-weights-and-isotopic-compositions-relative-atomic-masses
 */
export const elements = {
    proton: '1.007276466621',
    H: '1.00782503223',
    C: '12',
    N: '14.00307400443',
    O: '15.99491461957',
    S: '31.9720711744',
    Se: '79.9165218',
};

/**
 * Composition of each amino acid.
 */
const aminoAcids = {
    A: { C: 3, H: 5, N: 1, O: 1, S: 0 },
    C: { C: 3, H: 5, N: 1, O: 1, S: 1 },
    D: { C: 4, H: 5, N: 1, O: 3, S: 0 },
    E: { C: 5, H: 7, N: 1, O: 3, S: 0 },
    F: { C: 9, H: 9, N: 1, O: 1, S: 0 },
    G: { C: 2, H: 3, N: 1, O: 1, S: 0 },
    H: { C: 6, H: 7, N: 3, O: 1, S: 0 },
    I: { C: 6, H: 11, N: 1, O: 1, S: 0 },
    K: { C: 6, H: 12, N: 2, O: 1, S: 0 },
    L: { C: 6, H: 11, N: 1, O: 1, S: 0 },
    M: { C: 5, H: 9, N: 1, O: 1, S: 1 },
    N: { C: 4, H: 6, N: 2, O: 2, S: 0 },
    O: { C: 5, H: 10, N: 2, O: 1, S: 0 },
    P: { C: 5, H: 7, N: 1, O: 1, S: 0 },
    Q: { C: 5, H: 8, N: 2, O: 2, S: 0 },
    R: { C: 6, H: 12, N: 4, O: 1, S: 0 },
    S: { C: 3, H: 5, N: 1, O: 2, S: 0 },
    T: { C: 4, H: 7, N: 1, O: 2, S: 0 },
    V: { C: 5, H: 9, N: 1, O: 1, S: 0 },
    W: { C: 11, H: 10, N: 2, O: 1, S: 0 },
    Y: { C: 9, H: 9, N: 1, O: 2, S: 0 },
};

/**
 * Calculates the mass of each amino acid based on its
 * chemical composition and using monoisotopic element masses.
 *
 * Returns an object where the keys are the amino acid
 * and the values are instances of BigNumber with mass.
 */
export function AminoAcidMasses() {
    let output = {};
    for (let aminoAcid in aminoAcids) {
        let mass = new BigNumber(0);
        for (let element in aminoAcids[aminoAcid]) {
            const elementMass = new BigNumber(elements[element]);
            mass = mass.plus(elementMass.times(aminoAcids[aminoAcid][element]));
        }
        output[aminoAcid] = mass;
    }
    return output;
}

/**
 * Calculates the mass of the n-terminus segment of the peptide,
 * not including any modifications.
 *
 * @param {string} ionSeries
 * @returns {Mass}
 */
export function NTermMass(ionSeries) {
    if (ionSeries === 'a') {
        return new BigNumber(elements['proton'])
            .minus(new BigNumber(elements['C']))
            .minus(new BigNumber(elements['O']));
    }
    if (ionSeries === 'b') {
        return new BigNumber(elements['proton']);
    }
    if (ionSeries === 'c') {
        return new BigNumber(elements['N'])
            .plus(new BigNumber(elements['H']).times(3))
            .plus(new BigNumber(elements['proton']));
    }
    return new BigNumber(0);
}

/**
 * Calculates the mass of the c-terminus segment of the peptide,
 * not including any modifications.
 *
 * @param {string} ionSeries
 * @returns {Mass}
 */
export function CTermMass(ionSeries) {
    if (ionSeries === 'x') {
        return new BigNumber(elements['proton'])
            .minus(new BigNumber(elements['C']))
            .minus(new BigNumber(elements['O']).times(2));
    }
    if (ionSeries === 'y') {
        return new BigNumber(elements['O'])
            .plus(new BigNumber(elements['H']).times(2))
            .plus(new BigNumber(elements['proton']));
    }
    if (ionSeries === 'z') {
        return new BigNumber(elements['O']).minus(new BigNumber(elements['N']));
    }
    return new BigNumber(0);
}
