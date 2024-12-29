import React, {useState} from "react";
import {Award, User, BookOpen, Building2, CalendarCheck} from "lucide-react";
import axiosInstance from "../../configs/axios.configs.ts";

interface Student {
    nim?: string;
    name?: string;
    title?: string;
    company?: string;
    period?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    student?: Student;
    onSubmit: (nilai: number, mahasiswaNim: string) => void;
}

interface GradesDosenPenguji {
    scientific: number;
    presentation: number;
    project: number;
    comment?: string;
}

const GRADE_WEIGHTS = {
    scientific: 0.40,
    presentation: 0.20,
    project: 0.40
};

const convertToGrade = (score: number): string => {
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'D';
    return 'E';
};

const convertToNumber = (grade: string): number => {
    switch (grade) {
        case 'A': return 85;
        case 'A-': return 80;
        case 'B+': return 75;
        case 'B': return 70;
        case 'B-': return 65;
        case 'C+': return 60;
        case 'C': return 55;
        case 'D': return 50;
        default: return 0;
    }
};

const InputNilaiDosenPenguji: React.FC<Props> = ({
                                                     isOpen,
                                                     onClose,
                                                     student,
                                                     onSubmit
                                                 }) => {
    const [selectedGrades, setSelectedGrades] = useState<GradesDosenPenguji>({
        scientific: 0,
        presentation: 0,
        project: 0,
    });
    const [comment, setComment] = useState<string>("");
    const [displayGrades, setDisplayGrades] = useState({
        scientific: "",
        presentation: "",
        project: ""
    });

    const gradeOptions: string[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "D"];

    const handleGradeSelect = (key: keyof GradesDosenPenguji, grade: string) => {
        const numericValue = convertToNumber(grade);
        setSelectedGrades(prev => ({
            ...prev,
            [key]: numericValue
        }));
        setDisplayGrades(prev => ({
            ...prev,
            [key]: grade
        }));
    };

    const calculateWeightedGrade = (): number => {
        return (
            selectedGrades.scientific * GRADE_WEIGHTS.scientific +
            selectedGrades.presentation * GRADE_WEIGHTS.presentation +
            selectedGrades.project * GRADE_WEIGHTS.project
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const weightedGrade = calculateWeightedGrade();
        if (student?.nim) {
            onSubmit(weightedGrade, student.nim);
        }
    };

    if (!isOpen) return null;

    const gradeInputs = {
        scientific: "Penguasaan keilmuan (40%)",
        presentation: "Kemampuan presentasi (20%)",
        project: "Kesesuaian dan Urgensi tugas KP (40%)"
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Input Nilai Mahasiswa
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Informasi Mahasiswa */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-5 w-5 text-gray-400"/>
                            <h4 className="font-medium text-gray-900">Informasi Mahasiswa</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-7">
                            <div>
                                <p className="text-sm text-gray-500">Nama</p>
                                <p className="font-medium">{student?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">NIM</p>
                                <p className="font-medium">{student?.nim}</p>
                            </div>
                        </div>
                    </div>

                    {/* Judul KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-gray-400"/>
                            <h4 className="font-medium text-gray-900">Judul Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">
                            {student?.title || ".-"}
                        </p>
                    </div>

                    {/* Tempat KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-5 w-5 text-gray-400"/>
                            <h4 className="font-medium text-gray-900">
                                Tempat Kerja Praktek
                            </h4>
                        </div>
                        <p className="pl-7">
                            {student?.company || "PT Technology Indonesia"}
                        </p>
                    </div>

                    {/* Periode KP */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="h-5 w-5 text-gray-400"/>
                            <h4 className="font-medium text-gray-900">Periode</h4>
                        </div>
                        <p className="pl-7">
                            {student?.period || ".-"}
                        </p>
                    </div>

                    {/* Form Penilaian */}
                    <div>
                        <h4 className="font-medium text-gray-900 mb-4">Form Penilaian</h4>
                        <form>
                            <div className="space-y-6">
                                {Object.entries(gradeInputs).map(([key, label]) => (
                                    <div key={key} className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {label}
                                            {displayGrades[key as keyof GradesDosenPenguji] &&
                                                ` - Nilai: ${selectedGrades[key as keyof GradesDosenPenguji]}`}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {gradeOptions.map((grade) => (
                                                <button
                                                    key={`${key}-${grade}`}
                                                    type="button"
                                                    className={`px-4 py-2 text-sm rounded-lg ${
                                                        displayGrades[key as keyof GradesDosenPenguji] === grade
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                    onClick={() => handleGradeSelect(key as keyof GradesDosenPenguji, grade)}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span
                                            className="text-sm font-medium text-gray-700">Nilai Akhir (dengan bobot)</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {calculateWeightedGrade().toFixed(2)} ({convertToGrade(calculateWeightedGrade())})
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Catatan / Komentar
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                                        placeholder="Tambahkan komentar..."
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputNilaiDosenPenguji