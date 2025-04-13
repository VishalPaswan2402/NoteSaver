import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrintNote } from './PrintNote';

export function usePrintNote(name, description) {
    const componentRef = useRef();

    const printFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Note_Saver",
    });

    const HiddenPrintComponent = () => (
        <div style={{ display: 'none' }}>
            <PrintNote ref={componentRef} name={name} description={description} />
        </div>
    );

    return { printFn, HiddenPrintComponent };
}
