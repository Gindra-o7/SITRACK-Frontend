import React from 'react';
import { StudentProfile as StudentProfileType } from '../../interfaces/profile.types';
import Profile from './index.tsx';

interface StudentProfileProps {
    userData: StudentProfileType;
    onSave: (data: any) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ userData, onSave }) => {
    return (
        <Profile
            isOpen={true}
            onClose={() => {}}
            userData={{
                ...userData,
                phone: userData.noHp
            }}
            onSave={onSave}
            additionalFields={[
                {
                    label: 'NIM',
                    name: 'nim',
                    value: userData.nim,
                    disabled: true
                },
                {
                    label: 'Semester',
                    name: 'semester',
                    value: userData.semester?.toString() || '',
                    type: 'number'
                }
            ]}
        />
    );
};