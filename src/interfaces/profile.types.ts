export interface BaseProfile {
    id: string;
    email: string;
    nama: string;
    photoPath?: string;
}

export interface StudentProfile extends BaseProfile {
    nim: string;
    noHp?: string;
    semester?: number;
    mahasiswaKp?: {
        mulaiKp?: Date;
        selesaiKp?: Date;
        judulLaporan?: string;
        namaInstansi?: string;
    };
}

export interface LecturerProfile extends BaseProfile {
    nip: string;
    isPembimbing: boolean;
    isPenguji: boolean;
    isKaprodi: boolean;
    isKoordinator: boolean;
}

export interface IndustryAdvisorProfile extends BaseProfile {
    instansi: string;
    jabatan?: string;
    noTelpon?: string;
}

export interface ProfileProps {
    isOpen: boolean;
    onClose: () => void;
    userData?: {
        name?: string;
        email?: string;
        phone?: string;
        profilePicture?: string;
    };
    onSave: (data: any) => void;
    additionalFields?: Array<{
        label: string;
        name: string;
        value: string;
        type?: string;
        disabled?: boolean;
    }>;
}