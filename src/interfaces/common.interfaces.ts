import {LucideIcon} from "lucide-react";

export interface Document {
    id: string;
    nim: string;
    userId: string;
    jenisDokumen: string;
    kategori: string;
    filePath: string;
    status: 'submitted' | 'verified' | 'rejected';
    createdAt: string;
    reviews?: {
        id: string;
        comment: string;
        status: string;
    }[];
}

export interface UserData {
    id: string;
    nama: string;
    email: string;
    userRoles: {
        id: string;
        userId: string;
        roleId: string;
        role: {
            id: string;
            name: string;
        }
    }[];
    mahasiswa: {
        nim: string;
    };
}

export interface GroupedDocuments {
    number: number;
    date: string;
    status: "revisi" | "diterima" | "menunggu";
    documents: {
        name: string;
        status: "menunggu" | "diterima" | "revisi";
        filePath?: string;
    }[];
}

export interface CardData {
    title: string;
    description: string;
    path: string;
    icon: LucideIcon;
}

export interface BaseProps {
    value: string;
}

export interface BasicStat extends BaseProps {
    variant: "basic";
    label: string;
}

export interface DetailedStat extends BaseProps {
    variant: "detailed";
    title: string;
    description: string;
}

type StatusType = "revisi" | "diterima" | "menunggu";

export interface CardUploadProps {
    number: string | number;
    date: string;
    status: StatusType;
    documents: { name: string; status: StatusType; filePath: string }[];
    onStatusClick: () => void;
    onDocumentClick: (filePath: string) => void;
}

export interface StatusModalProps {
    title: string;
    status: StatusType;
    text?: string;
    isOpen: boolean;
    onClose: () => void;
    documents: Array<{
        name: string;
        status: StatusType;
    }>;
    notes?: string[];
    onDocumentClick?: (filePath: string) => void;
}

export interface UploadPersyaratanProps {
    isOpen: boolean;
    onClose: () => void;
    nim: string;
    userId: string;
}

export interface DocumentUpload {
    title: string;
    text: string;
    jenisDokumen: string;
    file: File | null;
}

export interface UploadPendaftaranProps {
    isOpen: boolean;
    onClose: () => void;
    nim: string;
    userId: string;
}

export interface FormDataType {
    nim: string;
    judulLaporan: string;
    namaInstansi: string;
    alamatInstansi: string;
    mulaiKp: string;
    selesaiKp: string;
    namaPembimbingInstansi: string;
    jabatanPembimbingInstansi: string;
    noTeleponPembimbing: string;
    emailPembimbingInstansi: string;
}

export interface DocumentPendaftaran {
    title: string;
    text: string;
    type: string;
}