import React, { useState } from 'react';
import {
    CheckCircle,
    XCircle,
    AlertCircle,
    FileText,
    ChevronDown,
    MessageSquare,
    User,
    Clock
} from 'lucide-react';

const Validasi = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [comments, setComments] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [activeDocument, setActiveDocument] = useState(null);
    const [comment, setComment] = useState('');

    const students = [
        {
            id: 1,
            name: "Ahmad Fajar",
            nim: "19001",
            submissionDate: "2024-03-15",
            status: "pending"
        },
        {
            id: 2,
            name: "Budi Santoso",
            nim: "19002",
            submissionDate: "2024-03-14",
            status: "revision"
        },
        {
            id: 3,
            name: "Clara Devi",
            nim: "19003",
            submissionDate: "2024-03-13",
            status: "approved"
        }
    ];

    const steps = [
        {
            id: 0,
            title: 'Persyaratan',
            description: 'Syarat-syarat untuk mendaftar seminar',
            documents: [
                { id: 1, name: 'Kartu Hasil Studi (KHS)', status: 'pending' },
                { id: 2, name: 'Bukti pembayaran KP', status: 'revision' },
                { id: 3, name: 'Kartu Bimbingan KP', status: 'approved' }
            ]
        },
        {
            id: 1,
            title: 'Pendaftaran',
            description: 'Berkas-berkas pendaftaran seminar',
            documents: [
                { id: 4, name: 'Form Pendaftaran Seminar', status: 'pending' },
                { id: 5, name: 'Laporan KP (draft)', status: 'pending' },
                { id: 6, name: 'Surat Keterangan Selesai KP', status: 'pending' }
            ]
        },
        {
            id: 2,
            title: 'Pasca-Seminar',
            description: 'Berkas setelah pelaksanaan seminar',
            documents: [
                { id: 7, name: 'Laporan KP (final)', status: 'pending' },
                { id: 8, name: 'Berita Acara Seminar', status: 'pending' },
                { id: 9, name: 'Form Nilai KP', status: 'pending' }
            ]
        }
    ];

    const handleValidateDocument = (docId, status) => {
        console.log(`Validating document ${docId} with status ${status}`);
        setShowDialog(false);
    };

    const handleCommentSubmit = (studentId, docId, comment) => {
        setComments(prev => ({
            ...prev,
            [`${studentId}-${docId}`]: comment
        }));
        setShowDialog(false);
        setComment('');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-500';
            case 'revision': return 'text-yellow-500';
            case 'pending': return 'text-gray-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'revision': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case 'pending': return <Clock className="w-5 h-5 text-gray-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="container p-4 md:p-6 ">
            <h1 className="text-2xl font-bold mb-6">Validasi Dokumen Mahasiswa</h1>

            {/* Student List */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors
                  ${selectedStudent?.id === student.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                                onClick={() => setSelectedStudent(student)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-sm text-gray-500">NIM: {student.nim}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`flex items-center ${getStatusColor(student.status)}`}>
                                            {getStatusIcon(student.status)}
                                            <span className="ml-2 text-sm capitalize">{student.status}</span>
                                        </div>
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedStudent && (
                <>
                    {/* Progress Steps */}
                    <div className="flex justify-between mb-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center w-1/3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                  ${activeStep === index ? 'bg-blue-500 text-white' :
                                    activeStep > index ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                    {activeStep > index ? <CheckCircle className="w-5 h-5" /> : (index + 1)}
                                </div>
                                <div className="text-sm font-medium text-center">{step.title}</div>
                            </div>
                        ))}
                    </div>

                    {/* Document List */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{steps[activeStep].title}</h2>
                                <span className="text-sm text-gray-500">
                  Submitted: {selectedStudent.submissionDate}
                </span>
                            </div>
                            <p className="text-gray-600 mt-1">{steps[activeStep].description}</p>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                {steps[activeStep].documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">{doc.name}</p>
                                                <div className={`flex items-center text-sm ${getStatusColor(doc.status)}`}>
                                                    {getStatusIcon(doc.status)}
                                                    <span className="ml-1 capitalize">{doc.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
                                                Preview
                                            </button>
                                            <button
                                                className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 flex items-center"
                                                onClick={() => {
                                                    setActiveDocument(doc);
                                                    setShowDialog(true);
                                                }}
                                            >
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Validasi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            className={`px-4 py-2 border rounded-md ${activeStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                            disabled={activeStep === 0}
                        >
                            Previous
                        </button>
                        <button
                            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${activeStep === steps.length - 1 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                            disabled={activeStep === steps.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Validation Dialog */}
            {showDialog && activeDocument && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            Validasi Dokumen: {activeDocument.name}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                <button
                                    className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50 flex items-center justify-center"
                                    onClick={() => handleValidateDocument(activeDocument.id, 'approved')}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                    Setuju
                                </button>
                                <button
                                    className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50 flex items-center justify-center"
                                    onClick={() => handleValidateDocument(activeDocument.id, 'revision')}
                                >
                                    <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                                    Revisi
                                </button>
                                <button
                                    className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50 flex items-center justify-center"
                                    onClick={() => handleValidateDocument(activeDocument.id, 'rejected')}
                                >
                                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                    Tolak
                                </button>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Komentar:</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tambahkan komentar untuk mahasiswa..."
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                />
                            </div>
                            <button
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={() => handleCommentSubmit(selectedStudent.id, activeDocument.id, comment)}
                            >
                                Simpan Komentar
                            </button>
                            {comments[`${selectedStudent.id}-${activeDocument.id}`] && (
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium">Komentar Sebelumnya:</p>
                                    <p className="text-sm mt-1">{comments[`${selectedStudent.id}-${activeDocument.id}`]}</p>
                                </div>
                            )}
                            <button
                                className="w-full py-2 border rounded-md hover:bg-gray-50"
                                onClick={() => {
                                    setShowDialog(false);
                                    setActiveDocument(null);
                                    setComment('');
                                }}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Validasi;