/** @format */

import { useState } from "react";

const initialServiceComps = [
    {
        index: 0,
        quantity: 1000,
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
    const [serviceComps, setA] = useState(initialServiceComps);

    // Functions
    const addServiceComp = () => {
        console.log("ADD");
        const newComp = { ...initialServiceComps[0], quantity: 1000 };
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

    const setServiceComps = (a) => {
        console.log("CHAAAAA");
        console.log(a);
        setA(a);
    };
    return {
        serviceComps,
        setServiceComps,
        addServiceComp,
        deleteServiceComp,
        updateServiceComp,
    };
}
