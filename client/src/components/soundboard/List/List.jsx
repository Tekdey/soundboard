import React, {useEffect, useState} from "react";
import Folder from "../Folder/Folder";
import ListHeader from "./ListHeader/ListHeader";
import "./List.css"
import { ListContext } from "../../../context/ListContext";

const List = () => {
  const fakeBdd = [{id: 'Folder1', name: '', activ: false, rename: false}, {id: 'Folder2', name: '', activ: false, rename: false}, {id: 'Folder3', name: '', activ: false, rename: false}, {id: 'Folder4', name: '', activ: false, rename: false}, {id: 'Folder5', name: '', activ: false, rename: false}]
  const [folderData, setFolderData] = useState(fakeBdd)

  // Display folder name in the bdd

  return (
    <ListContext.Provider value={{folderData}}>
      <div className="list__container">
        <ListHeader />
          <div className="folder__container">
            {folderData?.map((folderId, index) => {
               return <Folder key={index} id={index} data={folderId} />
            })}
          </div>
      </div>
    </ListContext.Provider>
  )
};

export default List;
