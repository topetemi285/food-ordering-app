"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md"

function DeleteButton({ 
  // label, 
  onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div>
        <div className="fixed bg-black/80 inset-0 flex items-center justify-center h-full">
          <div className="bg-white p-4 rounded-lg">
            <div>Are you sure you want to delete?</div>
            <div className="flex gap-2 mt-1">
              <button type="button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
                type="button"
                className="bg-red-700 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      <MdDelete />
    </button>
  );
}

export default DeleteButton;
