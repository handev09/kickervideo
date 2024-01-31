/** @format */

import {useState} from "react";

const initialServiceComps = [
    {
        index: 0,
        quantity: 1,
        unitPrice: 0,
        selectedItem: {
            item_name: "",
            markup: 0,
            item_desc: "",
        },
    },
];

export function useServiceComps() {
    // States
    const [serviceComps, setServiceComps] = useState(initialServiceComps);

    // Functions
    const addServiceComp = () => {
        const newComp = {...initialServiceComps[0], quantity: 1};
        setServiceComps((prev) => prev.concat(newComp));
    };

    const deleteServiceComp = (index, data) => {
        const filterByIndex = (_, idx) => idx !== index;
        setServiceComps([...serviceComps].filter(filterByIndex));
    };

    const updateServiceComp = (index, properties) => {
        const updateComp = (comp, idx) => (idx === index ? properties : comp);
        setServiceComps((prev) => prev.map(updateComp));
    };

    return {
        serviceComps,
        setServiceComps,
        addServiceComp,
        deleteServiceComp,
        updateServiceComp,
    };
}
