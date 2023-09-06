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
      {filteredItems.map((i) => (
        <div>
          <Item onClick={(b) => setSelectedItem(b)} key={i.id} item={i} />
          </div>
        ))} 
        </div>
        </div>
        
      ) : (
        <div>
          <div>
          <p>Name of event</p>
          <TitleInput
            onChange={(newItemTitle) => setNewItemTitle(newItemTitle)}
          />
          </div>
          <div>
          <p>Description of event</p>
          <ContentInput
            onChange={(newItemContent) => setNewItemContent(newItemContent)}
          />
          </div>
          <button onClick={addNewItem}>Add Item</button>
        </div>
      )}
    </div>
        
    {selectedItem && (
          <div>
            <div>{selectedItem.content}</div>
            <button onClick={() => 
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