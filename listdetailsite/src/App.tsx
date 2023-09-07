import { useEffect, useState } from "react";
import "./MyApp.css";
import { Item } from "./Item";
import { ToDoList,} from "./models/todolist";
import { FilterInput } from "./FilterInput";
import { TitleInput } from "./TitleInput";
import { ContentInput } from "./ContentInput";
import React from "react";

const App = () => {
  const [items, setItems] = useState<ToDoList[]>([]);
  const [newFilterValue, setNewFilterValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<ToDoList | undefined>();
  const [filteredItems, setFilteredItems] = useState<ToDoList[]>([]);
  const [addingNew, setAddingNew] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [deleteNumber, setDeleteNumber] = useState<number | undefined>()
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
      };
      setNewItemContent('');
      setNewItemTitle('');
      setItems([...items, newItem]);
      
    }
    setAddingNew(false);
  };

  const deleteItem = () => {
    const newList = items.filter(item => item.id != deleteNumber)
    setItems(newList)
  }

 

  return (
    <div className="App">
      <header className="App-header">


    <div>
      {addingNew === false ? (
        <div>
          <div>
            <button className="btn btn-primary" onClick={() =>{ 
              setAddingNew(true)
              setSelectedItem(undefined)}
            }>Add New Item</button>
          </div>
          <div>
        <FilterInput
        onChange={(newFilterValue) => setNewFilterValue(newFilterValue)}
      />
      </div>
      <div>
      <div className="container text-center">
  <div className="row align-items-start">
    {filteredItems.map((i) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={i.id}>
        <div>
          <Item onClick={(b) => setSelectedItem(b)} item={i} />
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
        </div>
        
      ) : (
        <div className="container text-center">
          <div className="row align-items-start">
          <div className="col-lg-4 col-md-6 col-sm-12">
          <p>Name of event</p>
          <TitleInput
            onChange={(newItemTitle) => setNewItemTitle(newItemTitle)}
          />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
          <p>Description</p>
          <ContentInput
            onChange={(newItemContent) => setNewItemContent(newItemContent)}
          />
          </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <p>Submit new item</p>
          <button className="btn btn-primary" onClick={addNewItem}>Add Item</button>
          </div>
          </div>
        </div>
      )}
    </div>
        
    {selectedItem && (
          <div>
            <div>{selectedItem.content}</div>
            <button className="btn btn-primary" onClick={() => 
              {deleteItem()
                setDeleteNumber(selectedItem.id)
              setSelectedItem(undefined)}}>Delete Item</button>
          </div>
        )}

       

       
      </header>
    </div>
  );
};

export default App;