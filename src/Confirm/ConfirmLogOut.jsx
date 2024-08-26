
const ConfirmLogOut = ({ isOpen, onClose, onConfirm }) => {
     if (!isOpen) return null;
   return (
     <div className="fixed z-50 inset-0  flex justify-center bg-black bg-opacity-50 ">
       <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-dark-2 absolute  ">
         <h2 className="text-xl font-semibold mb-4 max-w-sm text-center dark:text-white text-black">
           Are you sure you want to Logout?
         </h2>
         <div className="flex justify-center gap-10">
           <button
             className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
             onClick={onClose}
           >
             No
           </button>
           <button
             className="bg-blue-700 text-white px-4 py-2 rounded"
             onClick={() => onConfirm()}
           >
             Yes
           </button>
         </div>
       </div>
     </div>
   )
}

export default ConfirmLogOut