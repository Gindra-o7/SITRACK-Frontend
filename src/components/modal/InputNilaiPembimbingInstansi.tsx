import React, { useState, useEffect } from "react";
import { Award, BookOpen, Building2, CalendarCheck, User } from "lucide-react";
import axiosInstance from "../../configs/axios.configs.ts";

interface GradeInput {
    deliverables: number;
    punctuality: number;
    discipline: number;
    attitude: number;
    teamwork: number;
    initiative: number;
    comment?: string;
}

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
    onSubmit: (nim: string, nilai: number) => Promise<void>;
}

const convertToLetterGrade = (score: number): string => {
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

const convertToNumericGrade = (letterGrade: string): number => {
    const gradeMap: { [key: string]: number } = {
        'A': 87,  // midpoint of 85-100
        'A-': 82, // midpoint of 80-85
        'B+': 77, // midpoint of 75-80
        'B': 72,  // midpoint of 70-75
        'B-': 67, // midpoint of 65-70
        'C+': 62, // midpoint of 60-65
        'C': 57,  // midpoint of 55-60
        'D': 52,  // midpoint of 50-55
        'E': 45   // below 50
    };
    return gradeMap[letterGrade] || 0;
};

const InputNilaiPembimbingInstansi: React.FC<Props> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  student,
                                                                  onSubmit
                                                              }) => {
    const [selectedGrades, setSelectedGrades] = useState<GradeInput>({
        deliverables: 0,
        punctuality: 0,
        discipline: 0,
        attitude: 0,
        teamwork: 0,
        initiative: 0
    });
    const [comment, setComment] = useState<string>("");
    const [averageGrade, setAverageGrade] = useState<number>(0);
    const [letterGrade, setLetterGrade] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const gradeOptions: string[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "E"];

    useEffect(() => {
        const calculateWeightedAverage = () => {
            const weights = {
                deliverables: 0.25,
                punctuality: 0.15,
                discipline: 0.15,
                attitude: 0.15,
                teamwork: 0.15,
                initiative: 0.15
            };

            const weightedSum = Object.entries(selectedGrades).reduce((sum, [key, value]) => {
                return sum + (value * weights[key as keyof typeof weights]);
            }, 0);

            return Number(weightedSum.toFixed(2));
        };

        if (Object.values(selectedGrades).every(grade => grade > 0)) {
            const average = calculateWeightedAverage();
            setAverageGrade(average);
            setLetterGrade(convertToLetterGrade(average));
        }
    }, [selectedGrades]);

    const handleGradeSelection = (key: keyof GradeInput, letterGrade: string) => {
        const numericGrade = convertToNumericGrade(letterGrade);
        setSelectedGrades(prev => ({
            ...prev,
            [key]: numericGrade
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!student?.nim || isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Submit to backend
            await axiosInstance.post(`/pembimbing_instansi/${student.nim}/nilai`, {
                ...selectedGrades,
                comment
            });

            // Call parent component's onSubmit
            await onSubmit(student.nim, averageGrade);
            onClose();
        } catch (error) {
            console.error('Error submitting grade:', error);
            // Handle error appropriately - you might want to show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

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
                    {/* Student Information */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-5 w-5 text-gray-400" />
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

                    {/* Project Title */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Judul Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">{student?.title}</p>
                    </div>

                    {/* Company */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Tempat Kerja Praktek</h4>
                        </div>
                        <p className="pl-7">{student?.company}</p>
                    </div>

                    {/* Period */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarCheck className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Periode</h4>
                        </div>
                        <p className="pl-7">{student?.period}</p>
                    </div>

                    {/* Grading Form */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-gray-400" />
                            <h4 className="font-medium text-gray-900">Form Penilaian</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 pl-7">
                                {Object.entries({
                                    deliverables: "Deliverables",
                                    punctuality: "Ketepatan Waktu",
                                    discipline: "Kedisiplinan",
                                    attitude: "Attitude",
                                    teamwork: "Kerjasama dalam Tim",
                                    initiative: "Inisiatif",
                                }).map(([key, label]) => (
                                    <div key={key} className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {label}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {gradeOptions.map((grade) => (
                                                <button
                                                    key={`${key}-${grade}`}
                                                    type="button"
                                                    className={`px-4 py-2 text-sm rounded-lg ${
                                                        convertToLetterGrade(selectedGrades[key as keyof GradeInput]) === grade
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                    onClick={() => handleGradeSelection(key as keyof GradeInput, grade)}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Average Grade Display */}
                                {averageGrade > 0 && (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm font-medium text-gray-700">
                                            Nilai Rata-rata: {averageGrade} ({letterGrade})
                                        </p>
                                    </div>
                                )}

                                {/* Comment section */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Catatan / Komentar
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Tambahkan komentar..."
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                    disabled={averageGrade === 0 || isSubmitting}
                                >
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputNilaiPembimbingInstansi;