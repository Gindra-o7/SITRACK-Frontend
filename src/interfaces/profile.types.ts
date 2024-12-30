export interface Mahasiswa {
    nim?: string;
    noHp?: string;
    semester?: number;
}

export interface Dosen {
    nip: string;
    isPembimbing: boolean;
    isPenguji: boolean;
    isKaprodi: boolean;
    isKoordinator: boolean;
}

export interface PembimbingInstansi {
    instansi: string;
    jabatan?: string;
    noTelpon?: string;
}

export interface UserProfile {
    id: string;
    email: string;
    nama: string;
    photoPath?: string;
    createdAt: Date;
    roles: string[];
    mahasiswa?: Mahasiswa;
    dosen?: Dosen;
    pembimbingInstansi?: PembimbingInstansi;
}