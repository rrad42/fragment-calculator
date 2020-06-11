import React, { useState } from 'react';
import PeptideForm, { defaultInputs } from './PeptideForm';
import FragmentTable from './FragmentTable';

/**
 * Main component for the App
 */
export default function App() {
    let [inputs, setInputs] = useState(defaultInputs);

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <PeptideForm
                            onSubmit={(data) => {
                                setInputs(data);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <FragmentTable {...inputs} />
                    </div>
                </div>
            </div>
        </div>
    );
}
