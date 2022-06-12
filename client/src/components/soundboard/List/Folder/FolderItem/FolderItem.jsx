import React from "react";
import './FolderItem.css'

const FolderItem = ({id, children, deleteItem, setTarget}) => {


  return (
    <li className="folder-item" id={`folder-item_${id}`}>
        {children}
        {deleteItem && 
            <svg onClick={(e) => setTarget((_) => ({..._, 
                parent: e.target.parentNode.parentNode.parentNode.children[0].id?.split('_')[1], 
                child: e.target.parentNode.id?.split('_')[1]
            }))} 
            xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="red"><path d="M5.25 12.75V11.25H18.75V12.75Z"/></svg>
        }
    </li>
  )
};

export default FolderItem;
