"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';

interface MultipleIdContextState {
    ids: string[] | null; // Define your ID type
    setIds: (ids: string[] | null) => void;
}

const MultipleIdContext = createContext<MultipleIdContextState>({
    ids: null,
    setIds: () => { },
});

export function MultipleIdProvider({ children }: { children: React.ReactNode }) {
    const [ids, setIds] = useState<string[] | null>(null);

    useEffect(() => {
        
        const initialIds = getInitialIdsFromLocalStorage(); 
        console.log(initialIds,"intial id")
        // Placeholder function, replace with your implementation
        setIds(initialIds);
    }, []);
    const value={
        ids,
        setIds
    }

    return (
        <MultipleIdContext.Provider value={value}>{children}</MultipleIdContext.Provider>
    );
}

export default MultipleIdProvider;
export const useIdContext =()=>useContext(MultipleIdContext);
// Example placeholder function to retrieve initial IDs from localStorage
function getInitialIdsFromLocalStorage(): string[] | null {
    // Replace with your logic for retrieving IDs from localStorage or other appropriate mechanisms
    const array=["asdoasjdpsapod","aioodosaiodisd"];
    return  array;// Adjust the return value according to your implementation
}
