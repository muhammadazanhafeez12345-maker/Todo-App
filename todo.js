

         
import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // ADD ITEM
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setToggleButton(false);
      setInputData("");
      setIsEditItem(null);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
        checked: false, // ADD CHECKED PROPERTY
      };

      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // EDIT ITEM
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // DELETE ONE ITEM
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // DELETE ALL CHECKED ITEMS
  const deleteChecked = () => {
    setItems(items.filter((item) => !item.checked));
  };

  // REMOVE ALL ITEMS
  const removeAll = () => {
    setItems([]);
  };

  // LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./notebook.jpg" alt="todologo" />
            <figcaption>Add your list here 👍</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleButton ? (
              <i className="fa-solid fa-pen-to-square" onClick={addItem}></i>
            ) : (
              <i className="fa-solid fa-plus" onClick={addItem}></i>
            )}
          </div>

          {/* SHOW ITEMS */}
          <div className="showItemsWrapper">
            <div className="showItems">
              {items.map((curElem) => (
                <div className="eachItem" key={curElem.id}>
                  <div className="itemText">
                    <h3>{curElem.name}</h3>
                  </div>

                  <div className="todo-btn">
                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      id={`tickBtn-${curElem.id}`}
                      className="checkbox"
                      checked={curElem.checked}
                      onChange={() =>
                        setItems(
                          items.map((item) =>
                            item.id === curElem.id
                              ? { ...item, checked: !item.checked }
                              : item
                          )
                        )
                      }
                    />
                    

                    {/* EDIT */}
                    <i
                      className="fa-solid fa-pen-to-square edit-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>

                    {/* DELETE ONE */}
                    <i
                      className="fa-solid fa-trash delete-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="checklist-btn">
              <button
                className="btn-effect04"
                data-hover="Remove All"
                onClick={removeAll}
              >
                <span>CHECKLIST</span>
              </button>

              {/* DELETE CHECKED */}
              <button className="deletechecked" onClick={deleteChecked}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;

