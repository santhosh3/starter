import React, { useState, useEffect, useContext } from "react";
import { getAllBoards, createBoards } from "./Api";
import "./Trello.css";
import { TrelloContext } from "./Context";
import { Link } from "react-router-dom";

const customStyles = {
    boardCard: {
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    boardCardHover: {
        transform: 'translateY(-5px)',
    },
    // Custom style for the overlay needed when using CDN modal
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1040, // Below the modal (1050)
    }
};


function Boards() {
  let { board, setBoard } = useContext(TrelloContext);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [newBoardName, setNewBoardName] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

   const handleAddBoard = async () => {
    if (newBoardName.trim()) {
      const response = await createBoards(newBoardName);
      setBoard(prev => ({...prev, data : [...prev.data, response]}));
      setNewBoardName('');
      handleClose();
    }
  };


  useEffect(() => {
    getAllBoards()
      .then((res) =>
        setBoard((prev) => ({ ...prev, loading: false, data: res }))
      )
      .catch((err) =>
        setBoard((prev) => ({ ...prev, loading: false, error: err.message }))
      );
  }, []);

  let { loading, data, error } = board;

  if (loading) {
    return <div>Loading</div>;
  } else if (error !== null) {
    return <div>{error}</div>;
  } else {
     return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Board Group Overview</h2>
      <div className="row g-4">
        {/* === 1. Mapped Boards === */}
        {data.map(board => (
          <Link to={`/${board.id}`} key={board.id} className="col-lg-3 col-md-6 col-sm-12">
            <div
              className={`card text-white bg-${board.color} h-100 bg-primary`}
              style={customStyles.boardCard}
            >
              <div className="card-body">
                <h5 className="card-title">{board.name}</h5>
              </div>
            </div>
          </Link>
        ))}

        {/* === 2. The "Add New Board" Box === */}
        <div className="col-lg-3 col-md-6 col-sm-12">
          <button
            type="button"
            className="card bg-light border-dark h-100"
            style={{ ...customStyles.boardCard, borderStyle: 'dashed', borderColor: '#6c757d' }}
            onClick={handleShow} // <-- Opens the modal!
          >
            <div className="card-body text-dark">
              <h5 className="card-title mb-0">
                + Add New Board
              </h5>
            </div>
          </button>
        </div>
      </div>

      {/* === 3. The Bootstrap Modal (using CDN classes) === */}
      {showModal && (
        <>
          {/* Backdrop/Overlay */}
          <div style={customStyles.modalOverlay} onClick={handleClose}></div>
          
          {/* Modal Structure */}
          <div 
            className="modal fade show d-block" // 'show' and 'd-block' are essential for visibility in React
            tabIndex="-1" 
            style={{ paddingRight: '17px' }} // Simulate scrollbar padding
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                
                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title">Create New Board</h5>
                  <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                </div>
                
                {/* Modal Body */}
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="boardNameInput" className="form-label">Board Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="boardNameInput"
                      placeholder="Enter board name"
                      value={newBoardName}
                      onChange={(e) => setNewBoardName(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={handleAddBoard} 
                    disabled={!newBoardName.trim()}
                  >
                    Create Board
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  }
}

export default Boards;
