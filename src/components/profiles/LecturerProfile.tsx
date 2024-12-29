import React from 'react';
import { LecturerProfile as LecturerProfileType } from '../../interfaces/profile.types';
import Profile from './index.tsx';

interface LecturerProfileProps {
    userData: LecturerProfileType;
    onSave: (data: any) => void;
}

export const LecturerProfile: React.FC<LecturerProfileProps> = ({ userData, onSave }) => {
    return (
        <Profile
            isOpen={true}
            onClose={() => {}}
            userData={{
                ...userData
            }}
            onSave={onSave}
            additionalFields={[
                {
                    label: 'NIP',
                    name: 'nip',
                    value: userData.nip,
                    disabled: true
                }
            ]}
        />
    );
};