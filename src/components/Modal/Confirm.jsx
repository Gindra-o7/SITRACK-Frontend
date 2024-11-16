const Confirm = ({text, confirm, cancel, isOpen, onConfirm, onCancel}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in">
                <div className="text-center">
                    <h2 className="text-lg font-semibold mb-4">
                        {text}
                    </h2>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onConfirm}
                            className="px-8 py-2 bg-[#2B3674] text-white rounded-lg hover:bg-[#1f2857] transition-colors"
                        >
                            {confirm}
                        </button>

                        <button
                            onClick={onCancel}
                            className="px-8 py-2 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm