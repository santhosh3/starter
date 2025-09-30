import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrelloContext } from "./Context";
import { getCard, getList, createCard, createList, deleteCard } from "./Api";

const customStyles = {
  mainContainer: {
    backgroundColor: "#1E1E1E",
    minHeight: "100vh",
    padding: "20px",
  },
  // Style for the wrapper that applies the external CSS class
  scrollWrapper: {
    overflowX: 'scroll', // Must be here for inline style control
    WebkitOverflowScrolling: 'touch',
  },
  kanbanContainer: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start", // Prevents vertical stretching of lists
    minWidth: 'fit-content', // Forces horizontal scroll activation
  },
  listColumn: {
    flexShrink: 0,
    width: "300px",
    backgroundColor: "#2D2D2D",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100px",
  },
  card: {
    backgroundColor: "#404040",
    color: "#FFFFFF",
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "8px",
    cursor: "grab",
    boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
    wordWrap: "break-word",
    display: "flex",
    justifyContent: "space-between"
  },
  cardTitle: {
    color: "#E0E0E0",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // ... (Other styles for input, buttons, etc.) ...
  addCardBtn: {
    color: "#A0A0A0",
    cursor: "pointer",
    padding: "5px 0",
    marginTop: "5px",
  },
  AddListButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    color: 'white',
    width: "300px",
    height: "40px",
    borderRadius: "8px",
    border: 'none',
    padding: '5px',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
  AddlistCSS: {
    width: "300px",
    backgroundColor: "#2D2D2D",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  AddListInput: {
    backgroundColor: "#404040",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 10px",
    width: "100%",
  },
  AddListActionButton: {
    save: {
        backgroundColor: '#5aac44',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    close: {
        background: 'none',
        border: 'none',
        color: '#A0A0A0',
        fontSize: '1.5rem',
        cursor: 'pointer',
    }
  },
  buttonRemoveCard: {
    background: 'none',
    border: 'none',
    color: '#A0A0A0',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginLeft: '10px',
    padding: '0 4px',
    lineHeight: '1',
    transition: 'color 0.2s',
  }
};

function List() {
  const { boardId } = useParams();
  const { list, setList } = useContext(TrelloContext);
  const [activeListId, setActiveListId] = useState(null);
  const [showListInputBox, setShowListInputBox] = useState(false);
  const [listname, setListName] = useState('');


  const handleStartEdit = (listId) => {
    setActiveListId(listId);
  };

  const handleCancelEdit = () => {
    setActiveListId(null);
  };

  async function getAllCards(listId) {
    const response = await getCard(listId);
    return response;
  }

  async function getLists() {
    try {
      const response = await getList(boardId);
      const cardPromises = response.map(async (item) => {
        const cards = await getAllCards(item.id);
        return {
          id: item.id,
          name: item.name,
          boardId: item.idBoard,
          cards: cards.map((x) => {
            return {
              id: x.id,
              name: x.name,
            };
          }),
        };
      });
      const addCards = await Promise.all(cardPromises);
      setList((prev) => ({ ...prev, loading: false, data: addCards }));
    } catch (error) {
      setList((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  }


  const handleSaveList = async () => {
    try {
      const response = await createList(boardId, listname);
      const obj = {
        id: response.id,
        name: listname,
        boardId: boardId,
        cards: [],
      };
      setList((prev) => ({ ...prev, data: [...prev.data, obj] }));
    } catch (error) {
      setList((prev) => ({ ...prev, error }));
    } finally {
      setListName('');
      setShowListInputBox(prev => !prev);
    }
  }

  const deleteCardFromList = async (listId, cardId) => {
    await deleteCard(cardId);
    setList(prev => ({
      ...prev,
      data: prev.data.map((list) => {
        if (list.id === listId) {
          const newCards = list.cards.filter(card => card.id !== cardId);
          const newList = { ...list, cards: newCards };
          return newList
        } else return list
      })
    }))
  }

  useEffect(() => {
    getLists();
  }, [boardId]);

  let { loading, data, error } = list;

  const handleAddCard = async (listId, content) => {
    const { name, id } = await createCard(listId, content);
    setList(prev => ({
      ...prev,
      data: prev.data.map(list => list.id === listId ? { ...list, cards: [...list.cards, { name, id }] } : list)
    }))
  };

  if (loading) {
    return <div>Loading</div>;
  } else if (error !== null) {
    return <div>{error}</div>;
  } else {
    return (

      <div style={customStyles.mainContainer}>
        {/* Apply the CSS class AND the inline style */}
        <div className="kanban-scroll-wrapper" style={customStyles.scrollWrapper}>
          <div style={customStyles.kanbanContainer}>
            {data.map((list) => (
              <div key={list.id} style={customStyles.listColumn}>
                <div style={customStyles.cardTitle}>
                  <span className="text-white">{list.name}</span>
                  <div className="dropdown">
                    <span
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                    >
                      ...
                    </span>
                  </div>
                </div>

                <div className="overflow-auto">
                  {list.cards.map((card) => (
                    <div key={card.id} style={customStyles.card}>
                      <div  >
                        {card.name}
                      </div>
                      <div>
                        <button
                          onClick={() => deleteCardFromList(list.id, card.id)}
                          style={customStyles.buttonRemoveCard}
                        >
                          &times;
                        </button>                      
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <AddCardInput
                    listId={list.id}
                    onAddCard={handleAddCard}
                    isEditing={activeListId === list.id}
                    onStartEdit={handleStartEdit}
                    onCancelEdit={handleCancelEdit}
                  />
                </div>
              </div>
            ))}
            {showListInputBox ? (
              <div style={customStyles.AddlistCSS}>
                <input
                  style={customStyles.AddListInput} // Use new input style
                  placeholder="Enter a title for this list..."
                  value={listname}
                  onChange={(e) => setListName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSaveList();
                    }
                  }}
                  autoFocus
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleSaveList()}
                    style={customStyles.AddListActionButton.save} // Use new save button style
                    disabled={!listname.trim()}
                  >
                    Add List
                  </button>
                  <button
                    onClick={() => {
                      setListName('')
                      setShowListInputBox(false) // Direct false is cleaner
                    }}
                    style={customStyles.AddListActionButton.close} // Use new close button style
                  >
                    &times;
                  </button>
                </div>
              </div>
            ) : (
              <button style={customStyles.AddListButton} onClick={() => setShowListInputBox(true)}>
                <i className="bi bi-plus-lg me-1"></i> + Add Another List
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default List;



const AddCardInput = ({ listId, isEditing, onStartEdit, onCancelEdit, onAddCard }) => {
  const [cardContent, setCardContent] = useState('');

  const handleSave = () => {
    if (cardContent.trim()) {
      onAddCard(listId, cardContent.trim());
      setCardContent('');
    }
    onCancelEdit();
  };

  if (isEditing) {
    return (
      <div className="mt-2">
        <textarea
          className="form-control"
          style={customStyles.addCardInput}
          placeholder="Enter a title for this card..."
          value={cardContent}
          onChange={(e) => setCardContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
          }}
          autoFocus
        />
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-sm btn-success me-2" onClick={handleSave}>
            Add card
          </button>
          <button className="btn btn-sm text-secondary" onClick={onCancelEdit}>
            &times;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between align-items-center" style={customStyles.addCardBtn} onClick={() => onStartEdit(listId)}>
      <div>
        <i className="bi bi-plus-lg me-1"></i> Add a card
      </div>
      <span className="text-secondary small" style={{ cursor: 'pointer' }}>
        &#x1f4c7;
      </span>
    </div>
  );
};