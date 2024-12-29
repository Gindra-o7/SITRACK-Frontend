import React from 'react';
import { IndustryAdvisorProfile as IndustryAdvisorProfileType } from '../../interfaces/profile.types';
import Profile from './index.tsx';

interface IndustryAdvisorProfileProps {
    userData: IndustryAdvisorProfileType;
    onSave: (data: any) => void;
}

export const IndustryAdvisorProfile: React.FC<IndustryAdvisorProfileProps> = ({ userData, onSave }) => {
    return (
        <Profile
            isOpen={true}
            onClose={() => {}}
            userData={{
                ...userData,
                phone: userData.noTelpon
            }}
            onSave={onSave}
            additionalFields={[
                {
                    label: 'Instansi',
                    name: 'instansi',
                    value: userData.instansi
                },
                {
                    label: 'Jabatan',
                    name: 'jabatan',
                    value: userData.jabatan || ''
                }
            ]}
        />
    );
};