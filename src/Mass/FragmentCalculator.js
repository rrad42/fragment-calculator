import { BigNumber } from 'mathjs';
import MassMap from './MassMap';
import Mass from './Mass';
import { AminoAcidMasses, NTermMass, CTermMass } from './MassData';

/**
 * Returns true if the input is A-Z
 *
 * @param {string} c
 * @returns {bool}
 */
function isAlpha(c) {
    let charCode = c.charCodeAt(0);
    return charCode > 64 && charCode < 91;
}

/**
 * Creates the data for the FragmentTable.
 *
 * @param {string} sequence The peptide sequence
 * @param {int} charge
 * @param {IonSeries} ionSeries
 * @param {float} nTerm Mod mass to add to n-terminus
 * @param {float} cTerm Mod mass to add to c-terminus
 * @param {Array} mods Array of pairs of AA/symbol and mass
 */
export default function FragmentCalculator(
    sequence,
    charge,
    ionSeries,
    nTerm,
    cTerm,
    mods
) {
    let masses = new MassMap(AminoAcidMasses());
    masses.merge(mods);

    sequence = sequence.toUpperCase();

    // Calculate n-term fragment ions, e.g. b-ions
    const leftIons = [];
    const leftSequences = [];
    let mass = new Mass(NTermMass(ionSeries[0]), charge);
    if (nTerm) {
        // Adds n-term mod mass
        mass.add(new BigNumber(nTerm));
    }
    let i = 0;
    while (i < sequence.length - 1) {
        mass.add(masses.get(sequence[i]));
        ++i;
        while (i < sequence.length - 1 && !isAlpha(sequence[i])) {
            // Add symbol masses.
            mass.add(masses.get(sequence[i]));
            ++i;
        }
        leftSequences.push(sequence.substring(0, i));
        leftIons.push(mass.toString());
    }

    // Calculate c-term fragment ions, e.g. y-ions
    const rightIons = [];
    const rightSequences = [];
    mass = new Mass(CTermMass(ionSeries[ionSeries.length - 1]), charge);
    if (cTerm) {
        // Add c-term mod mass
        mass.add(new BigNumber(cTerm));
    }
    i = sequence.length - 1;
    while (i > 0) {
        while (i > 0 && !isAlpha(sequence[i])) {
            // Add symbol masses.
            mass.add(masses.get(sequence[i]));
            --i;
        }
        mass.add(masses.get(sequence[i]));
        --i;
        rightSequences.push(
            sequence
                .substring(i + 1)
                .split()
                .reverse()
                .join()
        );
        rightIons.push(mass.toString());
    }

    // Assemble the data into a table-friendly array.
    let data = [];
    for (let i = 0; i < leftIons.length; ++i) {
        data.push([
            leftSequences[i],
            ionSeries[0] + (i + 1).toString(),
            leftIons[i],
            rightIons[rightIons.length - (i + 1)],
            ionSeries[ionSeries.length - 1] +
                (rightIons.length - (i + 1)).toString(),
            rightSequences[rightSequences.length - (i + 1)],
        ]);
    }

    return data;
}
