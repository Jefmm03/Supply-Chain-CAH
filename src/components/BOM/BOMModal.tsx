
import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { closeModal, setBOMData } from '../../Redux/Slices/BOMModalSlice'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

interface BOMModalProps {
    onSubmit: (itemNumber: string, dateSelected: string) => void;
    onClose: () => void;
}

const BOMModal: React.FC<BOMModalProps> = ({ onSubmit, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [itemNumber, setItemNumber] = useState<string>('');
    const [dateSelected, setDateSelected] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const isVisible = useSelector((state: RootState) => state.bomModal.isVisible);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!itemNumber || !dateSelected) {
            setError('Please fill out all fields.');
            return;
        }

        onSubmit(itemNumber, dateSelected);

        dispatch(setBOMData({ itemNumber, dateSelected }));

        navigate('/bomtable');

        dispatch(closeModal());
    };

    const handleClose = () => {
        dispatch(closeModal()); 
        onClose(); 
    };

    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Enter BOM Data</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Item Number</label>
                            <input
                                type="text"
                                value={itemNumber}
                                onChange={(e) => setItemNumber(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter item number"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date Selected</label>
                            <input
                                type="text"
                                value={dateSelected}
                                onChange={(e) => setDateSelected(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder=""
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default BOMModal;
