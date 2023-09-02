import { useEffect, useState } from "react";
import "./MyApp.css";
import { Item } from "./Item";
import { ToDoList,} from "./models/todolist";
import { FilterInput } from "./FilterInput";
import React from "react";
import { TitleInput } from "./TitleInput";
import { ContentInput } from "./ContentInput";

const App = () => {
  const [items, setItems] = useState<ToDoList[]>([]);
  const [newFilterValue, setNewFilterValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<ToDoList | undefined>();
  const [filteredItems, setFilteredItems] = useState<ToDoList[]>([]);
  const [addingNew, setAddingNew] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  useEffect(() => {
    setFilteredItems(
      items.filter((b) =>
        b.title.toLowerCase().includes(newFilterValue.toLowerCase())
      )
    );
  }, [items, newFilterValue]);

  const addNewItem = () => {
    const newItem: ToDoList = {
      id: (items.length + 1),
      title: newItemTitle,
      content: newItemContent,
    };
    setNewItemContent('');
    setNewItemTitle('');
    setItems([...items, newItem]);
    setAddingNew(false)
  };
  
  return (
    <div className="App">
      <header className="App-header">
        
        if(addingNew === false){
          <button onClick={() => setAddingNew(true)}>Add New Item</button>
        }else{
          <div>
          <TitleInput
          onChange={(newItemTitle) => setNewItemTitle(newItemTitle)}
          />
          <ContentInput
          onChange={(newItemContent) => setNewItemContent(newItemContent)}
          />

          <button onClick={addNewItem}/>
          </div>
        }
        
        {selectedItem && (
          <div>
            <div>{selectedItem.content}</div>
            <button>Delete Item</button>
          </div>
        )}

        <FilterInput
          onChange={(newFilterValue) => setNewFilterValue(newFilterValue)}
        />

        {filteredItems.map((i) => (
          <Item onClick={(b) => setSelectedItem(b)} key={i.id} item={i} />
        ))}
      </header>
    </div>
  );
};

export default App;