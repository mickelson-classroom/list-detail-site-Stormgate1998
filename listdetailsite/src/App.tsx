import { useEffect, useState } from "react";
import "./MyApp.css";
import { Item } from "./Item";
import { ToDoList, } from "./models/todolist";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GenericInput } from "./GenericInput";
import GenericRadioComponent from "./GenericRadio";
import {GenericSelect, Option } from "./GenericSelect";

const App = () => {
  const [items, setItems] = useState<ToDoList[]>([]);
  const [newFilterValue, setNewFilterValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<ToDoList | undefined>();
  const [filteredItems, setFilteredItems] = useState<ToDoList[]>([]);
  const [addingNew, setAddingNew] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [deleteNumber, setDeleteNumber] = useState<number | undefined>()
  const [showSteps, setShowSteps] = useState(false);
  const [addingNewStep, setAddingNewStep] = useState(false);
  const [newStepContent, setNewStepContent] = useState("")
  const [deletingStep, setDeletingStep] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [isItemNameValid, setIsItemNameValid] = useState(false)
  const [isContentValid, setContentValid] = useState(false)
  const [isStepContentValid, setisStepContentValid] = useState(false)
  const [deletingStepIndex, setDeletingStepIndex] = useState(0)
   const [selectedOption, setSelectedOption] = useState(1);
  const [isOption1NotSelected, setIsOption1NotSelected] = useState(true); // New state variable
  const options = [
    { index: 1, value: "It's terrible" },
    { index: 2, value: 'Eh, I have seen worse' },
    { index: 3, value: 'So-so' },
    { index: 4, value: 'Pretty Good' },
    { index: 5, value: 'Fantastic' },
  ];

  useEffect(() => {
    setFilteredItems(
      items.filter((b) =>
        b.title.toLowerCase().includes(newFilterValue.toLowerCase())
      )
    );
  }, [items, newFilterValue]);

  const addNewItem = () => {
    const lastItemId = items.length > 0 ? items[items.length - 1].id : items.length + 1;
    if (newItemTitle.trim() !== '' && newItemContent.trim() !== '') {
      const newItem: ToDoList = {
        id: lastItemId + 1,
        title: newItemTitle,
        content: newItemContent,
        steps: []
      };
      setNewItemContent('');
      setNewItemTitle('');
      setItems([...items, newItem]);

    }
    setAddingNew(false);
    setShowModal(false);
  };

  const addNewStep = () => {
    if (selectedItem) {
      const lastItemId = selectedItem?.steps.length > 0 ? selectedItem?.steps[selectedItem?.steps.length - 1].index : selectedItem?.steps.length + 1;
      if (newStepContent.trim() !== '') {
        selectedItem.steps = [...selectedItem.steps, { index: lastItemId + 1, value: newStepContent }]
      };
      setAddingNewStep(false);
    }
  }

  const deleteItem = () => {
    const newList = items.filter(item => item.id !== deleteNumber)
    setItems(newList)
  }

  const deleteStep = (indexToDelete: number) => {
   
    if (selectedItem && deletingStep) {
      console.log("deleting item, " + (deletingStep == true).toString())
      selectedItem.steps = selectedItem.steps.filter(item => item.index !== indexToDelete)
      console.log(selectedItem.steps)
    }
    setDeletingStep(false)
  }

  const checkItemNameValid = () => {
    if (newItemTitle.length > 0) {
      setIsItemNameValid(true)
    } else {
      setIsItemNameValid(false)
    }
  }

  const checkContentValid = () => {
    if (newItemContent.length > 0) {
      setContentValid(true)
    } else {
      setContentValid(false)
    }
  }
  const checkStepContentValid = () => {
    if (newStepContent.length > 0) {
      setisStepContentValid(true)
    } else {
      setisStepContentValid(false)
    }
  }

   const handleSelectChange = (value: number) => {
    setSelectedOption(value);

    // Check if the selected value is "Option 1" and set isOption1Selected accordingly
    if (options[value - 1]?.index === 1) {
      setIsOption1NotSelected(false);
      alert("fine, then I'll just go")
    } else {
      setIsOption1NotSelected(true);
      alert("Thank you for your input")
    }
  };

  return (
    <>
    {isOption1NotSelected && <div className="App" >

      <h1>To Do List</h1>

      <div className="row align-items-center my-3 justify-content-between">
        {addingNew === false ? (
          <div className="col-3 align-items-center">
            <div my-3>
              <button className="btn btn-primary m-3" onClick={() => {
                setAddingNew(true)
                setSelectedItem(undefined)
                setShowModal(true)
              }
              }>Add New Item</button>
            </div>
            <div my-3>
              <GenericInput isValid={true} invalid_feeback="This will never appear" valid_feedback="Type text to filter the tasks" label="Search"
                onChange={(newFilterValue) => setNewFilterValue(newFilterValue)}
              />
            </div>
            <div>
              <div className="container text-center">
                <div className="row align-items-start">
                  {filteredItems.map((i) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 m-3" key={i.id}>
                      <Item onClick={(b) => setSelectedItem(b)} item={i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        ) : (
          <>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="container text-center">
                    <div className="row align-items-start">
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <label className="form-label m-3">Name of event</label>
                        <GenericInput valid_feedback="That's a good title" invalid_feeback="That's a bad title" label="Title" isValid={isItemNameValid}
                          onChange={(newItemTitle) => {
                            setNewItemTitle(newItemTitle)
                            checkItemNameValid()
                          }}
                        />
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <label className="form-label">Description</label>
                        <GenericInput valid_feedback="You're good" invalid_feeback="Please write something" label="Content" isValid={isContentValid}
                          onChange={(newItemContent) => {
                            setNewItemContent(newItemContent)
                            checkContentValid()
                          }}
                        />
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <label className="form-label m-3">Submit new item</label>
                        <button className="btn btn-primary m-3" onClick={addNewItem}>Add Item</button>
                      </div>
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  setShowModal(false)
                  setAddingNew(false)
                }}>
                  Close
                </Button>
                <Button variant="primary" onClick={addNewItem}>
                  Add Item
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}


        {selectedItem && (
          <div className="col-5 border rounded-5">
            <div className="fs-2">{selectedItem.content}</div>
            <button className="btn btn-primary m-3" onClick={() => {
              deleteItem()
              setDeleteNumber(selectedItem.id)
              setSelectedItem(undefined)
            }}>Delete Item</button>
            <button className="btn btn-primary m-3" onClick={() => {
              setShowSteps(!showSteps)
            }}>Toggle Steps</button>
            {showSteps && (
              <><div className="d-flex flex-wrap">
                {selectedItem.steps.map((step, index) => (
                  <div key={index} className="card m-2">
                    <button className="btn btn- card-body fs-3" onClick={() => {
                      deleteStep(step.index)
                      //Make them not buttons
                      //When delete step is clicked, show the radio input component
                      //link that up to what is currently deleting a step
                    }}>{step.value}</button>
                  </div>
                ))}
              </div>
                <button className="btn btn-primary m-3" onClick={() => {
                  setAddingNewStep(!addingNewStep)
                }}>Add Step</button>
                <button className="btn btn-primary m-3" onClick={() => {
                  setDeletingStep(!deletingStep)
                }}>Delete Step</button>
                {addingNewStep && (
                  <>
                    <GenericInput isValid={isStepContentValid} invalid_feeback="That's not a valid step" valid_feedback="That's a valid step" label="Step content"
                      onChange={(newStepContent) => {
                        checkStepContentValid()
                        setNewStepContent(newStepContent)}}
                    />
                    <label className="form-label m-3" >Submit new step</label>
                    <button className="btn btn-primary m-3" onClick={addNewStep}>Add Item</button>
                  </>
                )}

                {deletingStep && (
                  <GenericRadioComponent contents={selectedItem.steps} selectedValue={deletingStepIndex}
                 onClick={
                  () => {
                    deleteStep(deletingStepIndex)
                    console.log(deletingStepIndex)
                  }
                }
                  />
                )}
              </>
            )}
          </div>
        )}
        <footer>
          <div>How do you feel about this website?</div>
          <GenericSelect 
          contents={options}
        selectedValue={selectedOption}
        onChange={handleSelectChange}/>
        </footer>
      </div>
    </div> }
    </>
  );
};

export default App;