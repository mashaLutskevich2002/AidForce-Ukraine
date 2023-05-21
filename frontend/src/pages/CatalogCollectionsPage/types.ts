import React from 'react';

export type Collection = {
    _id: string;
    user: {
        id: string;
        name: string;
        last_name: string;
        role: string;
        phone: string;
    };
    amount: number;
    title: string;
    description: string;
    picUrl: string;
    collectedSum: number;
    location: string;
    monoBankaUrl: string;
    createdAt: string;
    updatedAt: string;
};

export type Collections = {
    militaryCollections: Collection[];
    nonMilitaryCollections: Collection[];
};
